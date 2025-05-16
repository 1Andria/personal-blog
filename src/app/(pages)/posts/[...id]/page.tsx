"use client";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import Data from "../../../../../data.json";
import { useThemeMode, useUserId } from "@/app/Common/Store/Store";
import Link from "next/link";

function Posts() {
  const NightMode = useThemeMode((state) => state.nightMode);
  const path = useParams();
  const router = useRouter();
  const userId = useUserId((state) => state.userId);

  const firstValue = Array.isArray(path.id) ? path.id[0] : null;
  const secondValue =
    Array.isArray(path.id) && path.id[1]
      ? decodeURIComponent(path.id[1])
      : null;

  const index = Data.findIndex((el) => el.id === Number(firstValue));
  const Posts = Data[index]?.Blogs || [];
  const PostIndex = Posts.findIndex((el) => el.publishedAt === secondValue);
  const ThePost = Posts[PostIndex];

  const baseClasses = `max-w-[620px] w-full min-h-[calc(100vh-72px)] px-[24px] py-[32px] border-l border-r shadow-sm`;
  const lightMode = `border-[#e6e3e1] bg-[#fdfcfa] text-[#1a1a1a]`;
  const darkMode = `border-[#34302d] bg-[#1c1a19] text-white`;

  return (
    <>
      {!secondValue && (
        <div className={`${baseClasses} ${NightMode ? darkMode : lightMode}`}>
          <button
            onClick={() => router.back()}
            className="text-[14px] cursor-pointer text-blue-600 hover:underline mb-[20px] w-max"
          >
            ← Back
          </button>
          <h1 className="text-[28px] font-bold mb-[24px]">
            {Data[index]?.author}'s Posts
          </h1>

          <div className="flex flex-col gap-[16px]">
            {Posts.map((el, key) => (
              <Link
                href={`/posts/${userId}/${el.publishedAt}`}
                key={key}
                className={`p-[20px] rounded-[12px] border hover:shadow transition ${
                  NightMode
                    ? "border-[#3b3734] bg-[#252321] hover:bg-[#2e2b29]"
                    : "border-[#dfdcda] bg-[#fff] hover:bg-[#f5f4f3]"
                }`}
              >
                <div className="flex flex-col gap-[6px]">
                  <h2 className="text-[18px] font-medium">{el.title}</h2>
                  <p className="text-[14px] text-gray-500">
                    {el.description.slice(0, 80)}...
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {secondValue && ThePost && (
        <div
          className={`${baseClasses} ${
            NightMode ? darkMode : lightMode
          } pb-[40px]`}
        >
          <button
            onClick={() => router.back()}
            className="text-[14px] cursor-pointer text-blue-600 hover:underline mb-[20px] w-max"
          >
            ← Back
          </button>

          <div className="text-center mb-[24px]">
            <h1 className="text-[24px] font-bold mb-[8px]">{ThePost.title}</h1>
            <p className="text-[15px] text-gray-500">{ThePost.description}</p>
          </div>
          <div className="text-[16px] leading-[1.8] whitespace-pre-line">
            {ThePost.content}
          </div>
          <div className="w-full flex justify-end mt-[32px]">
            <p className="text-[13px] text-gray-400">
              Published on: {ThePost.publishedAt.slice(0, 10)}
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default Posts;
