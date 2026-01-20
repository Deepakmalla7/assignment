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

export default function EditBlogPage() {
    const router = useRouter();
    const params = useParams();
    const id = params.id as string;
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const blog = dummyBlogs.find((item) => item.id === id);
    const [formData, setFormData] = useState({
        title: blog?.title || "",
        content: blog?.content || "",
        author: blog?.author || "",
    });

    useEffect(() => {
        if (!blog) {
            setError("Blog not found in dummy data");
        } else {
            setFormData({
                title: blog.title,
                content: blog.content,
                author: blog.author,
            });
        }
    }, [blog]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        try {
            // Dummy async to mimic an update
            await new Promise((resolve) => setTimeout(resolve, 600));
            setTimeout(() => router.push(`/blogs/${id}`), 800);
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
        <div className="mx-auto max-w-2xl rounded-lg border border-gray-300 bg-white p-6 shadow-md">
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Edit Blog</h1>
                <p className="mt-2 text-gray-600">Update your blog post</p>
            </div>

            {error && (
                <div className="mb-4 rounded-md bg-red-100 p-3 text-sm text-red-800">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">Title</label>
                    <input
                        type="text"
                        name="title"
                        placeholder="Blog Title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
                    />
                </div>

                <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">Author</label>
                    <input
                        type="text"
                        name="author"
                        placeholder="Author Name"
                        value={formData.author}
                        onChange={handleChange}
                        required
                        className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
                    />
                </div>

                <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">Content</label>
                    <textarea
                        name="content"
                        placeholder="Blog Content"
                        value={formData.content}
                        onChange={handleChange}
                        required
                        rows={10}
                        className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
                    />
                </div>

                <div className="flex gap-3">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="rounded-md bg-black px-4 py-2 font-semibold text-white hover:bg-gray-800 transition disabled:opacity-50"
                    >
                        {isLoading ? "Saving..." : "Save Changes"}
                    </button>
                    <Link
                        href={`/blogs/${id}`}
                        className="rounded-md border border-gray-300 px-4 py-2 font-semibold text-gray-700 hover:bg-gray-50 transition"
                    >
                        Cancel
                    </Link>
                </div>
            </form>
        </div>
    );
}