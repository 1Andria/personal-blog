"use client";
import { useCurrentId, useThemeMode } from "@/app/Common/Store/Store";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import NavigationLinks from "../../__Atoms/NavigationLinks/NavigationLinks";
import Image from "next/image";
import Moon from "../../../Common/Images/Icon.png";
import Sun from "../../../Common/Images/sun.png";
import { deleteCookie, getCookie } from "cookies-next";

function NavBar() {
  const pathname = usePathname();
  const NightMode = useThemeMode((state) => state.nightMode);
  const setNightMode = useThemeMode((state) => state.setNightMode);
  const setCurrentId = useCurrentId((state) => state.setCurrentId);
  const [confirmLogout, setConfirmLogout] = useState(false);
  const token = getCookie("accessToken");
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/project/auth/current-user`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      if (res.status === 200) {
        setCurrentId(data._id);
      } else {
        deleteCookie(`accessToken`);
        router.push("/");
      }
    };

    if (pathname !== "/") {
      getUser();
    }
  }, [pathname]);

  function refreshPage() {
    window.location.reload();
  }

  function LogOut() {
    deleteCookie(`accessToken`);
    setConfirmLogout(false);
    router.push("/");
  }

  return (
    <>
      <div
        className={`${pathname === "/" ? "hidden" : "block"} ${
          !NightMode ? "bg-[#FEFEFE]" : "bg-[#201e1d]"
        } ${
          !NightMode ? "border-[#efedeb]" : "border-[#34302d]"
        } max-w-[640px] w-full h-[52px] rounded-[12px] shadow-lg border-[1px] p-[6px] flex justify-between items-center`}
      >
        <div className="flex items-center gap-[10px]">
          <div className="cursor-pointer" onClick={refreshPage}>
            <span className="text-3xl">📝</span>
          </div>

          <div className="relative">
            {!confirmLogout ? (
              <button
                onClick={() => setConfirmLogout(true)}
                className="px-3 py-[6px] text-[14px] font-medium border border-red-500 text-red-600 rounded-[8px] hover:bg-red-500 hover:text-white transition duration-200 cursor-pointer"
              >
                Log out
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <span className="text-[13px] text-gray-600 dark:text-gray-300 ">
                  Are you sure?
                </span>
                <button
                  onClick={LogOut}
                  className="bg-red-600 hover:bg-red-700 text-white text-[13px] px-3 py-1 rounded-[6px] transition cursor-pointer"
                >
                  Yes
                </button>
                <button
                  onClick={() => setConfirmLogout(false)}
                  className="border border-gray-400 text-[13px] text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:border-gray-600 px-3 py-1 rounded-[6px] transition cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-[10px]">
          <NavigationLinks />
          <button
            onClick={setNightMode}
            className={`w-[40px] h-[40px] rounded-[6px] cursor-pointer border-[1px] shadow-sm flex justify-center items-center ${
              NightMode
                ? "border-[#34302d] bg-[#1c1a19]"
                : "border-[#efedeb] bg-[#fbf9f7]"
            }`}
          >
            <Image
              src={!NightMode ? Moon : Sun}
              width={100}
              height={100}
              alt="moon"
              className="w-[17px] h-[17px]"
            />
          </button>
        </div>
      </div>
    </>
  );
}

export default NavBar;
