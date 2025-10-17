"use client";

import { useLayout } from "@/context/LayoutContext";
import { X, Menu, Globe, Languages } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function Sidebar() {
  const { sidebarOpen, setSidebarOpen } = useLayout();
  const [isMobile, setIsMobile] = useState(false);
  const [active, setActive] = useState("Home");
  const { language, t, toggleLanguage } = useLanguage();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navItems = [
    { name: t("home"), image: "/Home.png" },
    { name: t("learn"), image: "/Learn.png" },
    { name: t("progressTracker"), image: "/progress.png" },
    { name: t("profile"), image: "/profile.png" },
    { name: t("settings"), image: "/setting.png" },
  ];

  return (
    <>
      {isMobile && !sidebarOpen && (
        <button
          className={`fixed top-3 ${language === "English" ? "left-2" : "right-2"} 
            z-50 bg-white border rounded-md flex items-center justify-center w-8 h-8`}
          onClick={() => setSidebarOpen(true)}
        >
          <Menu size={18} />
        </button>
      )}

      <aside
        className={`fixed top-0 ${language === "English" ? "left-0" : "right-0"}
          h-screen w-[270px] bg-white border-gray-200 p-6 flex flex-col justify-between 
          z-40 transform transition-transform duration-300
          ${sidebarOpen 
            ? "translate-x-0" 
            : language === "English" 
              ? "-translate-x-full lg:translate-x-0" 
              : "translate-x-full lg:translate-x-0"}
          ${language === "Arabic" ? "border-l border-gray-200" : "border-r border-gray-200"}
        `}
      >
        <div>
          {isMobile && sidebarOpen && (
            <button
              className={`absolute top-3 ${language === "English" ? "right-3" : "left-3"} text-gray-700`}
              onClick={() => setSidebarOpen(false)}
            >
              <X size={20} />
            </button>
          )}

          <h1 className={`font-bold text-[28px] text-black font-[Instrument_Sans] mb-6 ${language === "Arabic" ? "text-right" : "text-left"}`}>
            LinguLeap
          </h1>

          <nav className={`flex flex-col gap-2 ${language === "Arabic" ? "items-end text-right" : ""}`}>
            {navItems.map((item, i) => {
              const isActive = active === item.name;
              return (
                <Link
                  key={i}
                  href="#"
                  onClick={() => setActive(item.name)}
                  className={`flex items-center ${language === "Arabic" ? "flex-row-reverse" : ""} gap-3 text-[14px] font-semibold rounded-[8px] transition-all
                    ${isActive 
                      ? "bg-[#E3EEE4] text-black px-4 py-2" 
                      : "text-gray-700 px-[5px] py-[5px] hover:bg-[#E3EEE4]/50 hover:text-black"
                    }`}
                  style={{ width: "222px", height: "40px" }}
                >
                  <img src={item.image} alt={item.name} className="w-5 h-5 object-contain" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="mt-auto border-t border-gray-200 pt-4">
          <button
            onClick={toggleLanguage}
            className={`w-full flex items-center justify-center gap-2 bg-[#E3EEE4] text-black py-2 rounded-md font-semibold text-[14px] hover:bg-[#d9e7da] transition-all ${language === "Arabic" ? "flex-row-reverse" : ""}`}
          >
            {language === "English" ? <Globe className="w-5 h-5 text-black" /> : <Languages className="w-5 h-5 text-black" />}
            {t("languageToggle")}
          </button>
        </div>
      </aside>
    </>
  );
}
