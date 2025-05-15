import { useSignInModal } from "@/app/Common/Store/Store";
import { Box, Modal } from "@mui/material";
import React from "react";

function SignIn() {
  const isSignIn = useSignInModal((state) => state.isSignIn);
  const setIsSignIn = useSignInModal((state) => state.setIsSignIn);
  function onClose() {
    setIsSignIn(false);
  }

  return (
    <>
      <Modal
        open={isSignIn}
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
          <form className="w-[300px] h-[320px] rounded-[12px] bg-white flex flex-col p-[32px] justify-between">
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
            <div>
              <label htmlFor="rep_password">Repeat Password</label>
              <input
                type="password"
                id="rep_password"
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

export default SignIn;
