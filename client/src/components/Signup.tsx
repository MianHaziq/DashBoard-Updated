import React, { useState } from "react";
import { GoEye, GoEyeClosed } from "react-icons/go";
import validator from "validator";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

interface SignupProps {
  onSignUp: (firstName: string, email: string, password: string) => void;
  onSignInClick: () => void;
}

const Signup: React.FC<SignupProps> = ({ onSignUp, onSignInClick }) => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!validator.isStrongPassword(password, {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })) {
      setError("Password must be at least 8 chars, with uppercase, lowercase, number, and special char.");
      return;
    }

    setError("");
    onSignUp(firstName, email, password);
  };

  return (
    <div className="flex flex-1 justify-center items-center min-h-screen px-4 sm:px-0">
      <Card className="w-full max-w-[417px]">
        <CardHeader className="space-y-2">
          <CardTitle className="text-[32px] font-semibold font-[Instrument_Sans]">
            Sign Up
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3 font-inter">
            {/* Name */}
            <div className="flex flex-col gap-1">
              <label htmlFor="name" className="text-[16px] font-normal leading-[140%]">Name</label>
              <input
                id="name"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Your Name"
                className="w-full h-[52px] px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9DECB]"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="text-[16px] font-normal leading-[140%]">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email address"
                className="w-full h-[52px] px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9DECB]"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1 relative">
              <label htmlFor="password" className="text-[16px] font-normal leading-[140%]">Password</label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full h-[52px] px-4 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9DECB]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
                >
                  {showPassword ? <GoEyeClosed size={20} /> : <GoEye size={20} />}
                </button>
              </div>
              {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
            </div>

            <button
              type="submit"
              className="w-full h-[54px] rounded-lg text-[16px] font-semibold px-5 py-4 hover:bg-[#BBD3B4] transition-colors"
              style={{ backgroundColor: "#C9DECB", border: "1.5px solid #000" }}
            >
              Sign Up
            </button>
          </form>
        </CardContent>

        <CardFooter className="flex justify-start">
          <span className="text-[15px] text-[#5F5F5F]">
            Already have an account?{" "}
            <button onClick={onSignInClick} className="font-medium text-black cursor-pointer">
              Sign in
            </button>
          </span>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Signup;
