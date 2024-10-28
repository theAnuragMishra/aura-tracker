import React from "react";

const Login: React.FC = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-[#3B82F6] to-[#D946EF] text-white">
      <div className="w-full max-w-lg p-10 md:p-12 lg:p-10 space-y-10 rounded-lg shadow-lg bg-[#1b1c30]">
        <h2 className="text-3xl md:text-4xl font-bold text-center">Login</h2>
        <form className="space-y-8">
          <div>
            <label htmlFor="email" className="text-base md:text-lg font-medium">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              required
              className="mt-3 w-full px-5 py-3 text-black text-lg md:text-xl rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
            />
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
              className="mt-3 w-full px-5 py-3 text-black text-lg md:text-xl rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B82F6] mb-4"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 mt-6 text-lg md:text-xl font-semibold rounded-lg bg-purple-600 hover:bg-purple-900"
          >
            Login
          </button>
        </form>
        <p className="text-center text-base md:text-lg">
          Don't have an account?{" "}
          <a href="/signup" className="text-[#D946EF] hover:underline">
            Sign up here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
