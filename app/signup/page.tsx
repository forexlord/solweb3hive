"use client"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import Swal from "sweetalert2"
import { useFormik } from "formik"
import { useUserStore } from "@/store/user"
import * as Yup from "yup"
import { Eye, EyeOff, Check } from "lucide-react"

const SignUp = () => {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const setUser = useUserStore((state) => state.setUser)
  const user = useUserStore((state) => state.user)

  // Password validation schema with specific requirements
  const passwordSchema = Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[0-9]/, "Password requires at least one number")
    .matches(/[A-Z]/, "Password requires at least one uppercase letter")
    .matches(/[a-z]/, "Password requires at least one lowercase letter")
    .matches(/[^A-Za-z0-9]/, "Password requires at least one special character")
    .required("Password is required")

  const registerSchema = Yup.object().shape({
    fullName: Yup.string().required("Full name is required"),
    email: Yup.string().email("Invalid email address").required("Email address is required"),
    password: passwordSchema,
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], "Passwords must match")
      .required("Confirm password is required"),
  })

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: registerSchema,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      // Extract first and last name from full name
      const nameParts = values.fullName.trim().split(" ")
      const firstName = nameParts[0] || ""
      const lastName = nameParts.slice(1).join(" ") || ""

      const userData = {
        email: values.email,
        firstName,
        lastName,
        password: values.password,
        confirmPassword: values.password, // Using the same password
        phoneNumber: "",
        country: "Nigeria",
      }

      fetch("/api/register", {
        method: "POST",
        body: JSON.stringify(userData),
      })
        .then(async (res) => {
          const data = await res.json()
          if (res.ok) {
            Swal.fire({
              title: "Success!",
              text: `Registration Successful!`,
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
              text: data?.error || "Registration failed, please try again",
              icon: "error",
              confirmButtonText: "Ok",
            })
          }
        })
        .finally(() => {
          setSubmitting(false)
        })
    },
  })

  // Check password strength
  const hasMinLength = formik.values.password.length >= 8
  const hasNumber = /[0-9]/.test(formik.values.password)
  const hasUpperCase = /[A-Z]/.test(formik.values.password)
  const hasLowerCase = /[a-z]/.test(formik.values.password)
  const hasSpecialChar = /[^A-Za-z0-9]/.test(formik.values.password)

  if (user) {
    router.push("/dashboard")
  }

  return (
    <div className="bg-[#0F0F10] min-h-screen w-full flex flex-col items-center justify-center py-10">
      <div className="w-full max-w-[450px] px-4">
        <h1 className="text-white text-4xl font-bold text-center mb-2">Sign Up</h1>
        <p className="text-center text-[#DCF331] mb-8">Join our community today!</p>

        {/* Google Sign Up Button */}
        <button
          type="button"
          className="flex items-center justify-center gap-2 bg-transparent border border-[#2A2B2F] text-white w-full py-3 rounded-md font-medium mb-6"
        >
          <Image src="/assets/googleIcon.png" alt="Google" width={20} height={20} />
          Login with Google
        </button>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-grow h-px bg-[#2A2B2F]"></div>
          <span className="px-4 text-sm text-[#DCF331]">Or Continue with</span>
          <div className="flex-grow h-px bg-[#2A2B2F]"></div>
        </div>

        <form className="flex flex-col gap-5">
          {/* Full Name Field */}
          <div className="flex flex-col gap-2">
            <label htmlFor="fullName" className="text-white text-sm">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Enter your Name"
              id="fullName"
              className="bg-[#1A1B1E] border border-[#2A2B2F] w-full py-4 px-5 rounded-md text-white box-border"
              name="fullName"
              value={formik.values.fullName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={formik.isSubmitting}
            />
            {formik.touched.fullName && formik.errors.fullName ? (
              <p className="text-red-500 text-sm">{formik.errors.fullName}</p>
            ) : null}
          </div>

          {/* Email Field */}
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-white text-sm">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your Email"
              id="email"
              className="bg-[#1A1B1E] border border-[#2A2B2F] w-full py-4 px-5 rounded-md text-white box-border"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={formik.isSubmitting}
            />
            {formik.touched.email && formik.errors.email ? (
              <p className="text-red-500 text-sm">{formik.errors.email}</p>
            ) : null}
          </div>

          {/* Password Field */}
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-white text-sm">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your Password"
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
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {formik.touched.password && formik.errors.password ? (
              <p className="text-red-500 text-sm">{formik.errors.password}</p>
            ) : null}
          </div>

          {/* Confirm Password Field */}
          <div className="flex flex-col gap-2">
            <label htmlFor="confirmPassword" className="text-white text-sm">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your Password"
                id="confirmPassword"
                className="bg-[#1A1B1E] border border-[#2A2B2F] w-full py-4 px-5 rounded-md text-white box-border"
                name="confirmPassword"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={formik.isSubmitting}
              />
              <button
                type="button"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
              <p className="text-red-500 text-sm">{formik.errors.confirmPassword}</p>
            ) : null}
          </div>

          {/* Password Requirements */}
          <div className="grid grid-cols-2 gap-3 mt-2">
            <div className="flex items-center gap-2">
              <div
                className={`rounded-full p-1 ${hasMinLength ? "bg-[#DCF331] text-black" : "bg-[#2A2B2F] text-gray-400"}`}
              >
                <Check size={14} />
              </div>
              <span className="text-sm text-gray-300">Min 8 Characters</span>
            </div>
            <div className="flex items-center gap-2">
              <div
                className={`rounded-full p-1 ${hasNumber ? "bg-[#DCF331] text-black" : "bg-[#2A2B2F] text-gray-400"}`}
              >
                <Check size={14} />
              </div>
              <span className="text-sm text-gray-300">One Numeric Character</span>
            </div>
            <div className="flex items-center gap-2">
              <div
                className={`rounded-full p-1 ${hasUpperCase ? "bg-[#DCF331] text-black" : "bg-[#2A2B2F] text-gray-400"}`}
              >
                <Check size={14} />
              </div>
              <span className="text-sm text-gray-300">One Upper Case Character</span>
            </div>
            <div className="flex items-center gap-2">
              <div
                className={`rounded-full p-1 ${hasSpecialChar ? "bg-[#DCF331] text-black" : "bg-[#2A2B2F] text-gray-400"}`}
              >
                <Check size={14} />
              </div>
              <span className="text-sm text-gray-300">One Special Character</span>
            </div>
            <div className="flex items-center gap-2">
              <div
                className={`rounded-full p-1 ${hasLowerCase ? "bg-[#DCF331] text-black" : "bg-[#2A2B2F] text-gray-400"}`}
              >
                <Check size={14} />
              </div>
              <span className="text-sm text-gray-300">One Lower Case Character</span>
            </div>
          </div>

          {/* Sign Up Button */}
          <button
            type="submit"
            className="bg-[#DCF331] text-black w-full py-4 rounded-md font-medium mt-4"
            onClick={(e) => {
              e.preventDefault()
              formik.handleSubmit()
            }}
            disabled={formik.isSubmitting}
          >
            Sign Up
          </button>

          {/* Already have an account */}
          <div className="flex justify-center items-center gap-2 mt-4">
            <p className="text-white text-sm">Already have an account?</p>
            <button
              type="button"
              className="text-[#DCF331] font-medium flex items-center text-sm"
              onClick={() => router.push("/login")}
            >
              Login <span className="ml-1">↗</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignUp

