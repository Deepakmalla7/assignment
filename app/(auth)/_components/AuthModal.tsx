"use client";

import React from "react";
import { LoginForm } from "./login-form";
import RegisterForm from "./register-form";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "login" | "register" | null;
}

export default function AuthModal({ isOpen, onClose, type }: AuthModalProps) {
  if (!isOpen || !type) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Close button */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <img src="/umm.jpg" alt="Logo" className="h-10 w-10 rounded-full object-cover" />
            <h2 className="text-2xl font-bold">
              {type === "login" ? "Log in" : "Sign up"}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
              <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        {/* Form content */}
        <div className="p-6">
          {type === "login" ? <LoginForm onSuccess={onClose} /> : <RegisterForm onSuccess={onClose} />}
        </div>
      </div>
    </div>
  );
}