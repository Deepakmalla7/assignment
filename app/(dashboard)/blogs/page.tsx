"use client";

import Link from "next/link";

const dummyBlogs = [
    {
        id: "1",
        title: "Getting started with Next.js",
        author: "Alice Smith",
        excerpt: "Learn the basics of building apps with Next.js and the app router...",
    },
    {
        id: "2",
        title: "Styling with Tailwind CSS",
        author: "Bob Johnson",
        excerpt: "A quick primer on composing responsive UIs with Tailwind utility classes...",
    },
    {
        id: "3",
        title: "API Routes 101",
        author: "Chris Lee",
        excerpt: "How to build and test API routes inside your Next.js project...",
    },
];

export default function BlogsPage() {
    return (
        <div className="mx-auto max-w-5xl space-y-6 rounded-lg border border-gray-300 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Blogs</h1>
                    <p className="text-gray-600">Listing dummy blog posts.</p>
                </div>
                <Link
                    href="/blogs/new"
                    className="rounded-md bg-black px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800 transition"
                >
                    New Blog
                </Link>
            </div>

            <div className="space-y-4">
                {dummyBlogs.map((blog) => (
                    <div
                        key={blog.id}
                        className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md transition"
                    >
                        <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                                <h2 className="text-xl font-semibold text-gray-900">{blog.title}</h2>
                                <p className="mt-1 text-sm text-gray-600">By {blog.author}</p>
                                <p className="mt-2 text-gray-700">{blog.excerpt}</p>
                            </div>
                            <div className="flex flex-col items-end gap-2 text-sm">
                                <Link href={`/blogs/${blog.id}`} className="text-blue-600 hover:underline">
                                    View
                                </Link>
                                <Link href={`/blogs/${blog.id}/edit`} className="text-blue-600 hover:underline">
                                    Edit
                                </Link>
                                <Link href={`/blogs/${blog.id}/delete`} className="text-red-600 hover:underline">
                                    Delete
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}