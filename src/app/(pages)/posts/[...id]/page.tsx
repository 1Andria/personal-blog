"use client";
import { useParams } from "next/navigation";
import React from "react";
import Data from "../../../../../data.json";
import { useThemeMode, useUserId } from "@/app/Common/Store/Store";
import Link from "next/link";

function Posts() {
  const NightMode = useThemeMode((state) => state.nightMode);
  const path = useParams();
  const firstValue = Array.isArray(path.id) ? path.id[0] : null;
  const secondValue =
    Array.isArray(path.id) && path.id[1]
      ? decodeURIComponent(path.id[1])
      : null;

  const index = Data.findIndex((el) => el.id === Number(firstValue));
  const Posts = Data[index].Blogs;
  const PostIndex = Posts.findIndex((el) => el.publishedAt === secondValue);
  const ThePost = Data[index].Blogs[PostIndex];
  const userId = useUserId((state) => state.userId);

  return (
    <>
      {!secondValue && (
        <div
          className={`max-w-[620px] flex flex-col gap-[20px] w-full min-h-screen  border-l border-r pl-[10px] pr-[10px] pt-[10px] ${
            !NightMode
              ? "border-[#efedeb]  bg-[#fbf9f7] "
              : "border-[#34302d] bg-[#1c1a19]"
          } shadow-sm`}
        >
          <h1
            className={`text-[30px] font-semibold ${
              NightMode ? "text-white" : "text-black"
            }`}
          >
            {Data[index].author}'s posts:
          </h1>
          <div className="flex flex-col gap-[10px]">
            {Posts.map((el, key) => (
              <Link
                href={`/posts/${userId}/${el.publishedAt}`}
                key={key}
                className={`w-full h-[80px]  flex items-center justify-between p-[22px] border ${
                  !NightMode
                    ? "border-[#efedeb]  bg-[#fbf9f7] "
                    : "border-[#34302d] bg-[#1c1a19]"
                }`}
              >
                <div className="flex flex-col gap-[5px]">
                  <h1
                    className={`text-[18px] ${
                      NightMode ? "text-white" : "text-black"
                    }`}
                  >
                    {el.title}
                  </h1>
                  <h3 className={` text-gray-500`}>
                    {el.description.slice(0, 71)}...
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
      {secondValue && (
        <div
          className={`max-w-[620px] flex flex-col gap-[20px] w-full min-h-screen  border-l border-r pl-[10px] pr-[10px] pt-[10px] ${
            !NightMode
              ? "border-[#efedeb]  bg-[#fbf9f7] "
              : "border-[#34302d] bg-[#1c1a19]"
          } shadow-sm  pb-[30px]`}
        >
          <div className="w-full flex items-center flex-col">
            <h1
              className={`text-[20px] font-semibold ${
                NightMode ? "text-white " : "text-black"
              }`}
            >
              {ThePost.title}
            </h1>
            <p className="pl-[30px] text-gray-500 pr-[30px] text-center">
              {ThePost.description}
            </p>
          </div>
          <h3
            className={`text-[18px] text-center ${
              NightMode ? "text-white " : "text-black"
            }`}
          >
            {ThePost.content}
          </h3>
          <div className=" w-full flex justify-end">
            <h2 className="text-gray-500">
              Published at: {ThePost.publishedAt.slice(0, 10)}
            </h2>
          </div>
        </div>
      )}
    </>
  );
}

export default Posts;
