import React from "react";
import { useNavigate } from "react-router-dom";
import "../../../screens/flatsome.css";

export const LoginButton = () => {
  const navigate = useNavigate();

  return (
    <div className="header-button">
      <button
        type="button"
        className="button plain is-link is-xlarge underline text-blue-500 background-transparent outline-none focus:outline-none ease-linear transition-all duration-150"
        onClick={() => navigate("/login")}
      >
        <span>Log in</span>
      </button>
    </div>
  );
};
