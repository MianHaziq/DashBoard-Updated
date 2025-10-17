"use client";
import React from "react";
import Image from "next/image";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaApple } from "react-icons/fa";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
  CardContent,
} from "@/components/ui/card";

interface AuthProps {
  onEmailClick?: () => void;
  onGoogleClick?: () => void;
  onFacebookClick?: () => void;
  onAppleClick?: () => void;
  onLoginClick?: () => void;
}

const Auth: React.FC<AuthProps> = ({
  onEmailClick,
  onGoogleClick,
  onFacebookClick,
  onAppleClick,
  onLoginClick,
}) => {
  return (
    <div className="flex flex-1 justify-center items-center w-full min-h-[calc(100vh-80px)] px-4 sm:px-6 md:px-10">
      <Card className="w-full max-w-[417px] bg-white shadow-none border-none">
        <CardHeader className="space-y-3 text-center sm:text-left font-[Instrument_Sans]">
          <CardTitle className="font-semibold text-[28px] sm:text-[32px] md:text-[36px] leading-[120%] text-black">
            Sign up to learn Arabic with news
          </CardTitle>

          <CardDescription className="font-inter text-[12px] sm:text-[14px] md:text-[16px] leading-[160%] text-[#5F5F5F]">
            Get access to authentic articles, audio, and guided lessons tailored
            to your skill level.
          </CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col gap-3 font-inter">
          <button
            onClick={onEmailClick}
            className="relative w-full h-[48px] sm:h-[50px] md:h-[52px] bg-white text-black border border-black rounded-lg font-medium text-[14px] sm:text-[15px] md:text-[16px] hover:bg-gray-100 transition-colors"
          >
            <span className="absolute left-4 top-1/2 -translate-y-1/2">
              <Image
                src="/@.png"
                alt="Email Icon"
                width={22}
                height={22}
                className="object-contain"
                priority
              />
            </span>
            Continue with Email
          </button>

          <button
            onClick={onGoogleClick}
            className="relative w-full h-[48px] sm:h-[50px] md:h-[52px] bg-white text-black border border-black rounded-lg font-medium text-[14px] sm:text-[15px] md:text-[16px] hover:bg-gray-100 transition-colors"
          >
            <span className="absolute left-4 top-1/2 -translate-y-1/2">
              <FcGoogle size={22} />
            </span>
            Continue with Google
          </button>

          <button
            onClick={onAppleClick}
            className="relative w-full h-[48px] sm:h-[50px] md:h-[52px] bg-white text-black border border-black rounded-lg font-medium text-[14px] sm:text-[15px] md:text-[16px] hover:bg-gray-100 transition-colors"
          >
            <span className="absolute left-4 top-1/2 -translate-y-1/2">
              <FaApple size={22} />
            </span>
            Continue with Apple
          </button>

          <button
            onClick={onFacebookClick}
            className="relative w-full h-[48px] sm:h-[50px] md:h-[52px] bg-white text-black border border-black rounded-lg font-medium text-[14px] sm:text-[15px] md:text-[16px] hover:bg-gray-100 transition-colors"
          >
            <span className="absolute left-4 top-1/2 -translate-y-1/2">
              <FaFacebook size={22} color="#1877F2" />
            </span>
            Continue with Facebook
          </button>
        </CardContent>

        <CardFooter className="flex justify-center sm:justify-start font-inter mt-2">
          <span className="text-[14px] sm:text-[15px] text-center sm:text-left">
            Already have an account?{" "}
            <button
              onClick={onLoginClick}
              className="font-medium hover:text-black cursor-pointer"
            >
              Login
            </button>
          </span>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Auth;
