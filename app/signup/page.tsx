"use client";

import Link from "next/link";
import { useState } from "react";
import { handleSignup } from "../lib/actions";

import { FcGoogle } from "react-icons/fc";
import { validatePassword } from "../lib/utils";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [errorMessage, setErrorMessage] = useState<string | undefined>("");

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    if (!newPassword) {
      setErrorMessage("");
      return;
    }
    if (!validatePassword(newPassword)) {
      setErrorMessage(
        "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character."
      );
    } else {
      setErrorMessage(""); // Clear the error if the password is valid
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (errorMessage) {
      return;
    }
    if (password.length)
      try {
        await handleSignup(email, role, password);
        router.push("/login");
      } catch (error) {
        if (error instanceof Error) setErrorMessage(error.message);
      }
  };
  return (
    <div className="flex min-h-screen items-center justify-center bg-[url('./assests/back.jpg')] bg-cover text-white">
      <div className="flex flex-col w-full max-w-lg p-10 md:p-12 lg:p-10 rounded-lg shadow-lg bg-[#1b1c30]">
        <h2 className="text-3xl md:text-4xl font-bold text-center">Sign Up</h2>
        <form onSubmit={handleSubmit} className="my-2">
          <div>
            <label htmlFor="email" className="text-base md:text-lg font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              required
              className="mt-1 w-full px-5 py-2 text-black text-md md:text-lg rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
            />
          </div>
          <div className="flex justify-between mt-2">
            <div className="mx-2 inline">
              {" "}
              <input
                value="student"
                name="role"
                checked={role === "student"}
                onChange={(e) => setRole(e.target.value)}
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
                checked={role === "professor"}
                onChange={(e) => setRole(e.target.value)}
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
                onChange={(e) => setRole(e.target.value)}
                checked={role === "rewarder"}
                type="radio"
                required
                className=""
              />{" "}
              <label htmlFor="rewarder">Rewarder</label>
            </div>
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
              name="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="create a password"
              type="password"
              required
              className="mt-1 w-full px-5 py-2 text-black text-md md:text-lg rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B82F6] m"
            />
          </div>
          <p className="mt-3 text-md italic text-red-500">{errorMessage}</p>
          <button
            type="submit"
            className="w-full px-5 py-2 mt-3 text-lg md:text-xl font-semibold rounded-lg bg-purple-600 hover:bg-purple-900"
          >
            Signup
          </button>
        </form>
        <div className="text-2xl w-full text-center mb-2">or</div>
        <Link
          href="/api/login/google"
          className="flex bg-white text-black text-2xl rounded-lg py-2 px-5 items-center justify-center"
        >
          Signup with <FcGoogle className="ml-2" />
        </Link>
        <p className="text-center text-base md:text-lg mt-3">
          Already have an account?{" "}
          <Link href="/login" className="text-[#D946EF] hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
