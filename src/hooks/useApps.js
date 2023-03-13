import { client } from "../context/api";

const useApps = (showLoader) => {
  const getUserApps = async () => {
    showLoader(true);
    try {
      const { data } = await client.get("/apps/userapps");
      const _activeApp = data?.filter((e) => e.is_default)[0],
        _hasApps = data.length > 0;
      return {
        success: _hasApps,
        apps: data,
        activeApp: _activeApp,
        hasApps: _hasApps,
        error: !_hasApps
          ? {
              desc: "There are no apps asocciated with your account. Please, contact us.",
            }
          : !_activeApp
          ? {
              desc: "Please, choose an app to get insights.",
            }
          : null,
      };
    } catch (err) {
      return {
        success: false,
        error: {
          desc: err.response.data.error ?? "Unable to get apps.",
        },
      };
    } finally {
      showLoader(false);
    }
  };

  const saveActiveApp = async (apps, appId) => {
    showLoader(true);
    try {
      var result = await client.post("/orders/setactiveapp", {
        app_id: appId,
      });

      if (result.status !== 200) {
        return {
          success: false,
          error: {
            desc: "Could not switch to this app",
          },
        };
      }
      const updatedApps = apps.map((app) => {
        if (app.app_id === appId) {
          return { ...app, is_default: true };
        } else return { ...app, is_default: false };
      });

      return {
        success: true,
        updatedApps: updatedApps,
      };
    } catch (err) {
      return {
        success: false,
        error: {
          desc: err.response.data.error ?? "Unable to save default app.",
        },
      };
    } finally {
      showLoader(false);
    }
  };

  const getPages = async () => {
    showLoader(true);
    try {
      const { data } = await client.get(`/orders/pages`);
      const _activePage = data.filter((e) => e.default)[0];
      return {
        success: true,
        pages: data,
        activePage: _activePage,
        hasPages: data.length > 0,
        error: _activePage
          ? null
          : {
              desc: "Choose a page to get insights.",
            },
        options: data.map((p, i) => {
          return {
            value: p.page_token,
            label: p.page_name,
            app_id: p.app_id,
            default: p.default,
            page: p,
          };
        }),
      };
    } catch (err) {
      return {
        error: {
          desc: err.response.data.error ?? "Unable to get pages.",
        },
      };
    } finally {
      showLoader(false);
    }
  };

  const saveActivePage = async (pages, appId, pageId) => {
    showLoader(true);
    try {
      var result = await client.post("/orders/setactivepage", {
        app_id: appId,
        page_id: pageId,
      });

      if (result.status !== 200) {
        return {
          success: false,
          error: {
            desc: "Could not switch to this page",
          },
        };
      }

      const updatedPages = pages.map((page) => {
        if (page.page_id === pageId) {
          return { ...page, default: true };
        } else return { ...page, default: false };
      });

      return {
        success: true,
        updatedPages: updatedPages,
        options: updatedPages.map((p, i) => {
          return {
            value: p.page_token,
            label: p.page_name,
            app_id: p.app_id,
            default: p.default,
            page: p,
          };
        }),

        //[{...pagesOptions, default: pagesOptions.filter((e) => e.page_id === page.page_id)}]
      };
    } catch (err) {
      return {
        success: false,
        error: {
          desc: err.response.data.error ?? "Unable to save default page.",
        },
      };
    } finally {
      showLoader(false);
    }
  };

  const savePages = async (pages) => {
    showLoader(true);
    try {
      const { data } = await client.post("/orders/pages", pages);

      return {
        success: true,
        pages: data,
      };
    } catch (err) {
      return {
        success: false,
        error: { desc: err.response.data.error ?? "Save failed" },
      };
    } finally {
      showLoader(false);
    }
  };

  return { getUserApps, saveActiveApp, getPages, saveActivePage, savePages };
};

export default useApps;
