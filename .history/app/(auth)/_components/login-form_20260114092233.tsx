"use client";

import Link from "next/link";

export default function LoginForm() {
  return (
    <div className="mx-auto mt-16 w-full max-w-md rounded-lg border border-gray-300 bg-white p-6 shadow-md">
      <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">
        Login
      </h2>

      <form className="space-y-4">
        {/* Email */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            placeholder="you@example.com"
            className="text-black w-full rounded-md border border-gray-300 px-3 py-2
                       focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
          />
        </div>

        {/* Password */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            placeholder=""
            className="text-black w-full rounded-md border border-gray-300 px-3 py-2
                       focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
          />
        </div>

        {/* Remember + Forgot */}
        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2">
            <input type="checkbox" className="accent-black" />
            Remember me
          </label>

          <Link href="/forgot-password">
            Forgot password?
          </Link>
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full rounded-md bg-black py-2 font-semibold text-white
                     hover:bg-gray-800 transition"
        >
          Login
        </button>
      </form>

      {/* Signup */}
      <p className="mt-4 text-center text-sm text-gray-600">
        Don’t have an account?
        <Link href="/register" className="ml-1 font-medium text-blue-600 hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  );
}
