"use client";
import React from "react";
import { useRouter } from "next/navigation";
import LeftPanel from "@/components/LeftPanel";
import Signup from "@/components/Signup";
import { useAppDispatch } from "@/redux/store";
import { signupUser } from "@/redux/slices/authSlice";

const SignUpPage: React.FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleSignInClick = () => router.push("/signin");

  const handleSignUp = async (firstName: string, email: string, password: string) => {
    const response = await dispatch(signupUser({ firstName, email, password }));

    if (signupUser.fulfilled.match(response)) {
      alert("Signup successful!");
      router.push("/signin");
    } else {
      alert(response.payload || "Signup failed");
    }
  };

  return (
    <div className="flex w-screen h-screen">
      <LeftPanel
        logoSrc="/logo.png"
        logoAlt="LinguLeap Logo"
        title="LinguLeap"
        heading="Join LinguLeap Today!"
        subHeading="Start your Arabic journey with personalized, AI-guided lessons."
      />
      <Signup onSignUp={handleSignUp} onSignInClick={handleSignInClick} />
    </div>
  );
};

export default SignUpPage;
