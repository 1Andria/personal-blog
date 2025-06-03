"use client";
import { useLogInModal, useSignInModal } from "@/app/Common/Store/Store";
import { Box, Modal } from "@mui/material";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function LogIn() {
  const isLogIn = useLogInModal((state) => state.isLogIn);
  const setIsLogIn = useLogInModal((state) => state.setIsLogIn);
  const setIsSignIn = useSignInModal((state) => state.setIsSignIn);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [incorrect, setIncorrect] = useState(false);
  const router = useRouter();

  function onClose() {
    setIsLogIn(false);
  }

  function toSignIN() {
    setIsLogIn(false);
    setIsSignIn(true);
  }
  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      return;
    }
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/project/auth/sign-in`,
      {
        method: "POST",
        headers: {
          "Content-Type": "Application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      }
    );

    const data = await res.json();
    if (res.status === 200) {
      setCookie("accessToken", data.accessToken, { maxAge: 60 * 60 });
      router.push("/home");
      setEmail("");
      setPassword("");
      setIncorrect(false);
      setIsLogIn(false);
    } else {
      setEmail("");
      setPassword("");
      setIncorrect(true);
    }
  };

  return (
    <Modal
      open={isLogIn}
      onClose={onClose}
      slotProps={{
        backdrop: {
          sx: { backgroundColor: "rgba(36, 45, 52, 0.4)", opacity: "0.5" },
        },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "90%",
          maxWidth: "400px",
        }}
      >
        <form
          onSubmit={handleOnSubmit}
          className="bg-white  rounded-[16px] shadow-xl px-[32px] py-[40px] flex flex-col gap-[24px]"
        >
          <div className="text-center">
            <h1 className="text-[20px] font-bold text-[#1f2937]">
              Welcome Back
            </h1>
            <p className="text-[14px] text-[#6b7280] mt-[4px]">
              Enter your credentials to log in
            </p>
          </div>

          <div className="flex flex-col gap-[8px]">
            <label htmlFor="email" className="text-[14px] text-[#374151]">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="you@example.com"
              className="h-[44px] px-[12px] border border-[#d1d5db] rounded-[8px] focus:outline-none focus:ring-[2px] focus:ring-[#3b82f6]"
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>

          <div className="flex flex-col gap-[8px]">
            <label htmlFor="password" className="text-[14px] text-[#374151]">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              className="h-[44px] px-[12px] border border-[#d1d5db] rounded-[8px] focus:outline-none focus:ring-[2px] focus:ring-[#3b82f6]"
              required
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
          <p
            className={`text-red-600 text-[12px] mt-[-18px] mb-[-15px] ${
              !incorrect ? "opacity-0" : "opacity-100"
            }`}
          >
            Email or Password is incorrect
          </p>
          <div className="flex items-center justify-between text-[14px]">
            <label className="flex items-center gap-[6px] text-[#4b5563]">
              <input type="checkbox" className="accent-[#3b82f6]" />
              Remember me
            </label>
            <span className="text-[#3b82f6] hover:underline cursor-pointer">
              Forgot password?
            </span>
          </div>

          <button
            type="submit"
            className="flex justify-center items-center h-[44px] w-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white rounded-[8px] font-semibold transition-all duration-200 cursor-pointer"
          >
            Log In
          </button>

          <p className="text-[14px] text-center text-[#6b7280]">
            Don’t have an account?{" "}
            <span
              onClick={toSignIN}
              className="text-[#3b82f6] hover:underline cursor-pointer font-medium"
            >
              Sign up
            </span>
          </p>
        </form>
      </Box>
    </Modal>
  );
}

export default LogIn;
