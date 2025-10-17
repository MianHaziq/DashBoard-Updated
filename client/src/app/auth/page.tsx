"use client";
import React from "react";
import { useRouter } from "next/navigation";
import LeftPanel from "@/components/LeftPanel";
import Auth from "@/components/Auth";

const AuthPage: React.FC = () => {
  const router = useRouter();

  const handleEmailClick = () => router.push("/signin");
  const handleGoogleClick = () => console.log("Google");
  const handleFacebookClick = () => console.log("FB");
  const handleAppleClick = () => console.log("Apple");
  const handleLoginClick = () => router.push("/signin");

  return (
    <div className="flex flex-col md:flex-row w-full min-h-screen relative bg-white">
      {/* Left side panel */}
      <div className="hidden md:flex md:w-1/2">
        <LeftPanel
          logoSrc="/logo.png"
          logoAlt="LinguLeap Logo"
          title="LinguLeap"
          heading="Master Arabic Naturally."
          subHeading="Learn Arabic using authentic articles & news clips with AI-powered guidance."
        />
      </div>

      {/* Right side auth + footer */}
      <div className="flex-1 flex flex-col items-center justify-between py-10 px-4 sm:px-6 md:px-10 relative">
        <div className="flex-1 flex items-center justify-center w-full">
          <Auth
            onEmailClick={handleEmailClick}
            onGoogleClick={handleGoogleClick}
            onFacebookClick={handleFacebookClick}
            onAppleClick={handleAppleClick}
            onLoginClick={handleLoginClick}
          />
        </div>

        <footer className="w-full flex justify-center px-4 mt-4 mb-4 font-inter">
          <p className="text-[12px] sm:text-[14px] leading-[130%] text-center text-[#5F5F5F] font-inter tracking-[-0.3px] max-w-[419px]">
            By signing up, you agree to LinguLeap’s{" "}
            <span className="underline font-semibold cursor-pointer text-black">
              Terms of Service
            </span>{" "}
            and{" "}
            <span className="underline font-semibold cursor-pointer text-black">
              Privacy Policy
            </span>
            .
          </p>
        </footer>
      </div>
    </div>
  );
};

export default AuthPage;
