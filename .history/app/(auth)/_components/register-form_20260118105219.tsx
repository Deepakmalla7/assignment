"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterData, registerSchema } from "../schema";
import { useState } from "react";
import { handleRegister } from "@/lib/actions/auth-action";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
    mode: "onSubmit",
  });

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const submit = async (values: RegisterData) => {
    setError("");
    setSuccessMessage("");

    try {
      const response = await handleRegister(values);

      if (!response.success) {
        setError(response.message);
        return;
      }

      setSuccessMessage("Account created successfully! Redirecting to login...");

      setTimeout(() => {
        router.push("/login");
      }, 1500);
    } catch {
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="space-y-4 w-full max-w-sm"
    >
      {error && (
        <div className="rounded-md bg-red-50 border border-red-200 p-3 text-sm text-red-800">
          {error}
        </div>
      )}

      {successMessage && (
        <div className="rounded-md bg-green-50 border border-green-200 p-3 text-sm text-green-800">
          {successMessage}
        </div>
      )}

      {/* Name */}
      <div className="space-y-2">
        <label htmlFor="name" className="block text-sm text-gray-900">
          Name
        </label>
        <input
          id="name"
          type="text"
          className="h-12 w-full rounded-md border border-gray-200 px-4 text-sm outline-none focus:border-gray-300"
          placeholder="Enter your name"
          {...register("name")}
        />
        {errors.name?.message && (
          <p className="text-xs text-red-600">{errors.name.message}</p>
        )}
      </div>

      {/* Email */}
      <div className="space-y-2">
        <label htmlFor="email" className="block text-sm text-gray-900">
          Email address
        </label>
        <input
          id="email"
          type="email"
          className="h-12 w-full rounded-md border border-gray-200 px-4 text-sm outline-none focus:border-gray-300"
          placeholder="Enter your email"
          {...register("email")}
        />
        {errors.email?.message && (
          <p className="text-xs text-red-600">{errors.email.message}</p>
        )}
      </div>

      {/* Password */}
      <div className="space-y-2">
        <label htmlFor="password" className="block text-sm text-gray-900">
          Password
        </label>
        <input
          id="password"
          type="password"
          className="h-12 w-full rounded-md border border-gray-200 px-4 text-sm outline-none focus:border-gray-300"
          placeholder="Password"
          {...register("password")}
        />
        {errors.password?.message && (
          <p className="text-xs text-red-600">{errors.password.message}</p>
        )}
      </div>

      {/* Terms */}
      <div className="flex items-center gap-2">
        <input
          id="agreeToTerms"
          type="checkbox"
          className="h-4 w-4"
          {...register("agreeToTerms")}
        />
        <label htmlFor="agreeToTerms" className="text-sm text-gray-900">
          I agree to the{" "}
          <a href="#" className="text-blue-600 underline">
            terms & policy
          </a>
        </label>
      </div>
      {errors.agreeToTerms?.message && (
        <p className="text-xs text-red-600">
          {errors.agreeToTerms.message}
        </p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="h-12 w-full rounded-md bg-gradient-to-r from-pink-400 to-pink-500 text-white text-sm font-medium hover:from-pink-500 hover:to-pink-600 disabled:opacity-60"
      >
        {isSubmitting ? "Creating account..." : "Signup"}
      </button>

      {/* Divider */}
      <div className="relative text-center">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200" />
        </div>
        <span className="relative bg-white px-4 text-sm text-gray-500">
          Or
        </span>
      </div>

      {/* Google Button (UI only) */}
      <button
        type="button"
        disabled
        className="h-12 w-full rounded-md border border-gray-300 bg-gray-100 text-gray-500 text-sm font-medium flex items-center justify-center gap-3 cursor-not-allowed"
      >
        Sign in with Google
      </button>

      <div className="text-center text-sm text-gray-900">
        Have an account?{" "}
        <a href="/login" className="font-medium text-blue-600 hover:underline">
          Sign in
        </a>
      </div>
    </form>
  );
}
