"use client";
import React from "react";
import Logo from "./ui/Logo";

interface LeftPanelProps {
  logoSrc: string;
  logoAlt: string;
  title: string;
  heading: string;
  subHeading: string;
}

const LeftPanel: React.FC<LeftPanelProps> = ({
  logoSrc,
  logoAlt,
  title,
  heading,
  subHeading,
}) => {
  return (
    <aside
      className="
        hidden md:flex flex-col items-start justify-center
        md:w-[360px] lg:w-[529px] h-full
        px-6 md:px-8 py-8
        bg-gradient-to-b from-[#FBFFC8] via-[#D7E5D4] to-[#C9DECB] 
      "
      role="complementary"
    >
      <div className="flex flex-col gap-5 md:gap-6 lg:gap-8">
        <Logo logoSrc={logoSrc} logoAlt={logoAlt} title={title} />

       <div className="flex flex-col gap-5 lg:gap-6 max-w-[431px]">
  <h1
    className="
      font-[700] font-[Instrument_Sans] 
      text-[36px] md:text-[48px] lg:text-[60px]
      leading-[102%]
      tracking-[0px]
      text-black
    "
  >
    Master Arabic Naturally.
  </h1>

  <p
    className="
      font-[400] font-[Instrument_Sans]
      text-[16px] md:text-[18px] lg:text-[20px]
      leading-[160%]
      text-[#5F5F5F]
    "
  >
    Learn Arabic using authentic articles & news clips with AI-powered guidance.
  </p>
</div>

      </div>
    </aside>
  );
};

export default LeftPanel;
