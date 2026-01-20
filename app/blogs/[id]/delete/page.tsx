"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";

const dummyBlogs = [
    {
        id: "1",
        title: "Getting started with Next.js",
        author: "Alice Smith",
        content: "Learn the basics of building apps with Next.js and the app router...",
    },
    {
        id: "2",
        title: "Styling with Tailwind CSS",
        author: "Bob Johnson",
        content: "A quick primer on composing responsive UIs with Tailwind utility classes...",
    },
    {
        id: "3",
        title: "API Routes 101",
        author: "Chris Lee",
        content: "How to build and test API routes inside your Next.js project...",
    },
];

export default function DeleteBlogPage() {
    const router = useRouter();
    const params = useParams();
    const id = params.id as string;
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const blog = dummyBlogs.find((item) => item.id === id);

    useEffect(() => {
        if (!blog) {
            setError("Blog not found in dummy data");
        }
    }, [blog]);

    const handleDelete = async () => {
        setError(null);
        setIsLoading(true);

        try {
            await new Promise((resolve) => setTimeout(resolve, 600));
            setTimeout(() => router.push("/blogs"), 600);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    if (!blog) {
        return (
            <div className="mx-auto max-w-2xl rounded-lg border border-red-300 bg-white p-6 shadow-md">
                <div className="mb-4 rounded-md bg-red-100 p-3 text-sm text-red-800">
                    {error || "Blog not found"}
                </div>
                <Link
                    href="/blogs"
                    className="rounded-md border border-gray-300 px-4 py-2 font-semibold text-gray-700 hover:bg-gray-50 transition"
                >
                    Back to Blogs
                </Link>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-2xl rounded-lg border border-red-300 bg-white p-6 shadow-md">
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-red-800">Delete Blog</h1>
                <p className="mt-2 text-gray-600">This action cannot be undone</p>
            </div>

            {error && (
                <div className="mb-4 rounded-md bg-red-100 p-3 text-sm text-red-800">
                    {error}
                </div>
            )}

            {blog && (
                <div className="mb-6 rounded-md border border-gray-300 bg-gray-50 p-4">
                    <h2 className="text-xl font-bold text-gray-800">{blog.title}</h2>
                    <p className="mt-2 text-sm text-gray-600">By {blog.author}</p>
                    <p className="mt-4 text-gray-700">{blog.content}</p>
                </div>
            )}

            <div className="rounded-md bg-red-50 border border-red-200 p-4 mb-6">
                <p className="text-sm text-red-800">
                    Are you sure you want to delete this blog? This action cannot be undone.
                </p>
            </div>

            <div className="flex gap-3">
                <button
                    onClick={handleDelete}
                    disabled={isLoading}
                    className="rounded-md bg-red-600 px-4 py-2 font-semibold text-white hover:bg-red-700 transition disabled:opacity-50"
                >
                    {isLoading ? "Deleting..." : "Delete Blog"}
                </button>
                <Link
                    href={`/blogs/${id}`}
                    className="rounded-md border border-gray-300 px-4 py-2 font-semibold text-gray-700 hover:bg-gray-50 transition"
                >
                    Cancel
                </Link>
            </div>
        </div>
    );
}