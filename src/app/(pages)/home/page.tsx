"use client";
import { useThemeMode, useUserId } from "@/app/Common/Store/Store";
import React from "react";
import Data from "../../../app/../../data.json";
import Link from "next/link";

function HomePage() {
  const NightMode = useThemeMode((state) => state.nightMode);
  const setUserId = useUserId((state) => state.setUserId);

  return (
    <div
      className={`max-w-[620px] w-full min-h-[calc(100vh-72px)] border-l border-r px-[20px] pt-[20px] pb-[40px] ${
        NightMode
          ? "border-[#34302d] bg-[#1c1a19] text-white"
          : "border-[#efedeb] bg-[#fbf9f7] text-black"
      } shadow-sm`}
    >
      <h1 className="text-[22px] font-bold mb-[20px]">Browse Authors</h1>

      <div className="flex flex-col gap-[16px]">
        {Data.map((el, key) => (
          <Link
            href={`/posts/${el.id}`}
            key={key}
            onClick={() => setUserId(el.id)}
            className={`w-full flex items-center justify-between px-[16px] py-[14px] rounded-[12px] border transition hover:scale-[1.01] ${
              NightMode
                ? "border-[#2a2624] bg-[#252221] hover:bg-[#2e2a29]"
                : "border-[#e4e2e0] bg-[#ffffff] hover:bg-[#f4f2f1]"
            }`}
          >
            <div className="flex items-center gap-[12px]">
              <div className="w-[44px] h-[44px] rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold text-lg">
                {el.author[0]}
              </div>
              <div className="flex flex-col">
                <h2 className="text-[16px] font-medium">{el.author}</h2>
                <span className="text-[13px] text-gray-500">{el.category}</span>
              </div>
            </div>
            <span className="text-[14px] text-gray-400">
              {el.Blogs.length} post{el.Blogs.length !== 1 ? "s" : ""}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
