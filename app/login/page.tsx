"use client";
import Link from "next/link";

import { handleLogin } from "../../lib/actions";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState<string | null>("");
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await handleLogin(email, password);
      console.log("logged in")
      router.push("/");
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      }
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[url('./assests/back.jpg')] bg-cover text-white">
      <div className="flex flex-col w-full max-w-lg p-10 md:p-12 lg:p-10  rounded-lg shadow-lg bg-[#1b1c30]">
        <h2 className="text-3xl md:text-4xl font-bold text-center">Login</h2>
        <form onSubmit={handleSubmit} className="my-2">
          <div>
            <label htmlFor="email" className="text-base md:text-lg font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={email}
              placeholder="enter your email"
              required
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full px-5 py-2 text-black text-md md:text-lg rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
            />
          </div>
          <div className="mt-2">
            <label
              htmlFor="password"
              className="text-base md:text-lg font-medium"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="enter your password"
              required
              className="mt-1 w-full px-5 py-2 text-black text-md md:text-lg rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
            />
          </div>
          <p className="mt-3 text-md italic text-red-500">{errorMessage}</p>
          <button
            type="submit"
            className="w-full px-5 py-2 mt-3 text-lg md:text-xl font-semibold rounded-lg bg-purple-600 hover:bg-purple-900"
          >
            Login
          </button>
        </form>
        <div className="text-2xl w-full text-center mb-2">or</div>
        <a
          href="/api/login/google"
          className="flex bg-white text-black text-2xl rounded-lg py-2 px-5 items-center justify-center"
        >
          Login with <FcGoogle className="ml-2" />
        </a>
        <p className="text-center text-base md:text-lg mt-3">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-[#D946EF] hover:underline">
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
}
