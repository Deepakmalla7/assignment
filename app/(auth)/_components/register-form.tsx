"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterData, registerSchema } from "../schema";
import { useState } from "react";
import { handleRegister } from "@/lib/actions/auth-action";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      role: "user",
    },
  });

  const submit = async (values: RegisterData) => {
    setError("");
    setSuccessMessage("");

    try {
      const response = await handleRegister(values);

      if (!response.success) {
        setError(response.message);
        return;
      }

      setSuccessMessage("Account created successfully! Redirecting...");

      setTimeout(() => router.push("/login"), 1500);
    } catch {
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="space-y-4 w-full max-w-sm">
      {error && <p className="text-sm text-red-600">{error}</p>}
      {successMessage && <p className="text-sm text-green-600">{successMessage}</p>}

      {/* First Name */}
      <input
        placeholder="First Name"
        {...register("firstName")}
        className="input"
      />
      {errors.firstName && <p className="error">{errors.firstName.message}</p>}

      {/* Last Name */}
      <input
        placeholder="Last Name"
        {...register("lastName")}
        className="input"
      />
      {errors.lastName && <p className="error">{errors.lastName.message}</p>}

      {/* Username */}
      <input
        placeholder="Username"
        {...register("username")}
        className="input"
      />
      {errors.username && <p className="error">{errors.username.message}</p>}

      {/* Email */}
      <input
        type="email"
        placeholder="Email"
        {...register("email")}
        className="input"
      />
      {errors.email && <p className="error">{errors.email.message}</p>}

      {/* Password */}
      <input
        type="password"
        placeholder="Password"
        {...register("password")}
        className="input"
      />
      {errors.password && <p className="error">{errors.password.message}</p>}

      {/* Confirm Password */}
      <input
        type="password"
        placeholder="Confirm Password"
        {...register("confirmPassword")}
        className="input"
      />
      {errors.confirmPassword && (
        <p className="error">{errors.confirmPassword.message}</p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="h-12 w-full rounded-md bg-pink-500 text-white"
      >
        {isSubmitting ? "Creating..." : "Signup"}
      </button>
    </form>
  );
}
