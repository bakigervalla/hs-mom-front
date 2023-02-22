import React from "react";

export const Subtitle = ({ title, textSize = "text-3xl" }) => {
  const className = `text-md md:text-2xl lg:${textSize} text-primary flex items-center pb-6`;
  return <div className={className}>{title}</div>;
};
