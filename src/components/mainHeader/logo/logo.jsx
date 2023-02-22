import React from "react";

function Logo() {
  return (
    <div id="logo" className="flex-col logo">
      <a
        href="https://marketing.homesourcing.co/"
        title="Home Sourcing"
        target="_blank"
        rel="home noopener noreferrer"
      >
        <img
          width="62"
          height="25"
          src="../../../assets/images/HomeSourcing_logo.png"
          className="header_logo"
          alt="Home Sourcing"
        />
      </a>
    </div>
  );
}

export default Logo;
