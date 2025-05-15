"use client";
import React from "react";
import NavBar from "../../__Molecules/NavBar/NavBar";
import { useThemeMode } from "@/app/Common/Store/Store";

function RootDiv({ children }: { children: React.ReactNode }) {
  const NightMode = useThemeMode((state) => state.nightMode);
  return (
    <>
      <div
        className={`w-[100%] min-h-screen h-auto pt-[20px] flex flex-col items-center ${
          !NightMode ? "bg-[#FBF9F7]" : "bg-[#1c1a19]"
        }`}
      >
        <NavBar />
        {children}
      </div>
    </>
  );
}

export default RootDiv;
