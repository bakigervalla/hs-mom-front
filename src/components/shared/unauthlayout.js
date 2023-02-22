import React from "react";
import { Outlet } from "react-router-dom";

export const UnAuthLayout = () => {

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col flex-1 w-full">
        <main className="h-full overflow-y-auto">
          <div className="unauth-layout container px-6 mx-auto grid">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};
