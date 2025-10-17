"use client";

import { Separator } from "@/components/ui/separator";
import HomeSection from "./HomeSection";
import RightSection from "./RightSection";
import { useLanguage } from "@/context/LanguageContext";

const MainSection = () => {
  const { language } = useLanguage();

  return (
    <div
      className={`flex flex-col lg:flex-row w-full px-4 lg:px-6 bg-white min-h-screen`}
    >
      <div className="w-full lg:w-3/4 mx-auto">
        <HomeSection />
      </div>

      <Separator
        orientation="vertical"
        className={`hidden lg:block ${
          language === "Arabic" ? "mr-4" : "ml-4"
        }`}
      />

      <div
        className={`w-full lg:w-1/4 mt-4 lg:mt-0 ${
          language === "Arabic" ? "lg:order-first lg:ml-0 lg:mr-4" : "lg:ml-4"
        }`}
      >
        <RightSection />
      </div>
    </div>
  );
};

export default MainSection;
