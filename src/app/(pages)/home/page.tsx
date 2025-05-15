"use client";
import { useThemeMode, useUserId } from "@/app/Common/Store/Store";
import React from "react";
import Data from "../../../app/../../data.json";
import Link from "next/link";

function HomePage() {
  const NightMode = useThemeMode((state) => state.nightMode);
  const setUserId = useUserId((state) => state.setUserId);

  return (
    <>
      <div
        className={`max-w-[620px] w-full min-h-screen border-l border-r pl-[10px] pr-[10px] pt-[10px] ${
          !NightMode
            ? "border-[#efedeb]  bg-[#fbf9f7] "
            : "border-[#34302d] bg-[#1c1a19]"
        } shadow-sm`}
      >
        <div className="flex flex-col gap-[10px]">
          {Data?.map((el, key) => (
            <Link
              href={`/posts/${el.id}`}
              onClick={() => {
                setUserId(el.id);
              }}
              key={key}
              className={`w-full h-[80px]  flex items-center justify-between p-[22px] border ${
                !NightMode
                  ? "border-[#efedeb]  bg-[#fbf9f7] "
                  : "border-[#34302d] bg-[#1c1a19]"
              }`}
            >
              <div className="flex items-center gap-[10px]">
                <div className="w-[40px] h-[40px] rounded-[50px] bg-[blue]"></div>
                <h1 className={`${NightMode ? "text-white" : "text-black"}`}>
                  {el.author}
                </h1>
              </div>
              <div
                className={`${
                  NightMode ? "text-white" : "text-black"
                } flex flex-col items-end`}
              >
                <h5>
                  Blog Style:{" "}
                  <span className="text-blue-600">{el.category}</span>
                </h5>
                <h3>{el.Blogs.length}posts</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export default HomePage;
