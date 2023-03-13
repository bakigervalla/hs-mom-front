import React, { useReducer, createContext, useMemo } from "react";
import { Reducer } from "./reducer";
import { toast } from "react-toastify";

import { client } from "../api";
import { FB } from "../../services/facebook.service";

import {
  SET_LOADING,
  FETCH_APPS,
  FETCH_PAGES,
  FETCH_SUBSCRIPTIONS,
  BUY_SUBSCRIPTIONS,
  GET_CLIENTS,
  SET_SUBSCRIPTION,
  SET_ERROR,
  SAVE_PAGES,
  SET_AUTH,
} from "./types";

/*
import axios from 'axios';
 import { config } from "../../config/axios";
const { , AUTH_URL, authAxios } = config;
*/

const InitialState = {
  loading: false,
  data: null,
  app: { name: "", token: "" },
};

export const FacebookContext = createContext(InitialState);

export const FacebookState = ({ children }) => {
  // setPath('/metrics');

  const [state, dispatch] = useReducer(Reducer, InitialState);

  const setLoading = () => dispatch({ type: SET_LOADING });

  // APPS
  const getApps = async () => {
    setLoading();
    try {
      const { data } = await client.get("/apps");
      return dispatch({ type: FETCH_APPS, payload: data });
    } catch (err) {
      return dispatch({ type: SET_ERROR, payload: err.response.data.error });
    }
  };

  const initialize = async () => {
    setLoading();
    try {
      // get apps from db
      const { apps, activeApp, hasApps } = await _getUserApps();

      if (!hasApps)
        return dispatch({
          type: SET_AUTH,
          payload: {
            title: "Please login to facebook",
            desc: "You don't have any apps.",
          },
        });
      else if (!activeApp)
        return dispatch({
          type: SET_ERROR,
          payload: "Choose an app to get insights",
        });
      else
        dispatch({
          type: FETCH_APPS,
          payload: { apps: apps, activeApp: activeApp },
        });

      // get pages from db
      const { pages, activePage, hasPages } = await _getPages();

      if (!hasPages)
        return dispatch({
          type: SET_AUTH,
          payload: {
            title: "Please login to facebook",
            desc: "You don't have any page.",
          },
        });
      else if (!activePage)
        return dispatch({
          type: SET_ERROR,
          payload: "Choose a page to get insights",
        });
      else
        dispatch({
          type: FETCH_PAGES,
          payload: { pages: pages, activePage: activePage },
        });

      // check login state
      let login = await FB.initialize();
      if (!login || !login?.user_token)
        return dispatch({
          type: SET_AUTH,
          payload: {
            title: "Authentication state has expired.",
            desc: "Please authenticate",
          },
        });

      dispatch({
        type: SET_AUTH,
        payload: { accountToken: login.user_token },
      });
      return {
        success: true,
        accountToken: login.user_token,
        page: activePage,
      };

      // // fetch insights
      // console.log('fetch insights', activeApp, activePage);
      // let response = await FB.getInsights(
      //   activePage.page_id,
      //   activePage.page_token
      // );
      // console.log('fetch insights', response);
      // if (!response.success)
      //   return dispatch({
      //     type: SET_AUTH,
      //     payload: {
      //       title: "Could not get insights",
      //       desc: response.error,
      //     },
      //   });

      // return dispatch({ type: FETCH_INSIGHTS, payload: response });
    } catch (err) {
      toast.error(err.response.data.error ?? "Unable to get data.");
      return dispatch({ type: SET_ERROR, payload: err.response.data.error });
    }
  };

  const _getUserApps = async () => {
    try {
      const { data } = await client.get("/apps/userapps");
      return {
        apps: data,
        activeApp: data.filter((e) => e.is_default)[0],
        hasApps: data.length > 0,
      };
    } catch (err) {
      throw err;
    }
  };

  const getUserApps = async () => {
    try {
      const { data } = await client.get("/apps/userapps");
      return dispatch({
        type: FETCH_APPS,
        payload: {
          apps: data,
          activeApp: data.filter((e) => e.is_default)[0],
        },
      });
    } catch (err) {
      throw err;
    }
  };

  const _getPages = async () => {
    try {
      const { data } = await client.get(`/orders/pages`);
      return {
        pages: data,
        activePage: data.filter((e) => e.default)[0],
        hasPages: data.length > 0,
      };
    } catch (err) {
      throw err;
    }
  };

  const getPages = async () => {
    setLoading();
    try {
      const { data } = await client.get(`/orders/pages`);
      return dispatch({
        type: FETCH_PAGES,
        payload: { pages: data, activePage: data.filter((e) => e.default)[0] },
      });
    } catch (err) {
      toast.error(err.response.data.error ?? "Page load failed");
      return dispatch({ type: SET_ERROR, payload: err.response.data.error });
    }
  };

  // Obsolete
  // const getUserApps = async () => {
  //   setLoading();
  //   try {
  //     const { data } = await client.get("/apps/userapps");
  //     return dispatch({ type: FETCH_APPS, payload: data });
  //   } catch (err) {
  //     toast.error(err.response.data.error ?? "Unable to get apps.");
  //     return dispatch({ type: SET_ERROR, payload: err.response.data.error });
  //   }
  // };

  const saveActiveApp = async (apps, app_id) => {
    setLoading();
    try {
      var result = await client.post("/orders/setactiveapp", {
        app_id: app_id,
      });

      if (result.status !== 200)
        return dispatch({
          type: SET_ERROR,
          payload: "Could not switch to this app",
        });

      const updatedApps = apps.map((app) => {
        if (app.app_id === app_id) {
          return { ...app, is_default: true };
        } else return { ...app, is_default: false };
      });

      return dispatch({ type: FETCH_APPS, payload: updatedApps });
    } catch (err) {
      toast.error(err.response.data.error ?? "Unable to set active app.");
      return dispatch({ type: SET_ERROR, payload: err.response.data.error });
    }
  };

  // PAGES
  const getAllPages = async () => {
    setLoading();
    try {
      const { data } = await client.get(`/orders/pages/all`);
      return dispatch({ type: FETCH_PAGES, payload: data });
    } catch (err) {
      toast.error(err.response.data.error ?? "Page load failed");
      return dispatch({ type: SET_ERROR, payload: err.response.data.error });
    }
  };

  const setPages = (pages) => {
    return dispatch({
      type: SAVE_PAGES,
      payload: pages,
    });
  };

  const savePages = async (pages, noAlert) => {
    setLoading();
    try {
      const { data } = await client.post("/orders/pages", pages);

      if (!noAlert) toast.success("Saved successfully");

      return dispatch({
        type: SAVE_PAGES,
        payload: { pages: data, isSuccess: true },
      });
    } catch (err) {
      toast.error(err.response.data.error ?? "Save failed");
      return dispatch({ type: SET_ERROR, payload: err.response.data.error });
    }
  };

  const deletePage = async (pageId) => {
    setLoading();
    try {
      await client.delete("/orders/pages", {
        data: { id: pageId },
      });

      toast.success("Page deleted.");

      return dispatch({
        type: SAVE_PAGES,
        payload: { pages: null, isSuccess: true },
      });
    } catch (err) {
      toast.error(err.response.data.error ?? "Delete failed");
      return dispatch({ type: SET_ERROR, payload: err.response.data.error });
    }
  };

  const saveActivePage = async (pages, app_id, page_id) => {
    setLoading();
    try {
      var result = await client.post("/orders/setactivepage", {
        app_id: app_id,
        page_id: page_id,
      });

      if (result.status !== 200)
        return dispatch({
          type: SET_ERROR,
          payload: "Could not switch to this page",
        });

      const updatedPages = pages.map((page) => {
        if (page.id === page_id) {
          return { ...page, default: true };
        } else return { ...page, default: false };
      });

      return dispatch({ type: FETCH_PAGES, payload: updatedPages });
    } catch (err) {
      toast.error(err.response.data.error ?? "Unable to set active page.");
      return dispatch({ type: SET_ERROR, payload: err.response.data.error });
    }
  };

  //   // METRICS
  //   const reAuthenticateSocialMediaApi = async (appName) => {
  //     setLoading();
  //     try {
  //       switch (appName.toLowerCase()) {
  //         case "facebook":
  //           let login = await FB.initialize();
  //           if (!login.user_token)
  //             return dispatch({
  //               type: SET_AUTH,
  //               payload: "Facebook login failed.",
  //             });

  //           let result = await FB.getPages(login.user_id, login.user_token);

  //           if (!result.success) {
  //             toast.error(result.data.error ?? "Can not get Facebook pages");
  //             return dispatch({
  //               type: SET_ERROR,
  //               payload: result.data.error ?? "Can not get Facebook pages",
  //             });
  //           }
  //           return result.data;
  //         default:
  //           // const { data } = await client.get("/metrics", {
  //           //   client_id: client_id,
  //           //   app_id: app_id,
  //           // });
  //           // return dispatch({ type: FETCH_METRICS, payload: data });
  //           break;
  //       }
  //     } catch (err) {
  //       toast.error(
  //         err.response.data.error ?? "Error checking token expiration."
  //       );
  //       return dispatch({ type: SET_ERROR, payload: err.response.data.error });
  //     }
  //   };

  //   const getMetrics = async (appName, pageId, pageToken) => {
  //     setLoading();
  //     try {
  //       switch (appName.toLowerCase()) {
  //         case "facebook":
  //           let login = await FB.initialize();
  //           if (!login.user_token)
  //             return dispatch({
  //               type: SET_AUTH,
  //               payload: "Facebook login failed.",
  //             });

  //           let result = await FB.getInsights(pageId, pageToken);

  //           if (result.success === false)
  //             return dispatch({ type: SET_AUTH, payload: result.error });

  //           return dispatch({ type: GET_INSIGHTS, payload: result });

  //         // let metrics = await getMetrics(result[0].id, result[0].token)
  //         // var authUrl = graph.getOauthUrl({
  //         //   client_id: "499839095362075",
  //         //   redirect_uri: "http://localhost:3000/"
  //         // });
  //         default:
  //           // const { data } = await client.get("/metrics", {
  //           //   client_id: client_id,
  //           //   app_id: app_id,
  //           // });
  //           // return dispatch({ type: FETCH_METRICS, payload: data });
  //           break;
  //       }
  //     } catch (err) {
  //       toast.error(err.response.data.error ?? "Unable to get metrics.");
  //       return dispatch({ type: SET_ERROR, payload: err.response.data.error });
  //     }
  //   };

  // const getInsights = async (app) => {
  //   return;
  //   setLoading();
  //   try {
  //     switch (app.name.toLowerCase()) {
  //       case "facebook":
  //         let login = await FB.initialize();
  //         let pages = await FB.getPages(login.user_id, login.user_token);

  //         return dispatch({ type: SOCIAL_PAGES, payload: pages });

  //       // let metrics = await getMetrics(result[0].id, result[0].token)

  //       // var authUrl = graph.getOauthUrl({
  //       //   client_id: "499839095362075",
  //       //   redirect_uri: "http://localhost:3000/",
  //       // });
  //       default:
  //         // const { data } = await client.get("/metrics", {
  //         //   client_id: client_id,
  //         //   app_id: app_id,
  //         // });
  //         // return dispatch({ type: FETCH_METRICS, payload: data });
  //         break;
  //     }
  //   } catch (err) {
  //     toast.error(err.response.data.error ?? "Unable to get metrics.");
  //     return dispatch({ type: SET_ERROR, payload: err.response.data.error });
  //   }
  // };

  // const _getInsights = async (app) => {

  //   // let metrics = await getMetrics(result[0].id, result[0].token)

  //   // var authUrl = graph.getOauthUrl({
  //   //   client_id: "499839095362075",
  //   //   redirect_uri: "http://localhost:3000/",
  //   // });

  //   // await getMetrics(4, app_id);
  //   // FB.login(function (response) {
  //   //   if (response.authResponse) {
  //   //     FB.api("/me", function (response) {
  //   //     });
  //   //   } else {
  //   //   }
  //   // });
  //   // FB.api('4', function (res) {
  //   //     if(!res || res.error) {
  //   //      return;
  //   //     }
  //   //   });
  // };

  // SUBSCRIPTIONS
  //
  const getSubscriptions = async () => {
    setLoading();
    try {
      const { data } = await client.get("/subscriptions");
      return dispatch({ type: FETCH_SUBSCRIPTIONS, payload: data });
    } catch (err) {
      return dispatch({ type: SET_ERROR, payload: err.response.data.error });
    }
  };

  const buySubscription = async (plan) => {
    setLoading();
    try {
      const { data, status } = await client.post("/orders", plan);

      if (status !== 200) return false;

      dispatch({
        type: BUY_SUBSCRIPTIONS,
        payload: { order: data, isSuccess: true },
      });

      return true;
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.error ?? "Subscription purchase failed");
      return dispatch({ type: SET_ERROR, payload: err.response.data.error });
    }
  };

  const setSubscriptionId = async (sub_id) => {
    setLoading();
    try {
      return dispatch({ type: SET_SUBSCRIPTION, payload: sub_id });
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.error ?? "Unable to get metrics.");
      return dispatch({ type: SET_ERROR, payload: err.response.data.error });
    }
  };

  const getClients = async (userId) => {
    setLoading();
    try {
      const { data } = await client.get("/clients", {
        params: { user_id: userId },
      });
      return dispatch({ type: GET_CLIENTS, payload: data });
    } catch (err) {
      toast.error(err.response.data.error ?? "Unable to get clients.");
      return dispatch({ type: SET_ERROR, payload: err.response.data.error });
    }
  };

  const setError = (message) => {
    return dispatch({ type: SET_ERROR, payload: message });
  };

  // memoize the full context value
  const contextValue = useMemo(
    () => ({
      state: state,
      setLoading,
      setError,
      initialize,
      getUserApps,
      getApps,
      saveActiveApp,
      getSubscriptions,
      buySubscription,
      getAllPages,
      getPages,
      deletePage,
      saveActivePage,
      // getMetrics,
      getClients,
      setSubscriptionId,
      // reAuthenticateSocialMediaApi,
      savePages,
      setPages,
    }),
    // eslint-disable-next-line
    [state]
  );

  return (
    <FacebookContext.Provider value={contextValue}>
      {children}
    </FacebookContext.Provider>
  );
};
