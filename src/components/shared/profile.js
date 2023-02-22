import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth/context";

import { HiUserCircle } from "react-icons/hi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faUser,
  faGear,
  faAddressCard,
} from "@fortawesome/free-solid-svg-icons";

export const Profile = () => {
  const { logout } = useContext(AuthContext);
  const [isActiveProfile, setIsActiveProfile] = useState(false);
  const navigate = useNavigate();

  const togleProfileDropDown = () => setIsActiveProfile(!isActiveProfile);

  const onLogout = async () => {
    await logout();
    navigate(`/login`);
  };

  return (
    <li className="relative">
      <button
        className="relative align-middle rounded-full focus:shadow-outline-gray focus:outline-none"
        aria-label="Account"
        aria-haspopup="true"
        onClick={togleProfileDropDown}
      >
        <HiUserCircle size={30} />
      </button>
      <div
        className={`profile-menu ${isActiveProfile ? "active" : "inactive"}`}
      >
        <ul
          className="absolute right-0 w-56 p-2 mt-2 space-y-2 text-gray-600 bg-white border border-gray-100 rounded-md shadow-md dark:border-gray-700 dark:text-gray-300 dark:bg-gray-700"
          onMouseLeave={() => setIsActiveProfile(false)}
        >
          <li className="flex">
            <span
              className="inline-flex items-center w-full px-2 py-1 text-sm font-semibold transition-colors duration-150 rounded-md hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-200 cursor-pointer"
              onClick={() => navigate("/profile")}
            >
              <FontAwesomeIcon icon={faUser} className="pr-3 pl-2" />
              Profile
            </span>
          </li>
          <li className="flex" onClick={() => navigate("/subscription")}>
            <span className="inline-flex items-center w-full px-2 py-1 text-sm font-semibold transition-colors duration-150 rounded-md hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-200 cursor-pointer">
              <FontAwesomeIcon icon={faAddressCard} className="pr-3 pl-2" />
              My Subscription
            </span>
          </li>
          <li className="flex" onClick={() => navigate("/change-password")}>
            <span className="inline-flex items-center w-full px-2 py-1 text-sm font-semibold transition-colors duration-150 rounded-md hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-200 cursor-pointer">
              <FontAwesomeIcon icon={faGear} className="pr-3 pl-2" />
              Change Password
            </span>
          </li>
          <hr className="my-8 h-px bg-gray-200 border-0 dark:bg-gray-700"></hr>
          <li className="flex transition-colors duration-150 rounded-md hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-200 cursor-pointer">
            <svg
              className="w-6 h-6 ml-4 mr-1"
              aria-hidden="true"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path>
            </svg>
            <span
              className="inline-flex items-center w-full px-2 py-1 text-sm font-semibold "
              onClick={onLogout}
            >
              Log out
            </span>
          </li>
        </ul>
      </div>
    </li>
  );
};
