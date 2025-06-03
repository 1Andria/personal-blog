"use client";
import {
  useCurrentId,
  useThemeMode,
  useUserId,
} from "@/app/Common/Store/Store";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getCookie } from "cookies-next";
import { userType } from "@/app/Common/Types/Types";

function HomeBody() {
  const NightMode = useThemeMode((state) => state.nightMode);
  const setUserId = useUserId((state) => state.setUserId);
  const currentId = useCurrentId((state) => state.currentId);
  const token = getCookie("accessToken");
  const [users, setUsers] = useState<userType[]>([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (token) {
      getUsers();
    }
  }, [token]);

  const getUsers = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/project/users`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await res.json();
    if (res.status === 200) {
      setUsers(data);
    }
  };

  useEffect(() => {
    if (currentId && users.length > 0) {
      const isCurrentFirst = users[0]?._id === currentId;
      if (!isCurrentFirst) {
        const sorted = [...users].sort((a, b) => {
          if (a._id === currentId) return -1;
          if (b._id === currentId) return 1;

          const dateA = new Date(a.createdAt).getTime();
          const dateB = new Date(b.createdAt).getTime();

          return dateB - dateA;
        });
        setUsers(sorted);
        setIsReady(true);
      } else {
        setIsReady(true);
      }
    }
  }, [currentId, users]);

  if (!isReady) {
    return (
      <div
        className={`max-w-[620px] w-full min-h-[calc(100vh-72px)] border-l border-r px-[20px] pt-[20px] pb-[40px] ${
          NightMode
            ? "border-[#34302d] bg-[#1c1a19] text-white"
            : "border-[#efedeb] bg-[#fbf9f7] text-black"
        } flex items-center justify-center text-sm text-gray-400`}
      >
        Loading authors...
      </div>
    );
  }

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
        {users.map((el) => (
          <Link
            href={`/posts/${el._id}`}
            key={el._id}
            onClick={() => setUserId(el._id)}
            className={`w-full flex items-center justify-between px-[16px] py-[14px] rounded-[12px] border transition hover:scale-[1.01] ${
              NightMode
                ? "border-[#2a2624] bg-[#252221] hover:bg-[#2e2a29]"
                : "border-[#e4e2e0] bg-[#ffffff] hover:bg-[#f4f2f1]"
            }`}
          >
            <div className="flex items-center gap-[12px]">
              <div className="w-[44px] h-[44px] rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold text-lg">
                {el.fullName[0]}
              </div>
              <div className="flex flex-col">
                <div className="flex gap-[5px] items-center">
                  <h2 className="text-[16px] font-medium">{el.fullName}</h2>
                  {currentId && el._id === currentId && (
                    <span className="text-gray-400 text-[12px]">(you)</span>
                  )}
                </div>
                <span className="text-[13px] text-gray-500">{el.email}</span>
              </div>
            </div>
            {el.blogs?.length > 0 ? (
              <h2 className="text-[14px] text-gray-400">
                {el.blogs.length} post{el.blogs.length !== 1 ? "s" : ""}
              </h2>
            ) : (
              <h2 className="text-[14px] text-gray-400">No posts yet</h2>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default HomeBody;
