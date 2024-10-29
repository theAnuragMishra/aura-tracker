"use client";

import Link from "next/link";

export default function SignUp() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[url('./assests/back.jpg')] bg-cover text-white">
      <div className="w-full max-w-lg p-10 md:p-12 lg:p-10 space-y-5 rounded-lg shadow-lg bg-[#1b1c30]">
        <h2 className="text-3xl md:text-4xl font-bold text-center">Sign Up</h2>
        <form className="space-y-3">
          <div>
            <label htmlFor="email" className="text-base md:text-lg font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              className="mt-1 w-full px-5 py-2 text-black text-md md:text-lg rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
            />
          </div>
          <div className="flex justify-between">
            <div className="mx-2 inline">
              {" "}
              <input name="role" type="radio" required className="" /> Student
            </div>
            <div className="mx-2 inline">
              {" "}
              <input name="role" type="radio" required className="" /> Professor
            </div>
            <div className="mx-2 inline">
              <input name="role" type="radio" required className="" /> Rewarder
            </div>
          </div>
          <div>
            <label
              htmlFor="password"
              className="text-base md:text-lg font-medium"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              className="mt-1 w-full px-5 py-2 text-black text-md md:text-lg rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B82F6] mb-4"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 mt-6 text-lg md:text-xl font-semibold rounded-lg bg-purple-600 hover:bg-purple-900"
          >
            Sign Up
          </button>
        </form>
        <p className="text-center text-base md:text-lg">
          Already have an account?{" "}
          <Link href="/login" className="text-[#D946EF] hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
