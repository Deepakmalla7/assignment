"use client";

import { useEffect, ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function ProtectedLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Check if user has authentication token
    const hasToken = typeof window !== "undefined" && !!localStorage.getItem("authToken");

    // // If trying to access protected route without token, redirect to login
    // if (!hasToken && pathname.startsWith("/dashboard")) {
    //   router.replace("/login");
    // }
  }, [pathname, router]);

  return <>{children}</>;
}
