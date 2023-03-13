import React from "react";

import { SessionExpired } from "../shared/session-expired";

export const InstagramDashboard = () => {

  const authenticate = async () => {
    
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8">
        <SessionExpired
          message="Please authenticate to get Instagram pages and profiles."
          callbackTitle="Authenticate"
          callback={authenticate}
        />
    </div>
  );
};
