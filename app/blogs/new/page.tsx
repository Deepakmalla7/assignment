"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NewBlogPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        content: "",
        author: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        setSuccess(false);
        setIsLoading(true);

        try {
            // Dummy async to mimic API call
            await new Promise((resolve) => setTimeout(resolve, 600));

            setSuccess(true);
            setTimeout(() => router.push("/blogs"), 1200);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="mx-auto max-w-2xl rounded-lg border border-gray-300 bg-white p-6 shadow-md">
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Create New Blog</h1>
                <p className="mt-2 text-gray-600">Write and publish a new blog post</p>
            </div>

            {error && (
                <div className="mb-4 rounded-md bg-red-100 p-3 text-sm text-red-800">
                    {error}
                </div>
            )}

            {success && (
                <div className="mb-4 rounded-md bg-green-100 p-3 text-sm text-green-800">
                    Blog created successfully (dummy).
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
                        {isLoading ? "Publishing..." : "Publish Blog"}
                    </button>
                    <Link
                        href="/blogs"
                        className="rounded-md border border-gray-300 px-4 py-2 font-semibold text-gray-700 hover:bg-gray-50 transition"
                    >
                        Cancel
                    </Link>
                </div>
            </form>
        </div>
    );
}