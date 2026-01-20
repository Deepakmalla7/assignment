"use client";

import { handleLogin, handleRegister } from "@/lib/actions/auth-action";
import { useState } from "react";

interface LoginFormProps {
  onSubmit?: (data: {
    email: string;
    password: string;
    rememberMe: boolean;
  }) => void;
}

export function LoginForm({ onSubmit }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const validateForm = (): boolean => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Invalid email address";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const response = await handleLogin({
        email,
        password,
        rememberMe,
      });

    

      onSubmit?.({ email, password, rememberMe });
      // redirect handled in server action or parent
    } catch {
      setServerError("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  const handleGoogleLogin = () => {
    console.log("Google login clicked");
  };

  return (
    <div className="w-full max-w-md">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Welcome back!
        </h1>
        <p className="text-gray-600">
          Enter your credentials to access your account
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-900 mb-2">
            Email address
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-900">
              Password
            </label>
            <button
              type="button"
              className="text-sm text-blue-600 hover:underline"
            >
              Forgot password?
            </button>
          </div>

          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-600">{errors.password}</p>
          )}
        </div>

        {/* Remember Me */}
        <div className="flex items-center">
          <input
            id="remember"
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="w-4 h-4 border-gray-300 rounded focus:ring-2 focus:ring-pink-500"
          />
          <label htmlFor="remember" className="ml-2 text-sm text-gray-900">
            Remember for 30 days
          </label>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-pink-500 to-pink-600 text-white py-3 rounded-lg font-medium hover:from-pink-600 hover:to-pink-700 disabled:opacity-50"
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>

        {/* Divider */}
        <div className="relative flex items-center justify-center my-6">
          <div className="absolute inset-0 border-t border-gray-300" />
          <span className="relative bg-white px-4 text-sm text-gray-500">
            or
          </span>
        </div>

        {/* Google Login */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 border border-gray-300 py-3 rounded-lg hover:bg-gray-50"
        >
          <span className="font-medium text-gray-700">
            Sign in with Google
          </span>
        </button>

        {/* Sign up */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Don&apos;t have an account?{" "}
          <button className="text-blue-600 font-medium hover:underline">
            Sign Up
          </button>
        </p>
      </form>
    </div>
  );
}
