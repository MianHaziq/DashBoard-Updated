"use client";
import React from "react";
import { useRouter } from "next/navigation";
import LeftPanel from "@/components/LeftPanel";
import Signin from "@/components/SignIn";
import { useAppDispatch } from "@/redux/store";
import { loginUser } from "@/redux/slices/authSlice";

const SignInPage: React.FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleSignIn = async (email: string, password: string) => {
    const resultAction = await dispatch(loginUser({ email, password }));

    if (loginUser.fulfilled.match(resultAction)) {
      alert("Login successful!");
      router.push("/dashboard");
    } else {
      alert(resultAction.payload || "Login failed");
    }
  };

  return (
    <div className="flex w-screen h-screen">
      <LeftPanel
        logoSrc="/logo.png"
        logoAlt="LinguLeap Logo"
        title="LinguLeap"
        heading="Master Arabic Naturally."
        subHeading="Learn Arabic using authentic articles & news clips with AI-powered guidance."
      />
      <Signin onSignIn={handleSignIn} onSignUpClick={() => router.push("/signup")} />
    </div>
  );
};

export default SignInPage;
