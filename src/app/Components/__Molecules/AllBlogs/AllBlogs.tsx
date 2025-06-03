"use client";
import { useThemeMode } from "@/app/Common/Store/Store";
import { getCookie } from "cookies-next";
import React, { useEffect, useState } from "react";

type Blog = {
  _id: string;
  title: string;
  content: string;
  description: string;
  author: {
    _id: string;
    fullName: string;
    email: string;
  };
  createdAt: string;
};

function AllBlogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [expandedPosts, setExpandedPosts] = useState<string[]>([]);
  const NightMode = useThemeMode((state) => state.nightMode);
  const token = getCookie("accessToken");

  useEffect(() => {
    const getPosts = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/project/blogs`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.ok) {
        const data: Blog[] = await res.json();
        const sorted = data.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setBlogs(sorted);
      } else {
        console.error("Failed fetch");
      }
    };

    if (token) {
      getPosts();
    }
  }, []);

  function togglePost(id: string) {
    setExpandedPosts((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  }

  return (
    <div
      className={`max-w-[620px] w-full min-h-[calc(100vh-72px)] border-l border-r mx-auto px-[20px] pt-[20px] pb-[40px] ${
        NightMode
          ? "border-[#34302d] bg-[#1c1a19] text-white"
          : "border-[#efedeb] bg-[#fbf9f7] text-black"
      } shadow-sm`}
    >
      <h1 className="text-2xl font-bold mb-[24px]">All Blog Posts</h1>

      {blogs.map((post) => (
        <div
          onClick={() => togglePost(post._id)}
          key={post._id}
          className={`mb-[24px] p-[16px] rounded-xl transition-all cursor-pointer ${
            NightMode
              ? "bg-[#2b2826] hover:bg-[#353230]"
              : "bg-white hover:bg-[#f4f2f0]"
          }`}
        >
          <h2 className="text-xl font-semibold">{post.title}</h2>
          <p className="text-sm text-gray-500 mt-[4px] mb-[12px]">
            by {post.author.fullName} •{" "}
            {new Date(post.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </p>
          {post.content.length > 300 ? (
            expandedPosts.includes(post._id) ? (
              <p
                className={`${
                  NightMode ? "text-white" : "text-gray-700"
                } break-words`}
              >
                {post.content}
                <span
                  className="underline cursor-pointer text-gray-400 ml-[8px] hover:text-blue-500"
                  onClick={(e) => {
                    e.stopPropagation();
                    togglePost(post._id);
                  }}
                >
                  See less
                </span>
              </p>
            ) : (
              <p
                className={`${
                  NightMode ? "text-white" : "text-gray-700"
                } break-words`}
              >
                {post.content.slice(0, 300)}...
                <span
                  className="underline cursor-pointer text-gray-400 ml-[8px] hover:text-blue-500"
                  onClick={(e) => {
                    e.stopPropagation();
                    togglePost(post._id);
                  }}
                >
                  See more
                </span>
              </p>
            )
          ) : (
            <p
              className={`${
                NightMode ? "text-white" : "text-gray-700"
              } break-words`}
            >
              {post.content}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

export default AllBlogs;
