"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import ar from "@/locales/ar.json";
import en from "@/locales/en.json";

interface TabItem {
  title: string;
  url: string;
  image: string;
}

interface TabsProps {
  tabList: TabItem[];
}

const CategoryTabs: React.FC<TabsProps> = ({ tabList }) => {
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const { language } = useLanguage();
  const locale = language === "Arabic" ? ar : en;

  const handleTabClick = (title: string) => {
    setActiveTab(activeTab === title ? null : title);
  };

  return (
    <div
      className={`flex flex-col gap-3 w-full max-w-[774px] px-3 sm:px-0 ${
        language === "Arabic" ? "text-right" : "text-left"
      }`}
    >
      {/* Dynamic heading */}
      <div className="text-[18px] sm:text-[20px] font-semibold font-[Instrument_Sans]">
        {locale.yourTopics}
      </div>

      <div
        className={`flex flex-wrap gap-2 sm:gap-2 ${
          language === "Arabic" ? "flex-row-reverse" : ""
        }`}
      >
        {tabList.map((tab, index) => (
          <div
            key={index}
            onClick={() => handleTabClick(tab.title)}
            className={`flex items-center justify-center cursor-pointer transition-all duration-200 ${
              activeTab === tab.title
                ? "bg-black text-white border-black"
                : "bg-[#F4F8F4] text-black border-black/40"
            }`}
            style={{
              borderWidth: "0.8px",
              borderRadius: "4.8px",
              padding: "6.4px 8px",
              minHeight: "32px",
              whiteSpace: "nowrap",
            }}
          >
            {tab.image && (
              <img
                src={tab.image}
                alt={tab.title}
                className="w-[18px] h-[18px] object-contain"
              />
            )}
            <span
              className={`ml-1 sm:ml-2 text-[12.8px] sm:text-[13px] font-normal leading-[140%] tracking-[-0.24px] ${
                language === "Arabic" ? "ml-0 mr-1" : "ml-1"
              }`}
              style={{
                fontFamily: "Inter, sans-serif",
              }}
            >
              {tab.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryTabs;
