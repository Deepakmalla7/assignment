"use client";

import Link from "next/link";

const dummyCustomers = [
    { id: "c1", name: "Jane Doe", email: "jane@example.com", phone: "+1 555-111-2222" },
    { id: "c2", name: "John Smith", email: "john@example.com", phone: "+1 555-333-4444" },
    { id: "c3", name: "Priya Patel", email: "priya@example.com", phone: "+1 555-555-6666" },
];

export default function CustomersPage() {
    const customers = dummyCustomers;

    return (
        <div className="mx-auto max-w-6xl rounded-lg border border-gray-300 bg-white p-6 shadow-md text-black">
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Customers</h1>
                    <p className="mt-2 text-gray-600">Manage all customers</p>
                </div>
            </div>

            {customers.length === 0 ? (
                <div className="rounded-md bg-gray-50 p-6 text-center">
                    <p className="text-gray-600">No customers found</p>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-300">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="border border-gray-300 px-4 py-2 text-left">ID</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Email</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Phone</th>
                                <th className="border border-gray-300 px-4 py-2 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {customers.map((customer) => (
                                <tr key={customer.id} className="hover:bg-gray-50">
                                    <td className="border border-gray-300 px-4 py-2">{customer.id}</td>
                                    <td className="border border-gray-300 px-4 py-2">{customer.name}</td>
                                    <td className="border border-gray-300 px-4 py-2">{customer.email}</td>
                                    <td className="border border-gray-300 px-4 py-2">{customer.phone}</td>
                                    <td className="border border-gray-300 px-4 py-2 text-center">
                                        <Link
                                            href={`/customers/${customer.id}`}
                                            className="text-blue-600 hover:underline"
                                        >
                                            View
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}