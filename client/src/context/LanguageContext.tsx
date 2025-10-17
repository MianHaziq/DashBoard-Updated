"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import en from "@/locales/en.json";
import ar from "@/locales/ar.json";

interface LanguageContextProps {
  language: "English" | "Arabic";
  t: (key: string) => string;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextProps>({
  language: "English",
  t: (key) => key,
  toggleLanguage: () => {},
});

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<"English" | "Arabic">("English");

  const translations = language === "English" ? en : ar;

  const t = (key: string) => (translations as any)[key] ?? key;

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "English" ? "Arabic" : "English"));
  };

  return (
    <LanguageContext.Provider value={{ language, t, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
