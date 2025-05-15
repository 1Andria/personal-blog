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
      <div className="w-full h-[100vh] flex justify-center items-center">
        <div className="flex flex-col gap-[10px]">
          <button
            onClick={() => setIsLogIn(true)}
            className="w-[200px] cursor-pointer h-[50px] bg-[blue] rounded-[12px]"
          >
            Log In
          </button>
          <button
            onClick={() => setIsSignIn(true)}
            className="w-[200px] h-[50px] cursor-pointer bg-[blue] rounded-[12px]"
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
