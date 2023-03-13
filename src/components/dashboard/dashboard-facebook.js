import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth/context";
import { FacebookContext } from "../../context/dashboard/context-facebook";

import { HSAreaChart, HSBarChart, HSLineChart, HSDonutChart } from "./charts";
import { TfiExport } from "react-icons/tfi";

import Modal from "../shared/modal";
import { FBPageTemplate } from "../shared/templates/fbpage.template";
import { SessionExpired } from "../shared/session-expired";
import { toast } from "react-toastify";

import useFacebook from "../../hooks/useFacebook";

export const FacebookDashboard = ({ hasPages, activePage, savePages, setError }) => {
  const [insights, setInsights] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [filterDate, setDateFilter] = useState("03 May - 14 Jun");

  const { connected, account, fetchInsights, fetchPages } = useFacebook();

  useEffect(() => {
    if (!hasPages) return;
    (async () => {
      await initializeInsights();
    })();
    // eslint-disable-next-line
  }, []);

  const initializeInsights = async () => {
    const { isSuccess, newToken, error, data } = await fetchInsights(
      activePage.page_id,
      activePage.page_token
    );

    if (!isSuccess) return setError(error);

    if (newToken) await savePages([{ ...activePage, page_token: newToken }], true);
    if (!isSuccess) return setError(error);
    setInsights(data);
  };

  const authenticate = async () => {};

  const onDateFilter = (e) => {
    setDateFilter(e.value);
  };

  // const { userData } = useContext(AuthContext);
  // const [insights, setInsights] = useState([]);
  // const {
  //   state,
  //   initialize,
  //   getPages,
  //   saveActiveApp,
  //   saveActivePage,
  //   // getMetrics,
  //   // reAuthenticateSocialMediaApi,
  //   savePages,
  //   setError,
  //   setLoading,
  // } = useContext(FacebookContext);
  // const {
  //   apps,
  //   pagesOptions,
  //   pages,
  //   activeApp,
  //   activePage,
  //   //setActivePage,
  //   // insights,
  //   socialAccount,
  //   error,
  // } = state;

  // //   // hooks
  // const { connected, account, fetchFBInsights, fetchFBPages } = useFBInsights(
  //   setLoading,
  //   setError
  // );

  // useEffect(() => {
  //   (async () => {
  //     await initializeInsights();
  //   })();
  //   // eslint-disable-next-line
  // }, []);

  // // useEffect(() => {
  // //   if (!activeApp) return;
  // //   (async () => {
  // //     await getPages();
  // //   })();
  // //   // eslint-disable-next-line
  // // }, [activeApp]);

  // // useEffect(() => {
  // //   if (!activePage) return;
  // //   if (activeApp.name.toLowerCase() === "facebook") getInsightOnPageChange(activePage);
  // //   // eslint-disable-next-line
  // // }, [activePage]);

  // const initializeInsights = async () => {
  //   const { success, accountToken, page } = await initialize();
  //   if (!success) return;

  //   const { isSuccess, newToken, error, data } = await fetchFBInsights(
  //     accountToken,
  //     page.page_id,
  //     page.page_token
  //   );

  //   if (newToken) await savePages([{ ...page, page_token: newToken }], true);

  //   if (!isSuccess) return setError(error);

  //   setInsights(data);
  // };

  // const onChangeOfActiveApp = (app) => {
  //   // switch ()
  //   // {
  //   //   case "insagram":

  //   //     break;
  //   //     default:
  //   //       break;
  //   // }
  //   saveActiveApp(apps, app.app_id);
  // };

  // const onChangeOfActivePage = async (page) => {
  //   let _page = pages.filter((p) => p.id === page.id)[0];

  //   const { isSuccess, newToken, error, data } = await fetchFBInsights(
  //     socialAccount.accountToken,
  //     _page.page_id,
  //     _page.page_token
  //   );

  //   if (newToken) await savePages([{ ..._page, page_token: newToken }], true);

  //   if (!isSuccess) return setError(error);

  //   setInsights(data);
  // };

  // useEffect(() => {
  //   if (connected !== 0) return;
  //   (async () => {
  //     await fetchFBPages(
  //       userData.user_id,
  //       activeApp[0].app_id,
  //       activePage.page_id,
  //       account.user_id,
  //       account.user_token
  //     );
  //     setShowModal(true);
  //   })();
  //   // eslint-disable-next-line
  // }, [connected, account]);

  // const _fetchFBInsights = () => {
  //   fetchFBInsights(activePage?.page_id, activePage?.page_token);
  // };

  // const onDateFilter = (e) => {
  //   setDateFilter(e.value);
  // };

  // // TODO: Check getFBPages and SavePages
  // const reAuthenticate = async () => {
  //   let e = await fetchFBInsights();
  //   console.log("e", e);
  //   // let _pages = await reAut henticateSocialMediaApi(activeApp[0].name);
  //   // if (_pages) await saveFBPages(_pages, false);
  //   //await fetchInsights();
  // };

  // const saveFBPages = async ({activePage}) => {
  //   await savePages(pages, true);
  // };

  // // TODO: Check getFBPages and SavePages
  // const onModalCloseSave = async (isOK) => {
  //   if (!isOK) return setShowModal(false);
  //   else if (!activePage) return toast.warn("Please choose a default page.");
  //   setShowModal(false);
  //   await saveFBPages();
  //   _fetchFBInsights();
  // };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8">
      {/* {showModal ? (
        <Modal
          title="Facebook Pages"
          content={
            <FBPageTemplate
              pages={pages}
              activePageId={activePage.page_id}
              onSetActive={(page) =>
                onChangeOfActivePage({ ...page, default: true })
              }
            />
          }
          onModalClose={onModalCloseSave}
        />
      ) : null} */}
      {!hasPages && (
        <SessionExpired
          message="Please authenticate to get Facebook pages and profiles."
          callbackTitle="Authenticate"
          callback={authenticate}
        />
      )}
      {insights.data?.length > 0 && (
        <>
          <div className="flex grow flex-row gap-6 items-stretch">
            {/* <!-- Row 1 Box 1 --> */}
            <div className="w-1/4 bg-white rounded-xl border border-slate-200">
              <div className="px-5 pt-5">
                <h2 className="text-base text-slate-800">
                  <p className="font-normal">Monthly posts</p>
                </h2>
                <div className="text-3xl font-bold text-slate-800 py-2">
                  4,332
                </div>
                <div>
                  <span className="text-xs leading-none text-green-400">
                    +2233{" "}
                  </span>
                  <span className="text-xs leading-none text-gray-500">
                    From the last month
                  </span>
                </div>
              </div>
              {/* <!-- Chart --> */}
              <div className="relative p-4 h-72">
                <HSLineChart />
              </div>
            </div>

            {/* <!-- Row 1 Box 2 --> */}
            <div className="w-4/6 bg-white rounded-xl border border-slate-200 px-5 pt-5">
              <div className="grid grid-cols-12">
                <div className="col-span-10">
                  <h2 className="text-base text-slate-800">
                    <p className="font-normal"> New platform visitors</p>
                  </h2>
                  <div className="flex flex-row justify-start mt-8 text-left">
                    <div className="mr-5">
                      <p className="text-sm text-gray-400">Total visitors</p>
                      <p className="text-3xl leading-[1] text-slate-800">
                        4,332
                      </p>
                    </div>
                    <div className="">
                      <p className="text-sm">New visitors</p>
                      <p className="text-3xl leading-[1] text-green-400">
                        +133,233
                      </p>
                    </div>
                  </div>
                </div>

                <div className="text-xs col-span-2 block text-right">
                  <div className="xl:w-36 float-right">
                    <input
                      type="text"
                      value={filterDate}
                      onChange={(e) => onDateFilter}
                      style={{ backgroundColor: "#FAF8F7", border: "none" }}
                      className="form-control block w-full px-3 py-1.5 font-semibold text-center text-gray-700 focus:text-gray-700 focus:border-blue-600 focus:outline-none"
                    />
                  </div>
                  <div className="xl:w-36 my-2 mr-2 float-right">
                    <span className="font-semibold px-2 my-2 rounded bg-slate-100 mr-2"></span>
                    <span className="text-sm">Organic</span>
                    <span className="font-semibold px-2 my-2 rounded bg-sky-900 ml-4 mr-2 items-end"></span>
                    <span className="text-sm">Paid</span>
                  </div>
                </div>
              </div>

              {/* <!-- Chart --> */}
              <div className="w-1x2 p-auto h-72 mt-8">
                <HSBarChart />
              </div>
            </div>

            {/* <!-- Row 1 Box 3 --> */}
            <div className="flex flex-col w-1/4 bg-white rounded-xl border border-slate-200 justify-between">
              <div className="px-5 pt-5">
                <h2 className="text-base text-slate-800">
                  <p className="font-normal">Daily new subscribers</p>
                </h2>
                {/* <!-- Chart --> */}
                <div className="">
                  <div className="mr-5">
                    <HSDonutChart />
                    {/* <p className="text-3xl font-bold text-slate-800">5300</p>
        <p className="text-xs leading-[0] font-bold text-slate-800">
          Subscribers
        </p> */}
                  </div>
                </div>
              </div>

              <div className="flex justify-center items-center p-5 w-full text-gray-400 text-sm">
                <div className="rounded bg-sky-100 mr-1 h-3 w-3 text-gray-100"></div>
                <span>Paid</span>
                <span className="text-gray-800 pl-2">52k</span>
                <div className="h-3 w-3 px-1 py-0 my-0 rounded bg-sky-900 ml-10 mr-1 text-gray-100"></div>
                <span>Organic</span>
                <span className="text-gray-800 pl-2">44k</span>
              </div>
            </div>
          </div>

          {/* <!-- Row 2 --> */}
          <div className="flex grow flex-row gap-6 py-5 items-stretch">
            {/* <!-- Row 2 Box 1 --> */}
            <div className="w-4/6 bg-white rounded-xl border border-slate-200">
              <div className="px-5 pt-5">
                <div className="col-span-10">
                  <span className="text-slate-800">
                    <p className="font-lg font-semibold">Bounce rate</p>
                  </span>
                  <p className="text-4xl font-semibold leading-[1] text-slate-800">
                    54.3%
                  </p>
                </div>
              </div>

              {/* <!-- Chart --> */}
              <div className="relative p-4 h-72 mt-8">
                <HSAreaChart />
                {/* <canvas id="lineChart"></canvas> */}
              </div>
            </div>

            {/* <!-- Row 2 Box 2 --> */}
            <div className="w-1/5 bg-white rounded-xl border border-slate-200 border border-slate-200">
              <div className="px-5 pt-5">
                <h2 className="text-lg font-semibold whitespace-pre text-slate-800">
                  Most popular Landingpage
                </h2>

                <ul className="divide-y list-none divide-gray-200">
                  <li className="py-3 sm:py-6">
                    <div className="flex items-center space-x-4">
                      <div className="flex-1 min-w-0 text-base font-medium text-cyan-500 truncate">
                        Medium.com
                      </div>
                      <div className="inline-flex items-center text-base md:text-base lg:text-lg font-semibold text-gray-900">
                        334
                      </div>
                      <div className="flex-shrink-0">
                        <TfiExport size={20} className="text-cyan-500" />
                      </div>
                    </div>
                  </li>
                  <li className="py-3 sm:py-6">
                    <div className="flex items-center space-x-4">
                      <div className="flex-1 min-w-0 text-base font-medium text-cyan-500 truncate">
                        Behance.com
                      </div>
                      <div className="inline-flex items-center text-base md:text-base lg:text-lg font-semibold text-gray-900">
                        238
                      </div>
                      <div className="flex-shrink-0">
                        <TfiExport size={20} className="text-cyan-500" />
                      </div>
                    </div>
                  </li>
                  <li className="py-3 sm:py-6">
                    <div className="flex items-center space-x-4">
                      <div className="flex-1 min-w-0 text-base font-medium text-cyan-500 truncate">
                        Dribble.com
                      </div>
                      <div className="inline-flex items-center text-base md:text-base lg:text-lg font-semibold text-gray-900">
                        173
                      </div>
                      <div className="flex-shrink-0">
                        <TfiExport size={20} className="text-cyan-500" />
                      </div>
                    </div>
                  </li>
                  <li className="py-3 sm:py-6">
                    <div className="flex items-center space-x-4">
                      <div className="flex-1 min-w-0 text-base font-medium text-cyan-500 truncate">
                        Instagram.com
                      </div>
                      <div className="inline-flex items-center text-base md:text-base lg:text-lg font-semibold text-gray-900">
                        120
                      </div>
                      <div className="flex-shrink-0">
                        <TfiExport size={20} className="text-cyan-500" />
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* <!-- Row 2 Box 3 --> */}
            <div className="w-1/5 bg-white rounded-xl border border-slate-200 border border-slate-200">
              <div className="px-5 pt-5">
                <h2 className="text-base text-slate-800">
                  <p className="font-normal">Comments on posts</p>
                </h2>
                <div className="text-4xl font-semibold text-slate-800">
                  4,332
                </div>
                <div className="pt-2">
                  <span className="text-xs leading-none text-green-400">
                    +2233{" "}
                  </span>
                  <span className="text-xs leading-none text-gray-500">
                    From the last month
                  </span>
                </div>
              </div>
              {/* <!-- Chart --> */}
              <div className="relative p-4 h-72">
                <HSLineChart />
              </div>
            </div>
          </div>

          {/* <!-- Row 3--> */}
          <div className="flex grow flex-row gap-6 py-5 items-stretch">
            <div className="w-1/4 bg-white rounded-lg border-2 border-slate-100 p-4 sm:p-6 xl:p-8 ">
              <h3 className="text-base">
                <p className="font-normal text-black">
                  Average time spend on website
                </p>
              </h3>
              <span className="text-2xl md:text-4xl lg:text-4xl leading-none text-gray-900">
                13min
              </span>
            </div>

            <div className="w-1/4 bg-white rounded-lg border-2 border-slate-100 p-4 sm:p-6 xl:p-8 ">
              <h3 className="text-base">
                <p className="font-normal text-black">Daily sales</p>
              </h3>
              <span className="text-2xl md:text-4xl lg:text-4xl leading-none text-gray-900">
                4,236
              </span>
              <div className="pt-4">
                <span className="text-sm leading-none text-green-400">
                  +424{" "}
                </span>
                <span className="text-sm leading-none text-gray-500">
                  From the last month
                </span>
              </div>
            </div>

            <div className="w-1/4 bg-white rounded-lg border-2 border-slate-100 p-4 sm:p-6 xl:p-8 ">
              <h3 className="text-base">
                <p className="font-normal text-black">
                  Average time spend on website
                </p>
              </h3>
              <span className="text-2xl md:text-4xl lg:text-4xl leading-none text-gray-900">
                13min
              </span>
              <div className="pt-4">
                <span className="text-sm leading-none text-green-400">
                  +424{" "}
                </span>
                <span className="text-sm leading-none text-gray-500">
                  From the last month
                </span>
              </div>
            </div>

            <div className="w-1/4 bg-white rounded-lg border-2 border-slate-100 p-4 sm:p-6 xl:p-8 ">
              <h3 className="text-base">
                <p className="font-normal text-black">Daily sales</p>
              </h3>
              <span className="text-2xl md:text-4xl lg:text-4xl leading-none text-gray-900">
                4,236
              </span>
              <div className="pt-4">
                <span className="text-sm leading-none text-green-400">
                  +424{" "}
                </span>
                <span className="text-sm leading-none text-gray-500">
                  From the last month
                </span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
