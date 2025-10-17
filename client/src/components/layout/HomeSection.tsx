"use client";

import { useState } from "react";
import Reading from "@/components/Reading";
import Listening from "@/components/Listening";
import TabsContainer from "../TabsContainer";
import { useLanguage } from "@/context/LanguageContext";
import ar from "@/locales/ar.json";
import en from "@/locales/en.json";

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<"reading" | "listening">("reading");
  const { language } = useLanguage();
  const locale = language === "Arabic" ? ar : en;
  const isArabic = language === "Arabic";

  return (
    <div className="w-full">
      <TabsContainer />
      <div className="w-full border-b-[2px] border-gray-200 mt-4">
        <div
          className={`flex flex-wrap cursor-pointer font-light gap-6 ${
            isArabic ? "flex-row-reverse text-right" : "text-left"
          }`}
        >
          {["reading", "listening"].map((tab) => (
            <div
              key={tab}
              onClick={() => setActiveTab(tab as "reading" | "listening")}
              className={`flex items-center justify-center transition-all duration-200 ${
                activeTab === tab
                  ? "text-black font-medium border-b-2 border-black"
                  : "text-gray-400 border-b-2 border-transparent"
              }`}
              style={{
                width: "90px", 
                height: "38px",
                paddingTop: "8px",
                paddingBottom: "8px",
                fontFamily: "Inter, sans-serif",
                fontWeight: 500,
                fontSize: "16px",
                lineHeight: "140%",
                letterSpacing: "0px",
                textAlign: "center",
              }}
            >
              {tab === "reading" ? locale.reading : locale.listening}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4">
        {activeTab === "reading" && <Reading />}
        {activeTab === "listening" && <Listening />}
      </div>
    </div>
  );
}
