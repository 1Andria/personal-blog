"use client";
import { useThemeMode } from "@/app/Common/Store/Store";
import React, { useEffect, useState } from "react";

type Blog = {
  title: string;
  slug: string;
  publishedAt: string;
  description: string;
  content: string;
  author: string;
};

type RawData = {
  author: string;
  Blogs: Omit<Blog, "author">[];
}[];
function AllBlogs({ data }: { data: RawData }) {
  const [sortedPosts, setSortedPosts] = useState<Blog[]>([]);
  const NightMode = useThemeMode((state) => state.nightMode);
  const [expandedPosts, setExpandedPosts] = useState<string[]>([]);

  useEffect(() => {
    const combined: Blog[] = data.flatMap((entry) =>
      entry.Blogs.map((blog) => ({
        ...blog,
        author: entry.author,
      }))
    );

    combined.sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );

    setSortedPosts(combined);
  }, [data]);

  function togglePost(id: string) {
    setExpandedPosts((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  }

  return (
    <>
      <div
        className={`max-w-[620px] w-full min-h-[calc(100vh-72px)] border-l border-r px-[20px] pt-[20px] pb-[40px] ${
          NightMode
            ? "border-[#34302d] bg-[#1c1a19] text-white"
            : "border-[#efedeb] bg-[#fbf9f7] text-black"
        } shadow-sm`}
      >
        <h1 className="text-2xl font-bold mb-[24px]">All Blog Posts</h1>
        {sortedPosts.map((post) => (
          <div
            onClick={() => togglePost(post.slug)}
            key={post.slug}
            className={`mb-[24px] p-[16px] rounded-xl transition-all ${
              NightMode
                ? "bg-[#2b2826] hover:bg-[#353230]"
                : "bg-white hover:bg-[#f4f2f0]"
            }`}
          >
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p className="text-sm text-gray-500 mt-[4px] mb-[12px]">
              by {post.author} •{" "}
              {new Date(post.publishedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </p>
            {expandedPosts.includes(post.slug) ? (
              <p className={`${NightMode ? "text-white" : "text-gray-700"}`}>
                {post.content}
                <span className="underline cursor-pointer text-gray-400 ml-[8px] hover:text-blue-500">
                  See less
                </span>
              </p>
            ) : (
              <p className={`${NightMode ? "text-white" : "text-gray-700"}`}>
                {post.content.slice(0, 300)}...
                <span className="underline cursor-pointer text-gray-400 ml-[8px] hover:text-blue-500">
                  See more
                </span>
              </p>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default AllBlogs;
