/**
 * Dashboard Layout
 * Parent layout for authenticated dashboard pages
 */

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../dashboard/_components/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    // Check if user is authenticated
    const hasToken = typeof window !== "undefined" && localStorage.getItem("authToken");
    if (!hasToken) {
      router.push("/login");
    }
  }, [router]);

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <div className="p-6 md:p-8">
          {children}
        </div>
      </div>
    </div>
  );
}
