import React from "react";

export const FBPageTemplate = ({ pages, activePageId, onSetActive}) => {
  return (
    <div className="flex flex-col justify-center items-center p-2">
      <ul className="list-none w-full max-w-md divide-y divide-gray-200 dark:divide-gray-700">
        {pages &&
          pages.map((page, i) => {
            return (
              <li key={i} className="py-2">
                <div className="flex items-center space-x-4">
                  <div className="flex flex-wrap justify-center background-gray-400">
                      <img className="w-9 h-9" src={page.page_picture} alt="..." />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h6 className="text-sm font-medium text-gray-900 truncate dark:text-white m-0">
                      {page.page_name}
                    </h6>
                    <span className="text-sm text-gray-500 truncate dark:text-gray-400">
                      {page.page_id}
                    </span>
                  </div>
                  <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                    <input
                      id="active"
                      name="active"
                      type="radio"
                      title="Active Page"
                      checked={activePageId === page.page_id}
                      onChange={(_) => onSetActive(page)}
                      className="text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 
        dark:border-gray-600"
                    />
                  </div>
                </div>
              </li>
            );
          })}
      </ul>
    </div>
  );
};
