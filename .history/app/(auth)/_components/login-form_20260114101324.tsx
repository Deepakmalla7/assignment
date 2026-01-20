"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginData } from "../schema";
import { handleLogin } from "@/lib/actions/auth-action";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginData) => {
    setIsLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const result = await handleLogin(data);
      
      if (result.success) {
        setSuccessMessage(result.message);
        // Redirect to dashboard or home page after successful login
        setTimeout(() => {
          router.push("/blogs");
        }, 1500);
      } else {
        setErrorMessage(result.message);
      }
    } catch (error: any) {
      setErrorMessage(error.message || "An error occurred during login");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto mt-16 w-full max-w-md rounded-lg border border-gray-300 bg-white p-6 shadow-md">
      <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">
        Login
      </h2>

      {/* Error Message */}
      {errorMessage && (
        <div className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-600">
          {errorMessage}
        </div>
      )}

      {/* Success Message */}
      {successMessage && (
        <div className="mb-4 rounded-md bg-green-50 p-3 text-sm text-green-600">
          {successMessage}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Email */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            placeholder="you@example.com"
            {...register("email")}
            className="text-black w-full rounded-md border border-gray-300 px-3 py-2
                       focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            placeholder="••••••••"
            {...register("password")}
            className="text-black w-full rounded-md border border-gray-300 px-3 py-2
                       focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
          )}
        </div>

        {/* Remember + Forgot */}
        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2">
            <input type="checkbox" className="accent-black" />
            Remember me
          </label>

          <Link href="/forgot-password" className="text-blue-600 hover:underline">
            Forgot password?
          </Link>
        </div>

        {/* Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-md bg-black py-2 font-semibold text-white
                     hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>

      {/* Signup */}
      <p className="mt-4 text-center text-sm text-gray-600">
        Don't have an account?
        <Link href="/register" className="ml-1 font-medium text-blue-600 hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  );
}