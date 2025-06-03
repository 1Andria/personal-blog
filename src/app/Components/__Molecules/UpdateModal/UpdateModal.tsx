"use client";
import { useThemeMode, useUpdateModal } from "@/app/Common/Store/Store";
import { Box, Modal } from "@mui/material";
import { getCookie } from "cookies-next";
import React, { useEffect, useState } from "react";

function UpdateModal({ onSuccess }: { onSuccess?: () => void }) {
  const NightMode = useThemeMode((state) => state.nightMode);
  const updateModal = useUpdateModal((state) => state.updateModal);
  const setUpdateModal = useUpdateModal((state) => state.setUpdateModal);
  const blogToUpdate = useUpdateModal((state) => state.blogToUpdate);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const token = getCookie("accessToken");

  const [content, setContent] = useState("");
  const inputStyle = `${
    !NightMode
      ? "bg-white text-black placeholder-gray-600"
      : "bg-black text-white placeholder-gray-400"
  } h-[40px] w-full pl-[12px] rounded-[12px] border border-gray-300`;

  useEffect(() => {
    if (blogToUpdate) {
      setTitle(blogToUpdate.title);
      setDescription(blogToUpdate.description);
      setContent(blogToUpdate.content);
    }
  }, [blogToUpdate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!blogToUpdate) return;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/project/blogs/${blogToUpdate._id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          content,
        }),
      }
    );

    if (res.ok) {
      setUpdateModal(false);
      onSuccess?.();
    }
  };
  return (
    <>
      <Modal
        open={updateModal}
        onClose={() => setUpdateModal(false)}
        slotProps={{
          backdrop: {
            sx: { backgroundColor: "rgba(36, 45, 52, 0.4)", opacity: "0.5" },
          },
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "90%",
            maxWidth: "400px",
          }}
        >
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-[14px] bg-white p-[25px] rounded-[16px]"
          >
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
                value={title}
                onChange={(e) => setTitle(e.target.value)}
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
                value={description}
                onChange={(e) => setDescription(e.target.value)}
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
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Start writing your blog here..."
                className={`${inputStyle} h-[200px] pt-[10px] resize-none`}
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
        </Box>
      </Modal>
    </>
  );
}

export default UpdateModal;
