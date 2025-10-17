"use client";

import CategoryTabs from "./CategoryTabs";
import { useLanguage } from "@/context/LanguageContext";
import ar from "@/locales/ar.json";
import en from "@/locales/en.json";

export default function TabsContainer() {
  const { language } = useLanguage();
  const locale = language === "Arabic" ? ar : en;

  return <CategoryTabs tabList={locale.tabs} />;
}
