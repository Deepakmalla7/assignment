"use client";

import { useAuth } from "@/context/AuthContext";
import Image from "next/image";

export default function Home() {
  const { user, logout } = useAuth();

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        
        {/* Auth Section */}
        <div className="mb-6 w-full text-center sm:text-left">
          {user ? (
            <>
              <p className="text-lg font-medium text-black dark:text-white">
                Welcome {user.name}
              </p>
              <button
                onClick={logout}
                className="mt-2 rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <p className="text-lg text-zinc-600 dark:text-zinc-400">
              Not logged in
            </p>
          )}
        </div>

        {/* Logo */}
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />

        {/* Content */}
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            To get started, edit the page.tsx file.
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Looking for a starting point or more instructions? Head over to{" "}
            <a
              href="https://vercel.com/templates?framework=next.js"
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              Templates
            </a>{" "}
            or the{" "}
            <a
              href="https://nextjs.org/learn"
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              Learning
            </a>{" "}
            center.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          <a
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
            href="https://vercel.com/new"
            target="_blank"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel"
              width={16}
              height={16}
            />
            Deploy Now
          </a>

          <a
            className="flex h-12 w-full items-center justify-center rounded-full border px-5 hover:bg-black/[.04] dark:hover:bg-[#1a1a1a] md:w-[158px]"
            href="https://nextjs.org/docs"
            target="_blank"
          >
            Documentation
          </a>
        </div>
      </main>
    </div>
  );
}
