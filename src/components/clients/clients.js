import React, { useEffect, useContext, useState } from "react";
import { AuthContext } from "../../context/auth/context";
import { MetricsContext } from "../../context/dashboard/context";

import { TfiTrash } from "react-icons/tfi";
import { ConfirmDialog } from "../shared/confirm-dialog";
import Tab from "../Tab";

export const Client = () => {
  const [isModalOpen, setModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const { userData } = useContext(AuthContext);
  const { state, getPages, deletePage } = useContext(MetricsContext) || {};
  const { pages } = state;

  useEffect(() => {
    (async () => {
      await getPages(userData.user_id, 0);
    })();
    // eslint-disable-next-line
  }, []);

  const confirmDelete = (page) => {
    setModal(true);
    setCurrentPage(page);
  };

  const onConfirmDialogClose = (isAcceped) => {
    if (isAcceped) deletePage(currentPage.id);
    setModal(false);
  };
  const tabContent = [
    {
      title: "Chennai",
      content: `Chennai is the capital of the Indian state of Tamil Nadu.
                Located on the Coromandel Coast of the Bay of Bengal, it is one
                of the largest cultural, economic and educational centres of
                south India. According to the 2011 Indian census, it is the
                sixth-most populous city and fourth-most populous urban
                agglomeration in India. The city together with the adjoining
                regions constitutes the Chennai Metropolitan Area, which is the
                36th-largest urban area by population in the world.`,
    },
    {
      title: "Abu Dhabi",
      content: `Abu Dhabi is the capital and the second-most populous city of
                the United Arab Emirates (after Dubai). The city of Abu Dhabi is
                located on an island in the Persian Gulf, off the Central West
                Coast. Most of the city and the Emirate reside on the mainland
                connected to the rest of the country. As of 2020, Abu Dhabi's
                urban area had an estimated population of 1.48 million,[6] out
                of 2.9 million in the emirate of Abu Dhabi, as of 2016.`,
    },
    {
      title: "New York",
      content: `New York City (NYC), often called simply New York, is the most
                populous city in the United States. With an estimated 2019
                population of 8,336,817 distributed over about 302.6 square
                miles (784 km2), New York City is also the most densely
                populated major city in the United States.[11] Located at the
                southern tip of the U.S. state of New York, the city is the
                center of the New York metropolitan area, the largest
                metropolitan area in the world by urban landmass.`,
    },
  ];

  return (
    <>
      <ConfirmDialog
        isOpen={isModalOpen}
        title="Confirm delete"
        content={`Do you want to delete page ${currentPage?.page_name}?`}
        onClose={onConfirmDialogClose}
      />
      <div className="flex flex-col justify-center items-center p-8">
        <div>
          <h1>Clients</h1>
        </div>
        <Tab active={1}>
          {tabContent?.map((tab, index) => (
            <Tab.TabPane key={`Tab-${index}`} tab={tab.title}>
              {tab.content}
            </Tab.TabPane>
          ))}
        </Tab>
        <ul className="list-none w-full max-w-md divide-y divide-gray-200 dark:divide-gray-700 pt-8">
          {pages?.length > 0 &&
            pages.map((itm, i) => {
              return (
                <li key={i} className="py-2">
                  <div className="flex items-center space-x-4">
                    <div className="flex flex-wrap justify-center background-gray-400">
                      <div className="p-2 rounded-full border-2 border-slate-400">
                        <img
                          className="w-8 h-8"
                          src={itm.page_picture}
                          alt="..."
                        />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h6 className="text-sm font-medium text-gray-900 truncate dark:text-white m-0">
                        {itm.page_name}
                      </h6>
                      <span className="text-sm text-gray-500 truncate dark:text-gray-400">
                        {itm.page_id}
                      </span>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                      <button onClick={(_) => confirmDelete(itm)}>
                        <TfiTrash size={20} className="text-cyan-500" />
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
        </ul>
      </div>
    </>
  );
};
