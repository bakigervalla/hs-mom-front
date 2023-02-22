// import { accountService } from '_services';
import { BehaviorSubject } from "rxjs";
import axios from "axios";
import moment from "moment";

// import { history } from "_helpers";

const baseUrl = `${process.env.REACT_APP_API_URL}/accounts`;
const accountSubject = new BehaviorSubject(null);

// const facebookAppId = "499839095362075"; //process.env.REACT_APP_FACEBOOK_APP_ID;

const checkLoginState = () => {
  return new Promise((resolve) => {
    window.FB.getLoginStatus(({ authResponse }) => {
      resolve(authResponse);
    });
  });
};

const initialize = async () => {
  let state = await checkLoginState();
  if (state && moment().unix() < state.data_access_expiration_time) {
    const { accessToken, userID } = state;
    return { connected: 1, user_token: accessToken, user_id: userID };
  } else {
    // login with facebook then authenticate with the API to get a JWT auth token
    const res = new Promise(window.FB.login);
    const { authResponse } = await res;

    const { accessToken, userID } = authResponse;
    return { connected: 0, user_token: accessToken, user_id: userID };
  }
  // get return url from location state or default to home page
  // const { from } = history.location.state || { from: { pathname: "/" } };
  // history.push(from);
};

const getPageAccessToken = async (pageId, userToken) => {
  return new Promise((resolve) => {
    window.FB.api(
      `/${pageId}?fields=access_token&access_token=${userToken}`,
      ({ access_token, error }) => {
        if (error) resolve({ success: false, error: error.message });
        if (access_token) resolve({ success: true, pageToken: access_token });
      }
    );
  });
};

const getPages = async (userId, userToken) => {
  return new Promise((resolve) => {
    window.FB.api(
      `/${userId}/accounts?access_token=${userToken}&fields=id,name,picture,access_token&limit=100`,
      ({ data, error }) => {
        if (error) resolve({ success: false, error: error.message });
        if (data) resolve({ success: true, data: data });
      }
    );
  });
};

const getInsights = async (pageId, pageToken) => {
  return new Promise((resolve) => {
    window.FB.api(
      `/${pageId}/insights/page_impressions_unique?access_token=${pageToken}`,
      ({ data, error }) => {
        if (error) resolve({ success: false, error: error.message });
        if (data) resolve({ success: true, data: data });
      }
    );
  });
};

async function apiAuthenticate(accessToken) {
  // authenticate with the api using a facebook access token,
  // on success the api returns an account object with a JWT auth token
  const response = await axios.post(`${baseUrl}/authenticate`, { accessToken });
  const account = response.data;
  accountSubject.next(account);
  startAuthenticateTimer();
  return account;
}

function logout() {
  // revoke app permissions to logout completely because FB.logout() doesn't remove FB cookie
  window.FB.api("/me/permissions", "delete", null, () => window.FB.logout());
  stopAuthenticateTimer();
  accountSubject.next(null);
  // history.push("/login");
}

function getAll() {
  return axios.get(baseUrl).then((response) => response.data);
}

function getById(id) {
  return axios.get(`${baseUrl}/${id}`).then((response) => response.data);
}

async function update(id, params) {
  const response = await axios.put(`${baseUrl}/${id}`, params);
  let account = response.data;
  // update the current account if it was updated
  if (account.id === accountSubject.value?.id) {
    // publish updated account to subscribers
    account = { ...accountSubject.value, ...account };
    accountSubject.next(account);
  }
  return account;
}

async function _delete(id) {
  await axios.delete(`${baseUrl}/${id}`);
  if (id === accountSubject.value?.id) {
    // auto logout if the logged in account was deleted
    logout();
  }
}

// helper methods

let authenticateTimeout;

function startAuthenticateTimer() {
  // parse json object from base64 encoded jwt token
  const jwtToken = JSON.parse(atob(accountSubject.value.token.split(".")[1]));

  // set a timeout to re-authenticate with the api one minute before the token expires
  const expires = new Date(jwtToken.exp * 1000);
  const timeout = expires.getTime() - Date.now() - 60 * 1000;
  const { accessToken } = window.FB.getAuthResponse();
  authenticateTimeout = setTimeout(() => apiAuthenticate(accessToken), timeout);
}

function stopAuthenticateTimer() {
  // cancel timer for re-authenticating with the api
  clearTimeout(authenticateTimeout);
}

export const FB = {
  initialize,
  getPageAccessToken,
  getPages,
  getInsights,
  apiAuthenticate,
  logout,
  getAll,
  getById,
  update,
  delete: _delete,
  account: accountSubject.asObservable(),
  get accountValue() {
    return accountSubject.value;
  },
};
