"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  age?: number;
  gender?: string;
  role: string;
  profilePicture?: string;
  createdAt: string;
  updatedAt: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

export default function AdminUserDetailPage() {
  const params = useParams();
  const router = useRouter();
  const userId = params.id as string;

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (userId) {
      fetchUser();
    }
  }, [userId]);

  const fetchUser = async () => {
    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("auth_token="))
        ?.split("=")[1];

      if (!token) {
        setError("Not authenticated");
        return;
      }

      const response = await fetch(`${API_BASE_URL}/api/admin/users/${userId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();

      if (result.success) {
        setUser(result.data);
      } else {
        setError(result.message || "Failed to load user");
      }
    } catch (err: any) {
      console.error("Error fetching user:", err);
      setError("Failed to load user. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="max-w-4xl mx-auto p-8">
        <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-6 rounded">
          <p className="text-red-600 dark:text-red-400 font-semibold">
            {error || "User not found"}
          </p>
        </div>
        <button
          onClick={() => router.push("/admin/users")}
          className="mt-4 text-emerald-600 hover:text-emerald-700"
        >
          ← Back to Users
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="mb-6">
        <Link
          href="/admin/users"
          className="text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300"
        >
          ← Back to Users
        </Link>
      </div>

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          User Details
        </h1>
        <div className="flex gap-3">
          <Link
            href={`/admin/users/${userId}/edit`}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition"
          >
            Edit User
          </Link>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <div className="flex items-start gap-8 mb-8">
          {/* Profile Picture */}
          <div className="w-32 h-32 flex-shrink-0">
            {user.profilePicture ? (
              <img
                src={
                  user.profilePicture.startsWith("http")
                    ? user.profilePicture
                    : `${API_BASE_URL}${user.profilePicture}`
                }
                alt={user.firstName}
                className="w-full h-full rounded-lg object-cover border-4 border-emerald-600"
              />
            ) : (
              <div className="w-full h-full rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white text-5xl font-bold">
                {user.firstName.charAt(0).toUpperCase()}
              </div>
            )}
          </div>

          {/* User Info */}
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {user.firstName} {user.lastName}
            </h2>
            <span
              className={`px-3 py-1 inline-flex text-sm font-semibold rounded-full ${
                user.role === "admin"
                  ? "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
                  : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
              }`}
            >
              {user.role.toUpperCase()}
            </span>
          </div>
        </div>

        {/* User Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <label className="block text-sm font-semibold text-gray-600 dark:text-gray-400 mb-1">
              User ID
            </label>
            <p className="text-gray-900 dark:text-white font-mono text-sm">
              {user.id}
            </p>
          </div>

          <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <label className="block text-sm font-semibold text-gray-600 dark:text-gray-400 mb-1">
              Email Address
            </label>
            <p className="text-gray-900 dark:text-white">{user.email}</p>
          </div>

          <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <label className="block text-sm font-semibold text-gray-600 dark:text-gray-400 mb-1">
              Username
            </label>
            <p className="text-gray-900 dark:text-white">{user.username}</p>
          </div>

          {user.age && (
            <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <label className="block text-sm font-semibold text-gray-600 dark:text-gray-400 mb-1">
                Age
              </label>
              <p className="text-gray-900 dark:text-white">{user.age} years</p>
            </div>
          )}

          {user.gender && (
            <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <label className="block text-sm font-semibold text-gray-600 dark:text-gray-400 mb-1">
                Gender
              </label>
              <p className="text-gray-900 dark:text-white capitalize">
                {user.gender}
              </p>
            </div>
          )}

          <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <label className="block text-sm font-semibold text-gray-600 dark:text-gray-400 mb-1">
              Account Created
            </label>
            <p className="text-gray-900 dark:text-white">
              {new Date(user.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>

          <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <label className="block text-sm font-semibold text-gray-600 dark:text-gray-400 mb-1">
              Last Updated
            </label>
            <p className="text-gray-900 dark:text-white">
              {new Date(user.updatedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
