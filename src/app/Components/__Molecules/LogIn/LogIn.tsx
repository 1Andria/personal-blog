"use client";
import { useLogInModal } from "@/app/Common/Store/Store";
import { Box, Modal } from "@mui/material";
import React from "react";

function LogIn() {
  const isLogIn = useLogInModal((state) => state.isLogIn);
  const setIsLogIn = useLogInModal((state) => state.setIsLogIn);

  function onClose() {
    setIsLogIn(false);
  }
  return (
    <>
      <Modal
        open={isLogIn}
        onClose={onClose}
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
          }}
        >
          <form className="w-[300px] h-[270px] rounded-[12px] bg-white flex flex-col p-[32px] justify-between">
            <h1>Log In</h1>
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                className="h-[30px] w-full border"
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="email"
                className="h-[30px] w-full border"
              />
            </div>
            <button className="w-full h-[30px] border">Log In</button>
          </form>
        </Box>
      </Modal>
    </>
  );
}

export default LogIn;
