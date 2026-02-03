"use client";

import { useEffect } from "react";

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Get the stored theme or use system preference
    const stored = localStorage.getItem("theme") as "light" | "dark" | "system" | null;
    const initial = stored ?? "system";

    const root = document.documentElement;

    const applyTheme = (theme: "light" | "dark" | "system") => {
      if (theme === "system") {
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        root.classList.toggle("dark", prefersDark);
        root.style.colorScheme = prefersDark ? "dark" : "light";
      } else {
        root.classList.toggle("dark", theme === "dark");
        root.style.colorScheme = theme;
      }
    };

    applyTheme(initial);

    // Listen for system theme changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      const current = localStorage.getItem("theme") as "light" | "dark" | "system" | null;
      if (current === "system") {
        applyTheme("system");
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return <>{children}</>;
}
