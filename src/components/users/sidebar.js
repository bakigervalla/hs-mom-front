import React from "react";

export const Sidebar = () => {
  return (
    <>
      <div className="mt-40 mb-10 tracking-wide text-center">
        <img
          className="w-[35%]"
          alt="..."
          src={process.env.PUBLIC_URL + "/assets/images/logo.png"}
        />
      </div>
      <div className="sidebar-welcome mb-auto text-xl md:text-2xl lg:text-3xl tracking-wider text-center">
        Welcome to Homesourcing
      </div>
      <div className="img-home ">
        <img
          className="mb-6 md:mb-10 lg:mb-20"
          alt="..."
          src={process.env.PUBLIC_URL + "/assets/images/home.png"}
        />
      </div>
    </>
  );
};
