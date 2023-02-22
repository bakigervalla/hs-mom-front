import React from "react";
import { Outlet } from "react-router-dom";

import { NavBar } from "./navbar";
import { Header } from "./header";

export const AuthLayout = () => {
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <NavBar />
      <div className="flex flex-col flex-1 w-full">
        <Header />
        <main className="h-full overflow-y-auto">
          <div className="container px-6 mx-auto grid">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};
