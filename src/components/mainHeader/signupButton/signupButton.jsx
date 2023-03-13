import React from "react";
import { useNavigate } from "react-router-dom";
import "../../../screens/flatsome.css";

export const SignupButton = () => {
  const navigate = useNavigate();

  return (
    <div className="header-button">
      <button
        type="button"
        className="button px-6 primary is-large box-shadow-2-hover is-xlarge underline text-blue-500 background-transparent outline-none focus:outline-none ease-linear transition-all duration-150"
        onClick={() => navigate("/subscription")}
        style={{ borderRadius: "3px" }}
      >
        <span>Sign up for free</span>
      </button>
    </div>
  );
};
