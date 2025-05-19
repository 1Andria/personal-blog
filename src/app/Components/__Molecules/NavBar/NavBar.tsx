"use client";
import { useThemeMode } from "@/app/Common/Store/Store";
import { usePathname } from "next/navigation";
import React from "react";
import NavigationLinks from "../../__Atoms/NavigationLinks/NavigationLinks";
import Image from "next/image";
import Moon from "../../../Common/Images/Icon.png";
import Sun from "../../../Common/Images/sun.png";
import Link from "next/link";

function NavBar() {
  const pathname = usePathname();
  const NightMode = useThemeMode((state) => state.nightMode);
  const setNightMode = useThemeMode((state) => state.setNightMode);
  function refreshPage() {
    window.location.reload();
  }
  return (
    <>
      <div
        className={`${pathname === "/" ? "hidden" : "block"} ${
          !NightMode ? "bg-[#FEFEFE]" : "bg-[#201e1d]"
        } ${
          !NightMode ? "border-[#efedeb]" : "border-[#34302d]"
        } max-w-[640px] w-full h-[52px]  rounded-[12px] shadow-lg border-[1px] p-[6px] flex justify-between  items-center `}
      >
        <div className="flex items-center gap-[6px]">
          <div className="cursor-pointer" onClick={refreshPage}>
            <span className="text-3xl">📝</span>
          </div>
          <Link href={"/"} className={`font-semibold text-red-800 `}>
            Log out
          </Link>
        </div>
        <div className="flex items-center gap-[10px]">
          <NavigationLinks />
          <button
            onClick={setNightMode}
            className={`w-[40px] cursor-pointer h-[40px] rounded-[6px]   ${
              !NightMode
                ? "border-[#efedeb]  bg-[#fbf9f7] "
                : "border-[#34302d] bg-[#1c1a19]"
            } border-[1px] shadow-sm flex justify-center items-center `}
          >
            <Image
              src={!NightMode ? Moon : Sun}
              width={100}
              height={100}
              alt="moon"
              className="w-[17px] h-[17px]"
            />
          </button>
        </div>
      </div>
    </>
  );
}

export default NavBar;
