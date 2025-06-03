"use client";
import { useCurrentId, useThemeMode } from "@/app/Common/Store/Store";
import { deleteCookie, getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function Newsletter() {
  const NightMode = useThemeMode((state) => state.nightMode);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [currentUser, setCurrentUser] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(false);
  const currentId = useCurrentId((state) => state.currentId);

  const token = getCookie("accessToken");
  const router = useRouter();

  const inputStyle = `${
    !NightMode
      ? "bg-white text-black placeholder-gray-600"
      : "bg-black text-white placeholder-gray-400"
  } h-[40px] w-full pl-[12px] rounded-[12px] border border-gray-300`;

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await fetch("http://localhost:4005/project/blogs", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
        content,
      }),
    });

    const responseData = await res.json();
    if (res.status === 201) {
      setDescription("");
      setTitle("");
      setContent("");
    }
  };

  const getUser = async () => {
    const res = await fetch("http://localhost:4005/project/auth/current-user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    if (res.status === 200) {
      setCurrentUser(data.fullName);
    }
  };

  const DeleteUser = async () => {
    const res = await fetch(
      `http://localhost:4005/project/users/${currentId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (res.ok) {
      deleteCookie(`accessToken`);
      router.push("/");
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div
      className={`max-w-[620px] w-full min-h-[calc(100vh-72px)] border-l border-r px-[20px] pt-[5px] pb-[20px] ${
        NightMode
          ? "border-[#34302d] bg-[#1c1a19]"
          : "border-[#efedeb] bg-[#fbf9f7]"
      } shadow-sm flex flex-col gap-[14px]`}
    >
      <h1
        className={`text-[26px] font-semibold ${
          NightMode ? "text-white" : "text-black"
        }`}
      >
        Create your blog:
      </h1>
      <form className="flex flex-col gap-[14px]" onSubmit={onSubmit}>
        <div className="flex flex-col gap-[10px]">
          <label
            className={`text-sm ${
              NightMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Author name
          </label>
          <input
            type="text"
            readOnly
            placeholder="e.g. Paulina"
            className={inputStyle}
            value={currentUser}
            required
          />
        </div>

        <div className="flex flex-col gap-[10px]">
          <label
            className={`text-sm ${
              NightMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Blog title
          </label>
          <input
            type="text"
            placeholder="e.g. Why I Love travel"
            className={inputStyle}
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            required
          />
        </div>

        <div className="flex flex-col gap-[10px]">
          <label
            className={`text-sm ${
              NightMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Short description
          </label>
          <input
            type="text"
            placeholder="A quick summary of your post"
            className={inputStyle}
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            required
          />
        </div>

        <div className="flex flex-col gap-[10px]">
          <label
            className={`text-sm ${
              NightMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Blog content
          </label>
          <textarea
            placeholder="Start writing your blog here..."
            onChange={(e) => setContent(e.target.value)}
            className={`${inputStyle} h-[200px] pt-[10px] resize-none`}
            value={content}
            required
          />
        </div>
        <button
          type="submit"
          className={`mt-[20px] h-[45px] cursor-pointer rounded-[12px] text-white font-medium tracking-wide transition-all duration-300 bg-blue-600 hover:bg-blue-700`}
        >
          Publish
        </button>
      </form>
      <div className="flex justify-center mt-[5px]">
        {!confirmDelete ? (
          <button
            onClick={() => setConfirmDelete(true)}
            className="text-red-600 hover:text-red-700 border border-red-500 px-6 py-2 rounded-[10px] text-sm font-medium transition duration-200 cursor-pointer"
          >
            Delete Account
          </button>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <span className="text-red-500 text-sm font-medium">
              Are you sure you want to delete your account?
            </span>
            <div className="flex gap-4">
              <button
                onClick={DeleteUser}
                className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-[10px] text-sm transition duration-200 cursor-pointer"
              >
                Yes, delete
              </button>
              <button
                onClick={() => setConfirmDelete(false)}
                className="border border-gray-400 hover:border-gray-600 text-gray-600 hover:text-gray-800 px-5 py-2 rounded-[10px] text-sm transition duration-200 cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Newsletter;
