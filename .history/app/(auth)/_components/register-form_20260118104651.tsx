import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterData, registerSchema } from "../schema";
import { useState } from "react";
import { handleRegister } from "@/lib/actions/auth-action";

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

      setTimeout(() => {
        setPending(false);
        alert("Registration complete! You would be redirected to login page.");
      }, 2000);
    } catch (err: any) {
      setError(err.message || "Registration failed");
      setPending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="space-y-4 w-full max-w-sm">
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

      <div className="space-y-2">
        <label className="block text-sm font-normal text-gray-900" htmlFor="name">
          Name
        </label>
        <input
          id="name"
          type="text"
          autoComplete="name"
          className="h-12 w-full rounded-md border border-gray-200 bg-white px-4 text-sm outline-none focus:border-gray-300 placeholder:text-gray-400"
          {...register("name")}
          placeholder="Enter your name"
        />
        {errors.name?.message && (
          <p className="text-xs text-red-600">{errors.name.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-normal text-gray-900" htmlFor="email">
          Email address
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          className="h-12 w-full rounded-md border border-gray-200 bg-white px-4 text-sm outline-none focus:border-gray-300 placeholder:text-gray-400"
          {...register("email")}
          placeholder="Enter your email"
        />
        {errors.email?.message && (
          <p className="text-xs text-red-600">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-normal text-gray-900" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          type="password"
          autoComplete="new-password"
          className="h-12 w-full rounded-md border border-gray-200 bg-white px-4 text-sm outline-none focus:border-gray-300 placeholder:text-gray-400"
          {...register("password")}
          placeholder="Password"
        />
        {errors.password?.message && (
          <p className="text-xs text-red-600">{errors.password.message}</p>
        )}
      </div>

      <div className="flex items-center gap-2">
        <input
          id="agreeToTerms"
          type="checkbox"
          className="h-4 w-4 rounded border-gray-300 text-pink-500 focus:ring-pink-500"
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
        <p className="text-xs text-red-600">{errors.agreeToTerms.message}</p>
      )}

      <button
        type="submit"
        disabled={isSubmitting || pending}
        className="h-12 w-full rounded-md bg-gradient-to-r from-pink-400 to-pink-500 text-white text-sm font-medium hover:from-pink-500 hover:to-pink-600 disabled:opacity-60 transition-all"
      >
        {isSubmitting || pending ? "Creating account..." : "Signup"}
      </button>

      <div className="text-center">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-4 text-gray-500">Or</span>
          </div>
        </div>
      </div>

      <button
        type="button"
        className="h-12 w-full rounded-md border border-gray-300 bg-white text-gray-700 text-sm font-medium hover:bg-gray-50 flex items-center justify-center gap-3 transition-colors"
      >
        <svg className="h-5 w-5" viewBox="0 0 24 24">
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          />
        </svg>
        Sign in with Google
      </button>

      <div className="text-center text-sm text-gray-900">
        Have an account?{" "}
        <a href="#" className="font-medium text-blue-600 hover:underline">
          Sign in
        </a>
      </div>
    </form>
  );
}
