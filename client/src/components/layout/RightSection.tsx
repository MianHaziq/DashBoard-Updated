"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
} from "@/components/ui/card";
import { useAppSelector } from "@/redux/store";
import { useLanguage } from "@/context/LanguageContext";

const RightSection = () => {
  const [isClient, setIsClient] = useState(false);
  const [streak, setStreak] = useState<number>(0);
  const [stats, setStats] = useState<any[]>([]);
  const { user } = useAppSelector((state) => state.auth);
  const { language, t } = useLanguage(); 
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    setIsClient(true);

    const fetchAll = async () => {
      try {
        const [streakRes, statsRes] = await Promise.all([
          axios.get("http://localhost:5000/streak", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("http://localhost:5000/stats", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setStreak(streakRes.data?.count || 0);
        setStats(statsRes.data || []);
      } catch (error) {
        console.error("Error fetching right section data:", error);
      }
    };

    if (token) fetchAll();
  }, [token]);

  if (!isClient) {
    return (
      <div className="space-y-6 py-6">
        <Card className="border shadow-sm">
          <CardHeader className="flex justify-center">
            <div className="h-16 w-16 bg-gray-100 rounded-full animate-pulse" />
          </CardHeader>
          <CardContent className="text-center">
            <CardTitle className="text-xl font-medium">Loading...</CardTitle>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div
      className={`space-y-6 py-6 ${
        language === "Arabic" ? "text-right font-[Tajawal]" : "text-left"
      }`}
    >
      <Card className="border relative overflow-hidden rounded-[16px]">
  <img
    src="/confetti.png"
    alt="confetti"
    className="absolute top-0 left-0 w-full object-cover pointer-events-none"
    style={{ height: "128px" }} 
  />

  <CardHeader className="flex justify-center relative z-10">
    <img
      src="/fire.png"
      alt="streak"
      className="h-16 w-16 bg-gray-100 rounded-full p-3 object-contain"
    />
  </CardHeader>

  <CardContent className="text-center relative z-10">
    <CardTitle className="text-xl font-medium">
      {streak} {t("daysInARow")}
    </CardTitle>
    <p className="text-sm text-gray-400">
      {t("youAreDoingGreat")} {user?.firstName ?? t("guest")}!
    </p>
  </CardContent>
</Card>


{stats.map((item) => (
  <Card key={item.id} className="border p-3">
    <CardHeader className="flex justify-between items-center">
      <img
        src={item.image}
        alt={item.title}
        className="h-6 w-6 object-contain"
      />
    </CardHeader>
    <CardContent
      className={`flex justify-between items-center ${
        language === "Arabic" ? "flex-row-reverse" : ""
      }`}
    >
      <CardTitle className="text-sm  whitespace-pre-line font-inter font-semibold text-[#5F5F5F]">
        {language === "Arabic"
          ? t(item.title).split(" ").join("\n")
          : item.title.split(" ").join("\n")}
      </CardTitle>
      <span className="text-2xl font-semibold font-[Instrument_Sans] ">{item.total}</span>
    </CardContent>
  </Card>
      ))}
    </div>
  );
};

export default RightSection;
