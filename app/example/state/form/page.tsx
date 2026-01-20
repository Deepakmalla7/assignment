"use client";
import { useState, useEffect } from "react";

export default function StateFormPage() {
    const [username, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [age, setAge] = useState(18);

    useEffect(() => {
        if (age < 18) {
            alert("Age must be at least 18");
        }
    }, [age]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(!password){
            alert("please enter password to continue")
        }
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        alert(`Registration successful for ${email}`);
    };

    return (
        <div className="mx-auto mt-16 w-full max-w-md rounded-lg border border-gray-300 bg-white p-6 shadow-md">
            <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">
                Form with State
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Username */}
                <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                        Username
                    </label>
                    <input
                        type="text"
                        placeholder="Enter username"
                        value={username}
                        onChange={(e) => setUserName(e.target.value)}
                        className="text-black w-full rounded-md border border-gray-300 px-3 py-2 focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
                    />
                </div>

                {/* Email */}
                <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                        Email
                    </label>
                    <input
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="text-black w-full rounded-md border border-gray-300 px-3 py-2 focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
                    />
                </div>

                {/* Password */}
                <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                        Password
                    </label>
                    <input
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="text-black w-full rounded-md border border-gray-300 px-3 py-2 focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
                    />
                </div>

                {/* Confirm Password */}
                <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        placeholder="Confirm password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="text-black w-full rounded-md border border-gray-300 px-3 py-2 focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
                    />
                </div>

                {/* Age */}
                <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                        Age
                    </label>
                    <input
                        type="number"
                        placeholder="Enter age"
                        value={age}
                        onChange={(e) => setAge(Number(e.target.value))}
                        className="text-black w-full rounded-md border border-gray-300 px-3 py-2 focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
                    />
                </div>

                {/* Button */}
                <button
                    type="submit"
                    className="w-full rounded-md bg-black py-2 font-semibold text-white hover:bg-gray-800 transition"
                >
                    Register
                </button>
            </form>
        </div>
    );
}
