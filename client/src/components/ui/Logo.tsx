"use client";
import React from "react";

interface LogoProps {
  logoSrc: string;
  logoAlt: string;
  title: string;
}

const Logo: React.FC<LogoProps> = ({ logoSrc, logoAlt, title }) => {
  return (
    <div
      className="flex items-center"
      style={{
        width: "175.66px",
        height: "53.72px",
        gap: "12px",
      }}
    >
      <img
        src={logoSrc}
        alt={logoAlt}
        className="w-[42.66px] h-[53.72px] object-contain"
      />
      <h4
        className="font-bold font-sans"
        style={{
          fontSize: "24px",
          lineHeight: "130%",
          width: "121px",
          height: "31px",
        }}
      >
        {title}
      </h4>
    </div>
  );
};

export default Logo;
