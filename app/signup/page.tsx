"use client";

import Link from "next/link";
import { useState } from "react";
import { handleSignup } from "../lib/actions";

export default function SignUp() {
  const [errorMessage, setErrorMessage] = useState<string | undefined>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const response = await handleSignup(formData);
    setErrorMessage(response);
  };
  return (
    <div className="flex min-h-screen items-center justify-center bg-[url('./assests/back.jpg')] bg-cover text-white">
      <div className="w-full max-w-lg p-10 md:p-12 lg:p-10 space-y-5 rounded-lg shadow-lg bg-[#1b1c30]">
        <h2 className="text-3xl md:text-4xl font-bold text-center">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label htmlFor="email" className="text-base md:text-lg font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              required
              className="mt-1 w-full px-5 py-2 text-black text-md md:text-lg rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
            />
          </div>
          <div className="flex justify-between">
            <div className="mx-2 inline">
              {" "}
              <input
                value="student"
                name="role"
                type="radio"
                required
                className=""
              />{" "}
              <label htmlFor="student">Student</label>
            </div>
            <div className="mx-2 inline">
              {" "}
              <input
                value="professor"
                name="role"
                type="radio"
                required
                className=""
              />{" "}
              <label htmlFor="professor">Professor</label>
            </div>
            <div className="mx-2 inline">
              <input
                value="rewarder"
                name="role"
                type="radio"
                required
                className=""
              />{" "}
              <label htmlFor="rewarder">Rewarder</label>
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
              name="password"
              type="password"
              required
              className="mt-1 w-full px-5 py-2 text-black text-md md:text-lg rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B82F6] m"
            />
          </div>
          <p className="text-md italic text-red-500">{errorMessage}</p>
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
