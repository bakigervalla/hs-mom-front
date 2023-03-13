import React from "react";
import Dropdown from "../shared/dropdown";

export const Toolbar = ({
  apps,
  pagesOptions,
  selectedOption,
  onChangeActiveApp,
  onChangeActivePage,
}) => {

  const AppItem = ({ app, onPress }) => {
    return (
        <div className={`flex flex-col items-center text-center cursor-pointer hover:scale-125 text-slate-600 ${app.is_default && 'text-violet-900 font-extrabold'}`}
            onClick={onPress}>
            <img width={24} src={app.image} alt="..." />
            <p className="text-xs ">{app.name}</p>
        </div>
    )
}

  return (
    <div className="flex flex-row bg-white rounded-lg border-2 border-slate-100 p-2 px-10 overflow-hidden mb-8">
      <div>
        <Dropdown
          isSearchable
          placeHolder="Select..."
          options={pagesOptions}
          selected={selectedOption}
          onChange={(e) => onChangeActivePage(e.page)}
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
