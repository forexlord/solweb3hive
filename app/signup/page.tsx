"use client"; // Enable client-side rendering

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation"; // Import useRouter from next/navigation
import Swal from "sweetalert2";
import { useFormik } from "formik";
import { useUserStore } from "@/store/user";
import * as Yup from "yup";

const SignUp = () => {
  const router = useRouter(); // Initialize router

  const setUser = useUserStore((state) => state.setUser);
  const user = useUserStore((state) => state.user);

  const registerSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email address is required"),
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    password: Yup.string().required("Password is required"),
    confirmPassword: Yup.string().required("Password is required"),
    // phoneNumber: Yup.string().required("Phone Number is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      confirmPassword: "",
      phoneNumber: "",
      country: "Nigeria",
    },
    validationSchema: registerSchema,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      console.log(values);
      if (values.password !== values.confirmPassword) {
        Swal.fire({
          title: "Error!",
          text: "Passwords do not match",
          icon: "error",
          confirmButtonText: "Ok",
        });
        setSubmitting(false);
        return;
      }

      fetch("/api/register", {
        method: "POST",
        body: JSON.stringify(values),
      })
        .then(async (res) => {
          const data = await res.json();
          if (res.ok) {
            Swal.fire({
              title: "Success!",
              text: `Registration Successful!`,
              icon: "success",
              confirmButtonText: "Ok",
            });
            console.log("data.user", data?.user);
            setUser(data?.user);
            router.push("/dashboard");
            resetForm();
          } else {
            Swal.fire({
              title: "Error!",
              text: data?.error || "Registration failed, please try again",
              icon: "error",
              confirmButtonText: "Ok",
            });
          }
        })
        .finally(() => {
          setSubmitting(false);
        });
      return;
    },
  });
  console.log("User>>", user);
  if (user) {
    router.push("/dashboard");
  }

  return (
    <div className="bg-[#202227] pt-20 h-screen w-full text-[20px] text-white flex flex-col items-center justify-center">
      <div className="w-full max-w-[600px] px-4">
        <p className="text-center pb-3 text-[24px] text-[#E1FF01]">
          Sign Up for an Account
        </p>
        <p className="pb-5 text-center">
          Let&apos;s get you all set up so you can experience Sol3Hive
        </p>

        <form action="" className="flex flex-col gap-5">
          {/* First Name and Last Name */}
          <div className="flex flex-col md:flex-row gap-5 w-full justify-between">
            <div className="flex flex-col gap-3">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                placeholder="First Name"
                id="firstName"
                className="bg-transparent border-[0.5px] w-full py-3 px-5 rounded-[8px] text-white"
                name="firstName"
                defaultValue={formik.values.firstName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={formik.isSubmitting}
              />
              {formik.touched.firstName && formik.errors.firstName ? (
                <p className="text-red-500 text-sm">
                  {formik.errors.firstName}
                </p>
              ) : null}
            </div>
            <div className="flex flex-col gap-3">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                placeholder="Last Name"
                id="lastName"
                className="border-[0.5px] w-full py-3 px-5 rounded-[8px] text-white"
                name="lastName"
                defaultValue={formik.values.lastName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={formik.isSubmitting}
              />
              {formik.touched.lastName && formik.errors.lastName ? (
                <p className="text-red-500 text-sm">{formik.errors.lastName}</p>
              ) : null}
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

          {/* Password and Confirm Password */}
          <div className="flex flex-col md:flex-row gap-5 w-full justify-between">
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
            <div className="flex flex-col gap-3">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm Password"
                id="confirmPassword"
                className="bg-transparent border-[0.5px] w-full py-3 px-5 rounded-[8px] text-white"
                name="confirmPassword"
                defaultValue={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={formik.isSubmitting}
              />
              {formik.touched.confirmPassword &&
              formik.errors.confirmPassword ? (
                <p className="text-red-500 text-sm">
                  {formik.errors.confirmPassword}
                </p>
              ) : null}
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
              type="submit"
              className="bg-[#DCF331] text-black w-full p-3 rounded-[8px]"
              onClick={() => formik.handleSubmit()}
              disabled={formik.isSubmitting}
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
