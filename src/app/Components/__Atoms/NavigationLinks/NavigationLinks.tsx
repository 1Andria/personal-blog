"use client";
import { useThemeMode } from "@/app/Common/Store/Store";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

function NavigationLinks() {
  const path = usePathname();
  const NightMode = useThemeMode((state) => state.nightMode);

  return (
    <>
      <div className="flex gap-[20px] ">
        <Link
          href={"/home"}
          className={`relative h-[27px] after:content-[''] after:absolute after:bottom-0  after:left-[50%] after:w-0 after:h-[3px] after:bg-[#93CEFC] after:transition-all after:duration-300 hover:after:w-[100%] hover:after:left-0  ${
            path === "/home"
              ? "  hover:after:translate-x-[+0%]    after:translate-x-[-50%] after:w-[100%]  "
              : ""
          } ${NightMode ? "text-white" : "text-black"} `}
        >
          Home
        </Link>
        <Link
          href={"/blog"}
          className={`  h-[27px] relative after:content-[''] after:absolute after:bottom-[0]  after:left-[50%] after:w-0 after:h-[2px] after:bg-[#93CEFC] after:transition-all after:duration-300 hover:after:w-[100%] hover:after:left-0  ${
            path === "/blog"
              ? "  hover:after:translate-x-[+0%]    after:translate-x-[-50%] after:w-[100%]  "
              : ""
          } ${NightMode ? "text-white" : "text-black"} `}
        >
          Blog
        </Link>
        <Link
          href={"/newsletter"}
          className={`relative h-[27px] after:content-[''] after:absolute after:bottom-0  after:left-[50%] after:w-0 after:h-[2px] after:bg-[#93CEFC] after:transition-all after:duration-300 hover:after:w-[100%] hover:after:left-0  ${
            path === "/newsletter"
              ? "  hover:after:translate-x-[+0%]    after:translate-x-[-50%] after:w-[100%]  "
              : ""
          } ${NightMode ? "text-white" : "text-black"} `}
        >
          NewsLetter
        </Link>
      </div>
    </>
  );
}

export default NavigationLinks;
