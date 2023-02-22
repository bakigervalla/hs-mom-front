import React from "react";

export const Alert = ({ message }) => {
  return (
    <div
      className={`p-4 mb-4 text-sm rounded-lg dark:bg-gray-800 text-red-800 bg-red-50 dark:text-red-400`}
      role="alert"
    >
      {message}
    </div>
  );
};

export default Alert;
