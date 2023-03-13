import { FB } from "../services/facebook.service";

const useFacebook = () => {
  const fetchInsights = async (pageId, pageToken) => {
    try {
      // check login state
      let login = await FB.initialize();
      if (!login || !login?.user_token)
        return {
          error: {
            desc: "Authentication state has expired. Please authenticate",
          },
        };

      const _getInsights = async (page_id, page_token) => {
        const { success, error, data } = await FB.getInsights(
          page_id,
          page_token
        );

        if (!success) return { isSuccess: false, error: error };

        return {
          isSuccess: true,
          data: data,
          error: {desc: data.length === 0 ? "There are no insights for this page." : null },
        };
      };

      const { isSuccess, error, data } = await _getInsights(pageId, pageToken);
      if (isSuccess) return { isSuccess: !error, data: data, error: error };

      // regenerate page token
      const { success, page_token } = await FB.getPageAccessToken(
        pageId,
        login.user_token
      );

      if (!success)
        return {
          isSuccess: false,
          error: { desc: "Could not get page access token." },
        };

      const result = await _getInsights(pageId, page_token);
      if (result.isSuccess)
        return { isSuccess: !error, data: data, error: error };

      return {
        isSuccess: true,
        error: result.error,
        newToken: page_token,
      };
    } catch (err) {
      return {
        isSuccess: false,
        error: { desc: err.response.data.error ?? "Unable to get insights." },
      };
    }
  };

  // Obsolete
  const fetchPages = async (userId, appId, pageId, fbAccountId, userToken) => {
    try {
      let res = await FB.getPages(fbAccountId, userToken);

      if (!res.success || res.data?.length === 0)
        return {
          error: { desc: res.data.error ?? "Could not get Facebook pages." },
        };

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
    } catch (err) {
      return {
        isSuccess: false,
        error: {
          desc: err.response.data.error ?? "Unable to get Facebook pages.",
        },
      };
    }
  };

  return { fetchInsights, fetchPages };
};

export default useFacebook;
