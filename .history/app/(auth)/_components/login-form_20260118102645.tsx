"use client";

import { useState } from 'react';

interface LoginFormProps {
  onSubmit?: (data: { email: string; password: string; rememberMe: boolean }) => void;
}

export function LoginForm({ onSubmit }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Invalid email address';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      if (onSubmit) {
        onSubmit({ email, password, rememberMe });
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleGoogleLogin = () => {
    console.log('Google login clicked');
  };

  return (
    <div className="w-full max-w-md">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome back!</h1>
        <p className="text-gray-600">Enter your Credentials to access your account</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Email Field */}
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
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
          )}
        </div>

        {/* Password Field */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-900">
              Password
            </label>
            <a href="#" className="text-sm text-blue-600 hover:underline">
              forgot password
            </a>
          </div>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition"
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-600">{errors.password}</p>
          )}
        </div>

        {/* Remember Me Checkbox */}
        <div className="flex items-center">
          <input
            id="remember"
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="w-4 h-4 text-gray-900 border-gray-300 rounded focus:ring-2 focus:ring-pink-500"
          />
          <label htmlFor="remember" className="ml-2 text-sm text-gray-900">
            Remember for 30 days
          </label>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-pink-500 to-pink-600 text-white py-3 px-4 rounded-lg font-medium hover:from-pink-600 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>

        {/* Divider */}
        <div className="relative flex items-center justify-center my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative bg-white px-4 text-sm text-gray-500">
            or
          </div>
        </div>

        {/* Google Sign In Button */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19.8055 10.2292C19.8055 9.55056 19.7508 9.0875 19.6322 8.60693H10.2002V11.5151H15.5926C15.5013 12.3276 14.9991 13.5151 13.8405 14.3003L13.8251 14.4012L16.7193 16.6298L16.9141 16.6486C18.7522 15.0056 19.8055 12.8292 19.8055 10.2292Z" fill="#4285F4"/>
            <path d="M10.2002 19.0002C12.6104 19.0002 14.6286 18.2056 16.9141 16.6487L13.8405 14.3003C13.0258 14.8584 11.9343 15.2375 10.2002 15.2375C7.85299 15.2375 5.85347 13.5945 5.09415 11.3848L4.99707 11.3932L1.98633 13.7113L1.95117 13.8056C4.22723 18.2584 6.9736 19.0002 10.2002 19.0002Z" fill="#34A853"/>
            <path d="M5.09415 11.3847C4.92067 10.7987 4.82017 10.1764 4.82017 9.53653C4.82017 8.89653 4.92067 8.27431 5.08488 7.68848L5.08024 7.58075L2.03516 5.22754L1.95117 5.26764C1.31055 6.53014 0.949219 7.96042 0.949219 9.53653C0.949219 11.1126 1.31055 12.5429 1.95117 13.8054L5.09415 11.3847Z" fill="#FBBC05"/>
            <path d="M10.2002 3.83542C12.2728 3.83542 13.6676 4.72514 14.465 5.46806L17.265 2.79167C14.6195 0.411458 12.6104 -0.330566 10.2002 0.330567C6.9736 0.330567 4.22723 2.40167 1.95117 5.26771L5.08488 7.68854C5.85347 5.47882 7.85299 3.83542 10.2002 3.83542Z" fill="#EB4335"/>
          </svg>
          Sign in with Google
        </button>

        {/* Sign Up Link */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Don't have an account?{' '}
          <a href="#" className="text-blue-600 font-medium hover:underline">
            Sign Up
          </a>
        </p>
      </form>
    </div>
  );
}
