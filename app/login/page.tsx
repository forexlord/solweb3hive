"use client"

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation"; 

const Login = () => {
  const router = useRouter(); 

  return (
    <div className="bg-[#202227] h-screen w-full text-[20px] text-white flex flex-col items-center justify-center">
      <div className="w-full max-w-[400px] px-4">
        <p className="text-center pb-5 text-[24px]">
          Please Enter Your Account Details
        </p>

        <form action="" className="flex flex-col gap-5">
          {/* Email Field */}
          <div className="flex flex-col gap-3">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="example@example.com"
              id="email"
              className="bg-transparent border-[0.5px] w-full py-3 px-5 rounded-[8px] text-white"
            />
          </div>

          {/* Password Field */}
          <div className="flex flex-col gap-3">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Password"
              id="password"
              className="bg-transparent border-[0.5px] w-full py-3 px-5 rounded-[8px] text-white"
            />
          </div>

          {/* Forgot Password */}
          <div className="flex justify-end py-5">
            <p className="underline underline-offset-2 text-[#F4F5F7]">
              <a href="">Forgot Password</a>
            </p>
          </div>

          {/* Sign In Button */}
          <div>
            <button
              type="button"
              className="bg-[#DCF331] text-black w-full p-3 rounded-[8px]"
            >
              Sign In
            </button>
          </div>

          {/* Social Login Icons */}
          <div className="flex gap-3 items-center justify-center pt-5">
            <Image src="/assets/Frame 106.svg" alt="" width={50} height={50} />
            <Image src="/assets/Frame 107.svg" alt="" width={50} height={50} />
            <Image src="/assets/Frame 108.svg" alt="" width={50} height={50} />
          </div>

          {/* Create Account Link */}
          <div className="flex justify-end pt-5">
            <p
              className="underline underline-offset-2 text-[#F4F5F7] cursor-pointer"
              onClick={() => router.push("/signup")} 
            >
              Create Account
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
