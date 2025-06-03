"use client";
import { useSignInModal, useLogInModal } from "@/app/Common/Store/Store";
import { Box, Modal } from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
  name: yup
    .string()
    .min(4, "Name is too short")
    .required("Name is required")
    .matches(/^[a-zA-Z]+$/, "Invalid name"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
      "Invalid password"
    )
    .required("Password is required"),
  repeatPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords do not match")
    .required("Repeat password is required"),
});

type FormData = yup.InferType<typeof schema>;

function SignIn() {
  const isSignIn = useSignInModal((state) => state.isSignIn);
  const setIsSignIn = useSignInModal((state) => state.setIsSignIn);
  const setIsLogIn = useLogInModal((state) => state.setIsLogIn);
  const [showPassword, setShowPassword] = useState(false);
  const [exist, setExist] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });
  function toLogIN() {
    setIsSignIn(false);
    setIsLogIn(true);
  }

  const onSubmit = async (data: FormData) => {
    const res = await fetch("http://localhost:4005/project/auth/sign-up", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
        fullName: data.name,
      }),
    });

    const responseData = await res.json();
    if (res.status === 201) {
      reset();
      setIsSignIn(false);
      setIsLogIn(true);
    } else if (res.status === 400) {
      setExist(true);
      reset();
    }
  };

  function onClose() {
    setExist(false);
    setIsSignIn(false);
    reset();
  }
  return (
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
          width: "100%",
          maxWidth: "420px",
          padding: "0px",
        }}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white rounded-[16px]  shadow-[0_8px_24px_rgba(0,0,0,0.1)] px-[32px] py-[40px] flex flex-col gap-[20px]"
        >
          <div className="text-center mb-[10px]">
            <h1 className="text-[20px] font-[700] text-[#111827]">
              Create Account
            </h1>
            <p className="text-[14px] text-[#6B7280] mt-[4px]">
              Join ThoughtSpace to start publishing your thoughts.
            </p>
          </div>

          <div className="flex flex-col gap-[6px]">
            <label htmlFor="name" className="text-[13px] text-[#374151]">
              Name
            </label>
            <input
              type="text"
              id="name"
              {...register("name")}
              placeholder="Your name"
              className="h-[40px] px-[12px] border border-[#D1D5DB] rounded-[6px] focus:outline-none focus:ring-[2px] focus:ring-blue-500"
            />
            {errors.name && (
              <span className="text-[12px] text-red-500">
                {errors.name.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-[6px]">
            <label htmlFor="email" className="text-[13px] text-[#374151]">
              Email
            </label>
            <input
              type="email"
              id="email"
              {...register("email")}
              placeholder="you@example.com"
              className="h-[40px] px-[12px] border border-[#D1D5DB] rounded-[6px] focus:outline-none focus:ring-[2px] focus:ring-blue-500"
            />
            {errors.email && (
              <span className="text-[12px] text-red-500">
                {errors.email.message}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-[6px]">
            <label htmlFor="password" className="text-[13px] text-[#374151]">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              {...register("password")}
              placeholder="••••••••"
              className="h-[40px] px-[12px] border border-[#D1D5DB] rounded-[6px] focus:outline-none focus:ring-[2px] focus:ring-blue-500"
            />

            {errors.password && (
              <span className="text-[12px] text-red-500">
                {errors.password.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-[6px]">
            <label
              htmlFor="repeatPassword"
              className="text-[13px] text-[#374151]"
            >
              Repeat Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="repeatPassword"
              {...register("repeatPassword")}
              placeholder="••••••••"
              className="h-[40px] px-[12px] border border-[#D1D5DB] rounded-[6px] focus:outline-none focus:ring-[2px] focus:ring-blue-500"
            />

            {errors.repeatPassword && (
              <span className="text-[12px] text-red-500">
                {errors.repeatPassword.message}
              </span>
            )}
          </div>
          <p
            className={`text-red-600 text-[12px] mt-[-18px] mb-[-15px] ${
              !exist ? "opacity-0" : "opacity-100"
            }`}
          >
            User already exists
          </p>
          <label className="flex items-center gap-[6px] text-[13px] text-[#6B7280] mt-[4px]">
            <input
              type="checkbox"
              checked={showPassword}
              onChange={() => setShowPassword((prev) => !prev)}
              className="accent-blue-600"
            />
            Show password
          </label>

          <button
            type="submit"
            className="h-[42px] cursor-pointer w-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-[6px] font-medium transition duration-200"
          >
            Sign Up
          </button>

          <p className="text-[13px] text-center text-[#6B7280] mt-[4px]">
            Already have an account?{" "}
            <span
              onClick={toLogIN}
              className="text-[#2563EB] font-medium cursor-pointer hover:underline"
            >
              Log in
            </span>
          </p>
        </form>
      </Box>
    </Modal>
  );
}

export default SignIn;
