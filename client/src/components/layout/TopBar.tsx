"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";
import { useAppSelector, useAppDispatch } from "@/redux/store";
import { fetchUserDetails } from "@/redux/slices/authSlice";

type UserType = {
  id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  image?: string | null;
};

export default function TopBar({ className }: { className?: string }) {
  const { language, t } = useLanguage();
  const dispatch = useAppDispatch();
  const { user, token } = useAppSelector((state) => state.auth as { user: UserType | null; token: string | null });

  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
    if (token && !user) {
      dispatch(fetchUserDetails());
    }
  }, [token, user, dispatch]);

  if (!isClient) {
    return (
      <header className="h-[76px] bg-white border-b border-gray-200 w-full" />
    );
  }

  const fullName =
    user && (user.firstName || user.lastName)
      ? `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim()
      : "Micheal";
  const email = user?.email ?? "micheal@gmail.com";

  return (
    <header
      className={cn(
        "flex items-center justify-between border-b border-gray-200 bg-white",
        "pl-14 pr-4 sm:pl-14 md:px-14 lg:px-10 py-3 md:py-4",
        "w-full h-auto md:h-[76px]",
        language === "Arabic" ? "flex-row-reverse text-right" : "",
        className
      )}
    >
      <h1
        className={cn(
          "font-semibold text-gray-900 text-base sm:text-lg md:text-xl lg:text-2xl truncate"
        )}
        style={{ fontFamily: "Instrument Sans, sans-serif" }}
      >
        {t("welcomeBack")}, {fullName} 👋🏻
      </h1>

      <div
        className={cn(
          "flex items-center gap-2 sm:gap-3 md:gap-4 flex-shrink-0",
          language === "Arabic" && "flex-row-reverse"
        )}
      >
        <img
          src="/dp1.jpg"
          alt="Profile"
          className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover border"
        />
        <div className={cn("hidden sm:flex flex-col", language === "Arabic" && "items-end")}>
          <span className="text-sm md:text-base font-medium text-gray-900">
            {fullName}
          </span>
          <span className="text-xs md:text-sm text-gray-500">{email}</span>
        </div>
      </div>
    </header>
  );
}
