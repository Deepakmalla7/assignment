"use client";

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

export default function BlogDetailsPage({
    params,
}: {
    params: { id?: string };
}) {
    // Normalize to a string; fallback to "" to avoid runtime errors.
    const normalizedId = String(params?.id ?? "");
    const blog = dummyBlogs.find((item) => item.id === normalizedId);

    if (!blog) {
        return (
            <div className="mx-auto max-w-3xl rounded-lg border border-red-300 bg-white p-6 shadow-sm">
                <p className="text-red-700">Blog not found in dummy data.</p>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-3xl space-y-4 rounded-lg border border-gray-300 bg-white p-6 shadow-sm">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">{blog.title}</h1>
                <p className="text-gray-600">By {blog.author}</p>
            </div>
            <p className="text-gray-800 leading-relaxed">{blog.content}</p>
        </div>
    );
}