import React from "react";

import { AppItem } from "../dashboard/app";
import Dropdown from "../shared/dropdown";

export const Toolbar = ({
  apps,
  pagesOptions,
  onChangeActiveApp,
  onChangeActivePage,
}) => {
  return (
    <div className="flex flex-row bg-white rounded-lg border-2 border-slate-100 p-2 px-10 overflow-hidden mb-8">
      <div>
        <Dropdown
          isSearchable
          placeHolder="Select..."
          options={pagesOptions}
          selected={pagesOptions?.filter((x) => {
            return x.default === true;
          })}
          onChange={(e) => onChangeActivePage(e)}
        />
      </div>
      <div className="flex float-right gap-6">
        {apps &&
          apps.map((itm, i) => {
            return (
              <AppItem
                key={i}
                app={itm}
                onPress={() => onChangeActiveApp(itm)}
              />
            );
          })}
      </div>
    </div>
  );
};
