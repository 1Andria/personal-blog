"use client";
import React, { useEffect, useState } from "react";
import {
  useCurrentId,
  useThemeMode,
  useUpdateModal,
} from "@/app/Common/Store/Store";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { getCookie } from "cookies-next";
import UpdateModal from "../../__Molecules/UpdateModal/UpdateModal";
import { BlogType } from "@/app/Common/Types/Types";

function PostsBody() {
  const NightMode = useThemeMode((state) => state.nightMode);
  const path = useParams();
  const router = useRouter();
  const token = getCookie("accessToken");
  const [blogs, setBlogs] = useState<BlogType[]>([]);
  const idParam = (path as { id?: string[] }).id;
  const firstValue = Array.isArray(idParam) ? idParam[0] : null;
  const currentId = useCurrentId((state) => state.currentId);
  const setBlogToUpdate = useUpdateModal((state) => state.setBlogToUpdate);

  const setUpdateModal = useUpdateModal((state) => state.setUpdateModal);

  const secondValue =
    Array.isArray(idParam) && idParam[1]
      ? decodeURIComponent(idParam[1])
      : null;

  const getUsers = async () => {
    if (!firstValue) return;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/project/users/${firstValue}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await res.json();
    if (res.status === 200) {
      const sortedBlogs = (data.blogs || []).sort(
        (a: BlogType, b: BlogType) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      setBlogs(sortedBlogs);
    }
  };

  const deletePost = async (id: string) => {
    if (!id) return;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/project/blogs/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (res.status === 200) {
      getUsers();
    }
  };

  useEffect(() => {
    getUsers();
  }, [firstValue]);

  const ThePost = blogs.find((el) => el._id === secondValue);
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
          <h1 className="text-[28px] font-bold mb-[24px]">User&apos;s Posts</h1>

          <div className="flex flex-col gap-[16px]">
            {blogs.map((el: BlogType, key: number) => (
              <Link
                href={`/posts/${firstValue}/${el._id}`}
                key={key}
                className={`p-[20px] rounded-[12px] border relative hover:shadow transition ${
                  NightMode
                    ? "border-[#3b3734] bg-[#252321] hover:bg-[#2e2b29]"
                    : "border-[#dfdcda] bg-[#fff] hover:bg-[#f5f4f3]"
                }`}
              >
                {currentId && currentId === el.author && (
                  <div className="absolute bottom-[12px] right-[12px] flex gap-[8px]">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        deletePost(el._id);
                      }}
                      className=" text-[12px] text-red-500 hover:text-red-600 cursor-pointer hover:underline transition"
                    >
                      Delete
                    </button>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setBlogToUpdate(el);
                        setUpdateModal(true);
                      }}
                      className=" text-[12px]  text-blue-500 cursor-pointer hover:text-blue-600 hover:underline transition"
                    >
                      Update
                    </button>
                  </div>
                )}
                <div className="flex flex-col gap-[6px]">
                  <div className="flex justify-between">
                    <h2 className="text-[18px] font-medium">{el.title}</h2>
                    <p className="text-gray-400">
                      {el.createdAt?.slice(0, 10)}
                    </p>
                  </div>
                  <p className="text-[14px] text-gray-500">
                    {el.description?.slice(0, 80)}...
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
          <div className="text-[16px] leading-[1.8] whitespace-pre-line break-words">
            {ThePost.content}
          </div>
          <div className="w-full flex justify-end mt-[32px]">
            <p className="text-[13px] text-gray-400">
              Published on: {ThePost.createdAt?.slice(0, 10)}
            </p>
          </div>
        </div>
      )}
      <UpdateModal onSuccess={getUsers} />
    </>
  );
}

export default PostsBody;
