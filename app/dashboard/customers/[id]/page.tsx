"use client";

import { useParams } from "next/navigation";
import Link from "next/link";

const dummyCustomers = [
    { id: "c1", name: "Jane Doe", email: "jane@example.com", phone: "+1 555-111-2222", address: "123 Main St, Springfield" },
    { id: "c2", name: "John Smith", email: "john@example.com", phone: "+1 555-333-4444", address: "987 Oak Ave, Metropolis" },
    { id: "c3", name: "Priya Patel", email: "priya@example.com", phone: "+1 555-555-6666", address: "42 Elm Rd, Gotham" },
];

export default function CustomerDetailsPage() {
    const params = useParams();
    const id = params.id as string;
    const customer = dummyCustomers.find((item) => item.id === id);

    if (!customer) {
        return (
            <div className="mx-auto max-w-2xl rounded-lg border border-red-300 bg-white p-6 shadow-md">
                <div className="mb-4 rounded-md bg-red-100 p-3 text-sm text-red-800">
                    Customer not found in dummy data
                </div>
                <Link
                    href="/customers"
                    className="inline-block rounded-md border border-gray-300 px-4 py-2 font-semibold text-gray-700 hover:bg-gray-50 transition"
                >
                    Back to Customers
                </Link>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-2xl rounded-lg border border-gray-300 bg-white p-6 shadow-md">
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-800">{customer.name}</h1>
                <p className="mt-2 text-gray-600">Customer Details</p>
            </div>

            <div className="space-y-4 mb-6">
                <div className="rounded-md border border-gray-300 bg-gray-50 p-4">
                    <p className="text-sm font-medium text-gray-600">ID</p>
                    <p className="text-lg font-semibold text-gray-800">{customer.id}</p>
                </div>

                <div className="rounded-md border border-gray-300 bg-gray-50 p-4">
                    <p className="text-sm font-medium text-gray-600">Email</p>
                    <p className="text-lg font-semibold text-gray-800">{customer.email}</p>
                </div>

                <div className="rounded-md border border-gray-300 bg-gray-50 p-4">
                    <p className="text-sm font-medium text-gray-600">Phone</p>
                    <p className="text-lg font-semibold text-gray-800">{customer.phone}</p>
                </div>

                {customer.address && (
                    <div className="rounded-md border border-gray-300 bg-gray-50 p-4">
                        <p className="text-sm font-medium text-gray-600">Address</p>
                        <p className="text-lg font-semibold text-gray-800">{customer.address}</p>
                    </div>
                )}
            </div>

            <div className="flex gap-3">
                <Link
                    href={`/customers/${id}/edit`}
                    className="rounded-md bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700 transition"
                >
                    Edit Customer
                </Link>
                <Link
                    href="/customers"
                    className="rounded-md border border-gray-300 px-4 py-2 font-semibold text-gray-700 hover:bg-gray-50 transition"
                >
                    Back to Customers
                </Link>
            </div>
        </div>
    );
}