import React from "react";
// import { Notification } from "./notification";
// import { Profile } from "./profile";

export const SearchBar = () => {
  return (
    <div className="flex justify-center flex-1 lg:mr-32">
      <div className="relative w-full max-w-xl mr-6 focus-within:text-purple-500">
        <div className="search-icon absolute inset-y-0 flex items-center">
          <svg
            className="w-4 h-4"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            ></path>
          </svg>
        </div>
        <input
          className="w-full text-sm text-gray-700 placeholder-gray-600 border-1 border-slate-300 rounded-full dark:placeholder-gray-500 dark:focus:shadow-outline-gray dark:focus:placeholder-gray-600 dark:bg-gray-700 dark:text-gray-200 focus:placeholder-gray-500 focus:bg-white focus:border-purple-300 focus:outline-none focus:shadow-outline-purple form-input"
          type="text"
          placeholder="Search..."
          aria-label="Search"
        />
      </div>
    </div>
  );
};
