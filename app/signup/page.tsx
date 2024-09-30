'use client'; 

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation"; 

const SignUp = () => {
  const router = useRouter(); 

  return (
    <div className="bg-[#202227] py-20 h-fit w-full text-[20px] text-white flex flex-col items-center justify-center">
      <div className="w-full max-w-[600px] px-4">
        <p className="text-center pb-3 text-[24px] text-[#E1FF01]">
          Sign Up for an Account
        </p>
        <p className="pb-5 text-center">
          Let's get you all set up so you can experience Sol3Hive
        </p>

        <form action="" className="flex flex-col gap-5">
          
          <div className="flex flex-col md:flex-row gap-5">
            <div className="flex flex-col gap-3 w-full">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                placeholder="First Name"
                id="firstName"
                className="bg-transparent border-[0.5px] w-full py-3 px-5 rounded-[8px] text-white"
              />
            </div>
            <div className="flex flex-col gap-3 w-full">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                placeholder="Last Name"
                id="lastName"
                className=" border-[0.5px] w-full py-3 px-5 rounded-[8px] text-white"
              />
            </div>
          </div>

          {/* Email */}
          <div className="flex flex-col gap-3">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="example@example.com"
              id="email"
              className="bg-transparent border-[0.5px] w-full py-3 px-5 rounded-[8px] text-white"
            />
          </div>

          {/* Password and Confirm Password */}
          <div className="flex flex-col md:flex-row gap-5">
            <div className="flex flex-col gap-3 w-full">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                placeholder="Password"
                id="password"
                className="bg-transparent border-[0.5px] w-full py-3 px-5 rounded-[8px] text-white"
              />
            </div>
            <div className="flex flex-col gap-3 w-full">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm Password"
                id="confirmPassword"
                className="bg-transparent border-[0.5px] w-full py-3 px-5 rounded-[8px] text-white"
              />
            </div>
          </div>

          {/* Forgot Password */}
          <div className="flex justify-end py-5">
            <p className="underline underline-offset-2 text-[#F4F5F7]">
              <a href="">Forgot Password</a>
            </p>
          </div>

          {/* Sign Up Button */}
          <div>
            <button
              type="button"
              className="bg-[#DCF331] text-black w-full p-3 rounded-[8px]"
            >
              Sign Up
            </button>
          </div>

          {/* Social Login Icons */}
          <div className="flex gap-3 items-center justify-center pt-5">
            <Image src="/assets/Frame 106.svg" alt="" width={50} height={50} />
            <Image src="/assets/Frame 107.svg" alt="" width={50} height={50} />
            <Image src="/assets/Frame 108.svg" alt="" width={50} height={50} />
          </div>

          {/* Already have an account */}
          <div className="flex justify-end pt-5 pb-10">
            <p
              className="underline underline-offset-2 text-[#F4F5F7] cursor-pointer"
              onClick={() => router.push("/login")} // Use router.push to navigate to login
            >
              Already have an account? Login
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
