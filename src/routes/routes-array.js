import React from "react";
import { useRoutes } from "react-router-dom";
// import { Home } from "../components/home/home";
import { Home } from "../screens/Dashboard/home";
import { About } from "../components/about/about";
import { Login } from "../components/users/login";
import { Registration } from "../components/users/registration";

export const RoutesArray = (authenticated) => {
  return useRoutes([
    {
      path: "home",
      element: <Home />,
    },
    {
      path: "",
      redirectTo: "home",
      element: <Home />,
    },
    {
      path: "login",
      element: <Login />,
    },
    {
      path: "register",
      element: <Registration />,
    },
    {
      path: "about",
      element: <About />,
    },
  ]);
};
