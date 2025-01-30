"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/user";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { useChatStore } from "@/store/chat";

const Login = () => {
  const router = useRouter();

  const [initialized, setInitialized] = useState(false);

  const setUser = useUserStore((state) => state.setUser);
  const user = useUserStore((state) => state.user);
  const setAnonymousMessages = useChatStore(
    (state) => state.setAnonymousMessages
  );

  const registerSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email address is required"),
    password: Yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: registerSchema,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      fetch("/api/login", {
        method: "POST",
        body: JSON.stringify(values),
      })
        .then(async (res) => {
          const data = await res.json();
          if (res.ok) {
            setUser(data?.user);
            setAnonymousMessages([]);

            Swal.fire({
              title: "Success!",
              text: "Login Successful",
              icon: "success",
              confirmButtonText: "Ok",
            }).then(() => {
              router.push("/dashboard");
              resetForm();
            });
          } else {
            Swal.fire({
              title: "Error!",
              text: data?.error || "Login failed, please try again",
              icon: "error",
              confirmButtonText: "Ok",
            });
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          Swal.fire({
            title: "Error!",
            text: error || "Login failed, please try again",
            icon: "error",
            confirmButtonText: "Ok",
          });
        })
        .finally(() => setSubmitting(false));
      return;
    },
  });

  if (user && !initialized) {
    router.push("/dashboard");
  } else {
    setInitialized(true);
  }

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
              name="email"
              defaultValue={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={formik.isSubmitting}
            />
            {formik.touched.email && formik.errors.email ? (
              <p className="text-red-500 text-sm">{formik.errors.email}</p>
            ) : null}
          </div>

          {/* Password Field */}
          <div className="flex flex-col gap-3">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Password"
              id="password"
              className="bg-transparent border-[0.5px] w-full py-3 px-5 rounded-[8px] text-white"
              name="password"
              defaultValue={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={formik.isSubmitting}
            />
            {formik.touched.password && formik.errors.password ? (
              <p className="text-red-500 text-sm">{formik.errors.password}</p>
            ) : null}
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
              type="submit"
              className="bg-[#DCF331] text-black w-full p-3 rounded-[8px]"
              onClick={() => formik.handleSubmit()}
              disabled={formik.isSubmitting}
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
