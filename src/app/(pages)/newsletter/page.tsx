"use client";
import { useThemeMode } from "@/app/Common/Store/Store";
import React from "react";
function Newsletter() {
  const NightMode = useThemeMode((state) => state.nightMode);
  const inputStyle = `${
    !NightMode
      ? "bg-white text-black placeholder-gray-600"
      : "bg-black text-white placeholder-gray-400"
  } h-[40px] w-full pl-[12px] rounded-[12px] border border-gray-300`;

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
      <form
        className="flex flex-col gap-[14px]"
        onSubmit={(e) => {
          e.preventDefault();
          alert("🎉 Blog published successfully!");
        }}
      >
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
            placeholder="e.g. Paulina"
            className={inputStyle}
            required
          />
        </div>
        <div className="flex flex-col gap-[10px]">
          <label
            className={`text-sm ${
              NightMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Category
          </label>
          <input
            type="text"
            placeholder="e.g. Tech, Travel..."
            className={inputStyle}
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
            className={`${inputStyle} h-[200px] resize-none`}
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
    </div>
  );
}

export default Newsletter;
