import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGauge,
  faHouse,
  faCircleUser,
  faCircleNodes,
  faChartPie,
} from "@fortawesome/free-solid-svg-icons";

export const NavBar = () => {
  const navigate = useNavigate();

  return (
    <aside className="z-20 w-64 overflow-y-auto bg-white dark:bg-gray-800 md:block h-full">
      <div className=" p-2 text-gray-500 dark:text-gray-400">
        <a
          className="m-4 inline-block align-middle text-lg font-bold text-gray-800 dark:text-gray-200"
          href="/"
        >
          <img alt="..." src={process.env.PUBLIC_URL + "/assets/images/tl-logo.png"} />
        </a>
        <ul className="nav-list mt-20">
          <li
            className="relative px-6 py-2 transition-colors duration-150 rounded-md hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-200 cursor-pointer"
            onClick={() => navigate("/dashboard")}
          >
            <span>
              <FontAwesomeIcon icon={faHouse} className="pr-4" />
              Home
            </span>
          </li>
          <li
            className="relative px-6 py-2 transition-colors duration-150 rounded-md hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-200 cursor-pointer"
            onClick={() => navigate("/dashboard")}
          >
            <span>
              <FontAwesomeIcon icon={faGauge} className="pr-4" />
              Dashboard
            </span>
          </li>
          <li
            className="relative px-6 py-2 transition-colors duration-150 rounded-md hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-200 cursor-pointer"
            onClick={() => navigate("/clients")}
          >
            <span>
              <FontAwesomeIcon icon={faCircleUser} className="pr-4" />
              Clients
            </span>
          </li>
          <li
            className="relative px-6 py-2 transition-colors duration-150 rounded-md hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-200 cursor-pointer"
            onClick={() => navigate("/platformes")}
          >
            <span>
              <FontAwesomeIcon icon={faCircleNodes} className="pr-4" />
              Platformes
            </span>
          </li>
          <li
            className="relative px-6 py-2 transition-colors duration-150 rounded-md hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-200 cursor-pointer"
            onClick={() => navigate("/income")}
          >
            <span>
              <FontAwesomeIcon icon={faChartPie} className="pr-4" />
              Income
            </span>
          </li>
        </ul>
      </div>
    </aside>
  );
};
