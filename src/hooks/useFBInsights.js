import { useState } from "react";
import { FB } from "../services/facebook.service";

const useFBInsights = (setLoading, setError, setPages) => {
  const [insights, setFBInsights] = useState([]);
  const [account, setFBAccount] = useState([]);
  const [connected, setConnected] = useState(-1);

  const fetchFBInsights = async (pageId, pageToken) => {
    try {
      setLoading();

      let login = await FB.initialize();
      if (!login.user_token) return setError("Facebook login failed");

      // if is loggedin now show-pages
      if (!login.connected) {
        setFBAccount(login);
        return setConnected(login.connected);
      }

      let res = await FB.getInsights(pageId, pageToken);

      if (res.success) {
        if (res.data.length === 0)
          return setError("There are no insights for this page");
        else return setFBInsights(res);
      }

      // get page token
      let result = await FB.getPageAccessToken(pageId, login.user_token);
      if (result.success) await fetchFBInsights(pageId, result.pageToken);
      else return setError(result);
    } catch (err) {
      setError(err.response.data.error ?? "Unable to get insights");
    }
  };

  const fetchFBPages = async (
    userId,
    appId,
    pageId,
    fbAccountId,
    userToken
  ) => {
    try {
      setLoading();
      let res = await FB.getPages(fbAccountId, userToken);

      if (!res.success || res.data?.length === 0)
        return setError(res.data.error ?? "Could not get Facebook pages");

      var pages = res.data.map((page) => {
        return {
          user_id: userId,
          app_id: appId,
          account_id: userId,
          user_token: userToken,
          page_id: page.id,
          page_name: page.name,
          page_token: page.access_token,
          page_picture: page.picture.data.url,
          default: page.id === pageId,
        };
      });
      setPages(pages);
    } catch (err) {
      console.log(err);
      setError(err.response.data.error ?? "Unable to get Facebook pages");
    }
  };

  return { connected, account, insights, fetchFBInsights, fetchFBPages };
};

export default useFBInsights;
