"use client";

import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { useLanguage } from "@/context/LanguageContext";
import ar from "@/locales/ar.json";
import en from "@/locales/en.json";

interface ArticleCardProps {
  item: {
    id?: string;
    cimage: string;
    channel: string;
    time: string;
    catImage?: string;
    category: string;
    level: string;
    progress?: number;
    title: string;
    content: string;
  };
  showProgress?: boolean;
  buttonLabel?: string;
}

interface LocaleType {
  channels: Record<string, string>;
  categories: Record<string, string>;
  levels: Record<string, string>;
}

const ArticleCard: React.FC<ArticleCardProps> = ({
  item,
  showProgress = false,
  buttonLabel = "Start Assessment",
}) => {
  const { language } = useLanguage();
  const isArabic = language === "Arabic";

  const locale: LocaleType = language === "Arabic" ? ar : en;

  const channel = locale.channels[item.channel] ?? item.channel;
  const category = locale.categories[item.category] ?? item.category;
  const level = locale.levels[item.level] ?? item.level;

  return (
    <Card className="w-full mx-auto h-auto flex flex-col justify-between p-3 sm:p-4 rounded-xl border border-gray-200 shadow-sm bg-white">
      <CardHeader className="flex flex-col gap-3">
        <div
          className={`flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 w-full ${
            isArabic ? "sm:flex-row-reverse" : ""
          }`}
        >
          <div className={`flex items-center gap-2 ${isArabic ? "flex-row-reverse" : ""}`}>
            <img
              src={item.cimage}
              alt={channel}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover border"
            />
            <div
              className={`flex flex-col sm:flex-row sm:items-center sm:gap-2 ${
                isArabic ? "sm:flex-row-reverse" : ""
              }`}
            >
              <span className="font-semibold text-sm sm:text-base">{channel}</span>
              <span className="text-[11px] sm:text-xs text-gray-500">{item.time}</span>
            </div>
          </div>

          <div
            className={`flex flex-wrap gap-2 text-[11px] sm:text-xs text-black ${
              isArabic ? "flex-row-reverse" : ""
            }`}
          >
            <div
              className={`inline-flex items-center gap-1 bg-[#EFF5EF] rounded-full px-2 py-1 ${
                isArabic ? "flex-row-reverse" : ""
              }`}
            >
              {item.catImage && (
                <img
                  src={item.catImage}
                  alt={`${category}-icon`}
                  className="w-4 h-4 sm:w-5 sm:h-5 object-cover rounded"
                />
              )}
              <span>{category}</span>
            </div>
            <div
              className={`inline-flex items-center gap-1 bg-[#FFD16666] rounded-full px-2 py-1 ${
                isArabic ? "flex-row-reverse" : ""
              }`}
            >
              <span>{level}</span>
            </div>
          </div>
        </div>

        {showProgress && (
          <div
            className={`w-[340px] flex flex-col sm:flex-row items-center gap-2 mt-1 ${
              isArabic ? "sm:flex-row-reverse" : ""
            }`}
          >
            <div className="w-full bg-[#EFF5EF] rounded-full h-2">
              <div
                className="bg-[#CADECB] h-2 rounded-full"
                style={{ width: `${item.progress ?? 0}%` }}
              />
            </div>
            <span className="text-[11px] sm:text-xs font-medium text-gray-600">
              {item.progress ?? 0}%
            </span>
          </div>
        )}
        <div className="border-1 black w-full" />
      </CardHeader>

      <CardContent className={`${isArabic ? "text-right" : "text-left"}`}>
        <h2 className="mb-2 text-base sm:text-lg md:text-xl h-auto font-bold leading-tight">
          {item.title}
        </h2>
        <p className="whitespace-pre-line text-xs sm:text-sm text-neutral-600 leading-snug">
          {item.content}
        </p>
      </CardContent>

      <CardFooter className={`flex ${isArabic ? "justify-start" : "justify-end"}`}>
        <button
          type="button"
          className="py-1.5 px-3 sm:py-2 sm:px-4 font-semibold text-black text-xs sm:text-sm border-2 border-black rounded-md bg-[#C9DECB] hover:bg-green-200 transition"
        >
          {buttonLabel}
        </button>
      </CardFooter>
    </Card>
  );
};

export default ArticleCard;
