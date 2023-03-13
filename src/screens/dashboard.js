import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import useApps from "../hooks/useApps";

import { Toolbar } from "../components/shared/toolbar";
import Loader from "../components/shared/loader";
import { Error } from "../components/shared/error";

import {
  FacebookDashboard,
  InstagramDashboard,
} from "../components/dashboard/index";

export const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [apps, setApps] = useState([]);
  const [activeApp, setActiveApp] = useState({});
  const [pages, setPages] = useState([]);
  const [activePage, setActivePage] = useState({});
  const [pagesOptions, setPagesOptions] = useState();
  const [hasPages, setHasPages] = useState(false);

  const _showLoader = (val) => {
    setLoading(val);
    if (val === true) setError(null);
  };

  const navigate = useNavigate();
  const { getUserApps, saveActiveApp, getPages, saveActivePage, savePages } =
    useApps(_showLoader);

  useEffect(() => {
    (async () => {
      const { success, error, apps, activeApp } = await getUserApps();
      if (!success) return setError(error);
      if (!activeApp) setError(error);
      setApps(apps);
      setActiveApp(activeApp);
    })();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!activeApp?.name) return;
    navigate(activeApp?.name?.toLowerCase());
    (async () => {
      const { success, error, hasPages, pages, activePage, options } =
        await getPages();
      if (!success) return setError(error);
      setActivePage(activePage);
      setPagesOptions(options);
      setHasPages(hasPages);
      setPages(pages);
    })();
    // eslint-disable-next-line
  }, [activeApp]);

  const onChangeOfActiveApp = async (app) => {
    const { success, error, updatedApps } = await saveActiveApp(
      apps,
      app.app_id
    );
    if (!success) return setError(error);
    setApps(updatedApps);
    setActiveApp(app);
  };

  const onChangeOfActivePage = async (page) => {
    const { success, error, options, updatedPages } = await saveActivePage(
      pages,
      activeApp.app_id,
      page.page_id
    );
    setPagesOptions(options);
    setActivePage(page);
    setPages(updatedPages);

    if (!success) setError(error);
  };

  const _showError = (error) => {
    setError(error);
  };

  const _savePages = async (_pages) => {
    const { success, pages, error } = savePages(_pages);
    if (!success) return setError(error);
    setPages(pages);
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8">
      {loading ? (
        <Loader />
      ) : (
        <>
          <Toolbar
            apps={apps}
            pagesOptions={pagesOptions}
            selectedOption={pagesOptions?.filter((e) => e.default)}
            onChangeActiveApp={onChangeOfActiveApp}
            onChangeActivePage={onChangeOfActivePage}
          />
          {error && <Error error={error} />}
          {activeApp && (
            <Routes>
              <Route>
                <Route
                  path="/facebook"
                  element={
                    <FacebookDashboard
                      hasPages={hasPages}
                      activePage={activePage}
                      savePages={_savePages}
                      setError={_showError}
                    />
                  }
                />
                <Route
                  path="/instagram"
                  element={
                    <InstagramDashboard
                      hasPages={hasPages}
                      activePage={activePage}
                      setError={_showError}
                    />
                  }
                />
              </Route>
            </Routes>
          )}
        </>
      )}
    </div>
  );
};
