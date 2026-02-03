"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterData, registerSchema } from "../schema";
import { useState } from "react";
import { handleRegister } from "@/lib/actions/auth-action";
import { useRouter } from "next/navigation";
import { UserPlus, Eye, EyeOff, Mail, User, Lock, CheckCircle2 } from "lucide-react";

interface RegisterFormProps {
  onSuccess?: () => void;
}

export default function RegisterForm({ onSuccess }: RegisterFormProps) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
  });

  const submit = async (values: RegisterData) => {
    console.log("Form submitted with values:", values);
    setError("");
    setSuccessMessage("");

    // Validation checks
    if (!values.firstName || !values.lastName || !values.username || !values.email || !values.password || !values.confirmPassword) {
      setError("All fields are required. Please fill in all fields.");
      return;
    }

    if (values.password !== values.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      console.log("Calling registration API...");
      
      // Call the API route
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: values.firstName,
          lastName: values.lastName,
          username: values.username,
          email: values.email,
          password: values.password,
          confirmPassword: values.confirmPassword,
        }),
        credentials: 'include'
      });

      const result = await response.json();
      console.log("Registration response:", result);

      if (!result.success) {
        setError(result.message || "Registration failed. Please try again.");
        return;
      }

      setSuccessMessage("Account created successfully! Redirecting to login...");
      
      // Wait for user to see success message before redirecting
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (onSuccess) {
        onSuccess();
      } else {
        // Redirect to login
        window.location.href = "/login";
      }
    } catch (error: any) {
      console.error("Registration error:", error);
      setError(error.message || "Registration failed. Please try again.");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-500 to-purple-600 mb-4 shadow-lg">
          <UserPlus className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-2">
          Create Account
        </h1>
        <p className="text-gray-500">Join us and get started today</p>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
        <form onSubmit={handleSubmit(submit)} className="space-y-4" method="POST">
          {error && (
            <div className="rounded-lg bg-red-50 p-4 border border-red-200 animate-shake">
              <p className="text-sm text-red-700 font-medium">{error}</p>
            </div>
          )}
          {successMessage && (
            <div className="rounded-lg bg-green-50 p-4 border border-green-200">
              <p className="text-sm text-green-700 font-medium flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                {successMessage}
              </p>
            </div>
          )}

          {/* Name Row */}
          <div className="grid grid-cols-2 gap-4">
            {/* First Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                First Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  placeholder="John"
                  {...register("firstName")}
                  required
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl text-sm focus:border-pink-500 focus:outline-none focus:ring-4 focus:ring-pink-100 transition-all"
                />
              </div>
              {errors.firstName && (
                <p className="mt-1 text-xs text-red-500 font-medium">{errors.firstName.message}</p>
              )}
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Last Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  placeholder="Doe"
                  {...register("lastName")}
                  required
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl text-sm focus:border-pink-500 focus:outline-none focus:ring-4 focus:ring-pink-100 transition-all"
                />
              </div>
              {errors.lastName && (
                <p className="mt-1 text-xs text-red-500 font-medium">{errors.lastName.message}</p>
              )}
            </div>
          </div>

          {/* Username */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Username
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                placeholder="johndoe"
                {...register("username")}
                required
                minLength={3}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl text-sm focus:border-pink-500 focus:outline-none focus:ring-4 focus:ring-pink-100 transition-all"
              />
            </div>
            {errors.username && (
              <p className="mt-1 text-xs text-red-500 font-medium">{errors.username.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                placeholder="you@example.com"
                {...register("email")}
                required
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl text-sm focus:border-pink-500 focus:outline-none focus:ring-4 focus:ring-pink-100 transition-all"
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-xs text-red-500 font-medium">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
                {...register("password")}
                required
                minLength={3}
                className="w-full pl-12 pr-12 py-3 border-2 border-gray-200 rounded-xl text-sm focus:border-pink-500 focus:outline-none focus:ring-4 focus:ring-pink-100 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-xs text-red-500 font-medium">{errors.password.message}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your password"
                {...register("confirmPassword")}
                required
                minLength={3}
                className="w-full pl-12 pr-12 py-3 border-2 border-gray-200 rounded-xl text-sm focus:border-pink-500 focus:outline-none focus:ring-4 focus:ring-pink-100 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
              >
                {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="mt-1 text-xs text-red-500 font-medium">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all duration-200 mt-6"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating Account...
              </span>
            ) : (
              "Create Account"
            )}
          </button>

          {/* Login Link */}
          <p className="text-center text-sm text-gray-600 mt-6">
            Already have an account?{" "}
            <a
              href="/login"
              className="font-semibold text-pink-500 hover:text-pink-600 transition-colors"
            >
              Sign in
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
