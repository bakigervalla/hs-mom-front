import React from "react";
import { Notification } from "./notification";
import { Profile } from "./profile";
import { SearchBar } from "./searchbar";

export const Header = () => {
  return (
    <div className="z-10 py-2 bg-white dark:bg-gray-800">
      <div className="container flex items-center justify-between h-full px-6 mx-auto text-gray-600 dark:text-gray-300">
        <SearchBar />
        <ul className="my-2 flex items-center flex-shrink-0 space-x-1 list-none header-ul">
          <Notification />
          <Profile />
        </ul>
      </div>
    </div>
  );
};
