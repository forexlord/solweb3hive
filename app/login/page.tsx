"use client"
import { useFormik } from "formik"
import * as Yup from "yup"
import { useRouter } from "next/navigation"
import {  Facebook, Apple, Eye, EyeOff } from "lucide-react"
import { useState } from "react"
import { useUserStore } from "@/store/user"
import Swal from "sweetalert2"
import Image from "next/image"

const Login = () => {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  
  // Extract user store logic from old UI
  const setUser = useUserStore((state) => state.setUser)
  const user = useUserStore((state) => state.user)

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string().required("Password is required"),
  })

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      fetch("/api/login", {
        method: "POST",
        body: JSON.stringify(values),
      })
        .then(async (res) => {
          const data = await res.json()
          if (res.ok) {
            Swal.fire({
              title: "Success!",
              text: "Login Successful",
              icon: "success",
              confirmButtonText: "Ok",
            })
            console.log("data.user", data?.user)
            setUser(data?.user)
            router.push("/dashboard")
            resetForm()
          } else {
            Swal.fire({
              title: "Error!",
              text: data?.error || "Login failed, please try again",
              icon: "error",
              confirmButtonText: "Ok",
            })
          }
        })
        .catch((error) => {
          console.error("Error:", error)
          Swal.fire({
            title: "Error!",
            text: error || "Login failed, please try again",
            icon: "error",
            confirmButtonText: "Ok",
          })
        })
        .finally(() => setSubmitting(false))
      return
    },
  })

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  // Redirect if user is already logged in
  if (user) {
    router.push("/dashboard")
  }

  // Replace the entire return statement with this updated UI
  return (
    <div className="bg-[#0F0F10] min-h-screen w-full flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-[450px]">
        <h1 className="text-white text-4xl font-bold text-center mb-2">Login</h1>
        <p className="text-center text-[#DCF331] mb-8">Welcome back! Please log in to access your account.</p>

        <form className="flex flex-col gap-5 w-full">
          {/* Email Field */}
          <div className="flex flex-col gap-2 w-full">
            <div className="w-full">
              <input
                type="email"
                placeholder="Email"
                id="email"
                className="bg-[#1A1B1E] border border-[#2A2B2F] w-full py-4 px-5 rounded-md text-white box-border"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={formik.isSubmitting}
              />
            </div>
            {formik.touched.email && formik.errors.email ? (
              <p className="text-red-500 text-sm">{formik.errors.email}</p>
            ) : null}
          </div>

          {/* Password Field */}
          <div className="flex flex-col gap-2 w-full">
            <div className="relative w-full">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                id="password"
                className="bg-[#1A1B1E] border border-[#2A2B2F] w-full py-4 px-5 rounded-md text-white box-border"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={formik.isSubmitting}
              />
              <button
                type="button"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {formik.touched.password && formik.errors.password ? (
              <p className="text-red-500 text-sm">{formik.errors.password}</p>
            ) : null}
          </div>

          {/* Remember Me */}
          <div className="flex items-center gap-2">
            <input type="checkbox" id="remember" className="w-4 h-4 accent-[#DCF331]" />
            <label htmlFor="remember" className="text-white text-sm">
              Remember Me
            </label>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            className="bg-[#DCF331] text-black w-full py-4 rounded-md font-medium mt-2"
            onClick={(e) => {
              e.preventDefault()
              formik.handleSubmit()
            }}
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? "Logging in..." : "Login"}
          </button>

          {/* Divider */}
          <div className="flex items-center my-2">
            <div className="flex-grow h-px bg-[#2A2B2F]"></div>
          </div>

          {/* Social Login Buttons */}
          <button
            type="button"
            className="flex items-center justify-center gap-2 bg-white text-black w-full py-3 rounded-md font-medium"
          >
               <Image src="/assets/googleIcon.png" alt="Google" width={20} height={20} />
            Login with Google
          </button>

          <button
            type="button"
            className="flex items-center justify-center gap-2 bg-white text-black w-full py-3 rounded-md font-medium"
          >
            <Facebook size={20} />
            Login with Facebook
          </button>

          <button
            type="button"
            className="flex items-center justify-center gap-2 bg-white text-black w-full py-3 rounded-md font-medium"
          >
            <Apple size={20} />
            Login with Apple
          </button>

          {/* Forgot Password */}
          <div className="text-center mt-4">
            <a href="#" className="text-white hover:text-[#DCF331]">
              Forgot Password?
            </a>
          </div>

          {/* Create Account Link */}
          <div className="flex justify-center items-center gap-2 mt-2">
            <p className="text-white">Don&apos;t have an account?</p>
            <button
              type="button"
              className="text-[#DCF331] font-medium flex items-center"
              onClick={() => router.push("/signup")}
            >
              Sign Up
              <span className="ml-1">↗</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login

