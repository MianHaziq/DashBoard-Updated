"use client";

import { useState, useEffect } from "react";
import ArticleCard from "./ArticleCard";
import axios from "axios";
import { useLanguage } from "@/context/LanguageContext";
import ar from "@/locales/ar.json";
import en from "@/locales/en.json";

export interface ArticleItem {
  id: string;
  cimage: string;
  channel: string;
  time: string;
  catImage?: string;
  category: string;
  level: string;
  progress: number;
  title: string;
  content: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

const Reading = () => {
  const { language } = useLanguage();
  const locale = language === "Arabic" ? ar : en;
  const [articles, setArticles] = useState<ArticleItem[]>([]);
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await axios.get<ArticleItem[]>(
          "http://localhost:5000/articles",
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          }
        );
        setArticles(res.data);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };

    if (token) fetchArticles();
  }, [token]);

  const today = articles.filter((a) => a.progress === 0);
  const inProgress = articles.filter((a) => a.progress > 0);

  return (
    <div
      className={`flex flex-col gap-6 w-full overflow-x-hidden ${
        language === "Arabic" ? "text-right" : "text-left"
      }`}
    >
      <div
        className={`flex flex-wrap justify-between items-center gap-3 ${
          language === "Arabic" ? "flex-row-reverse" : ""
        }`}
      >
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold font-[Instrument_Sans]">
          {locale.todaysArticles}
        </h2>
        <button className="text-sm sm:text-base font-medium hover:underline">
          {locale.viewAll}
        </button>
      </div>

      <div className="flex flex-col gap-6 w-full">
        {today.length ? (
          today.map((item) => (
            <ArticleCard
              key={item.id}
              item={item}
              buttonLabel={locale.startAssessment}
            />
          ))
        ) : (
          <div className="text-sm text-gray-500">{locale.noArticlesToday}</div>
        )}
      </div>

      <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mt-6 font-[Instrument_Sans]">
        {locale.inProgress}
      </h2>

      <div className="flex flex-col gap-6 w-full">
        {inProgress.length ? (
          inProgress.map((item) => (
            <ArticleCard
              key={item.id}
              item={item}
              showProgress
              buttonLabel={locale.continue}
            />
          ))
        ) : (
          <div className="text-sm text-gray-500">{locale.noInProgressArticles}</div>
        )}
      </div>
    </div>
  );
};

export default Reading;
