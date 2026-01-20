"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterData, registerSchema } from "../schema";
import { useState } from "react";
import { handleRegister } from "../lib/actions/auth-action";


export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
    mode: "onSubmit",
  });

  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const submit = async (values: RegisterData) => {
    setError("");
    setSuccessMessage("");
    setPending(true);

    try {
      console.log("Submitting registration form", values);
      const response = await handleRegister(values);

      if (!response.success) {
        setError(response.message);
        setPending(false);
        return;
      }

      setSuccessMessage("Account created successfully! Redirecting to login...");
      console.log("Registration successful", response.data);

      // Simulate redirect to login page
      setTimeout(() => {
        setPending(false);
        // In a real app with routing, you would use: router.push("/login");
        alert("Registration complete! You would be redirected to login page.");
      }, 2000);
    } catch (err: any) {
      setError(err.message || "Registration failed");
      setPending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="space-y-4">
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

      <div className="space-y-1">
        <label className="text-sm font-medium" htmlFor="firstName">
          First name
        </label>
        <input
          id="firstName"
          type="text"
          autoComplete="given-name"
          className="h-10 w-full rounded-md border border-black/10 dark:border-white/15 bg-background px-3 text-sm outline-none focus:border-foreground/40"
          {...register("firstName")}
          placeholder="Jane"
        />
        {errors.firstName?.message && (
          <p className="text-xs text-red-600">{errors.firstName.message}</p>
        )}
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium" htmlFor="lastName">
          Last name
        </label>
        <input
          id="lastName"
          type="text"
          autoComplete="family-name"
          className="h-10 w-full rounded-md border border-black/10 dark:border-white/15 bg-background px-3 text-sm outline-none focus:border-foreground/40"
          {...register("lastName")}
          placeholder="Doe"
        />
        {errors.lastName?.message && (
          <p className="text-xs text-red-600">{errors.lastName.message}</p>
        )}
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium" htmlFor="username">
          Username
        </label>
        <input
          id="username"
          type="text"
          autoComplete="username"
          className="h-10 w-full rounded-md border border-black/10 dark:border-white/15 bg-background px-3 text-sm outline-none focus:border-foreground/40"
          {...register("username")}
          placeholder="janedoe"
        />
        {errors.username?.message && (
          <p className="text-xs text-red-600">{errors.username.message}</p>
        )}
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          className="h-10 w-full rounded-md border border-black/10 dark:border-white/15 bg-background px-3 text-sm outline-none focus:border-foreground/40"
          {...register("email")}
          placeholder="you@example.com"
        />
        {errors.email?.message && (
          <p className="text-xs text-red-600">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          type="password"
          autoComplete="new-password"
          className="h-10 w-full rounded-md border border-black/10 dark:border-white/15 bg-background px-3 text-sm outline-none focus:border-foreground/40"
          {...register("password")}
          placeholder="••••••"
        />
        {errors.password?.message && (
          <p className="text-xs text-red-600">{errors.password.message}</p>
        )}
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium" htmlFor="confirmPassword">
          Confirm password
        </label>
        <input
          id="confirmPassword"
          type="password"
          autoComplete="new-password"
          className="h-10 w-full rounded-md border border-black/10 dark:border-white/15 bg-background px-3 text-sm outline-none focus:border-foreground/40"
          {...register("confirmPassword")}
          placeholder="••••••"
        />
        {errors.confirmPassword?.message && (
          <p className="text-xs text-red-600">{errors.confirmPassword.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting || pending}
        className="h-10 w-full rounded-md bg-foreground text-background text-sm font-semibold hover:opacity-90 disabled:opacity-60"
      >
        {isSubmitting || pending ? "Creating account..." : "Create account"}
      </button>

      <div className="mt-1 text-center text-sm">
        Already have an account?{" "}
        <a href="/login" className="font-semibold hover:underline">
          Log in
        </a>
      </div>
    </form>
  );
}
