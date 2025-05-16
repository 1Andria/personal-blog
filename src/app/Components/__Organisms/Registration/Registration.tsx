"use client";
import { useLogInModal, useSignInModal } from "@/app/Common/Store/Store";
import React from "react";
import LogIn from "../../__Molecules/LogIn/LogIn";
import SignIn from "../../__Molecules/SignIn/SignIn";

function Registration() {
  const setIsLogIn = useLogInModal((state) => state.setIsLogIn);
  const setIsSignIn = useSignInModal((state) => state.setIsSignIn);

  return (
    <>
      <div className="w-full min-h-screen mt-[-20px] flex flex-col justify-center items-center bg-gradient-to-br from-[#eef3ff] to-[#dbe6ff] px-6">
        <div className="mb-8">
          <div className="w-[120px] h-[120px] rounded-full bg-blue-100 flex items-center justify-center shadow-md">
            <span className="text-4xl">📝</span>
          </div>
        </div>
        <div className="text-center mb-6">
          <h1 className="text-[36px] font-extrabold text-gray-900 mb-1 leading-tight">
            Welcome to ThoughtSpace
          </h1>
          <p className="text-gray-600 text-[18px] max-w-md">
            A cozy corner to write, reflect, and share your inner world.
          </p>
        </div>

        <div className="flex flex-col gap-4 items-center w-full max-w-xs">
          <button
            onClick={() => setIsLogIn(true)}
            className="w-full h-[50px] bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 text-white rounded-xl font-semibold text-lg transition-all duration-200 shadow-sm"
          >
            Log In
          </button>
          <button
            onClick={() => setIsSignIn(true)}
            className="w-full h-[50px] bg-white border border-blue-600 hover:bg-blue-50 text-blue-600 rounded-xl font-semibold text-lg transition-all duration-200 shadow-sm"
          >
            Sign Up
          </button>
        </div>
        <LogIn />
        <SignIn />
      </div>
    </>
  );
}

export default Registration;
