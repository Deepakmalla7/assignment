"use client";
import { UseRegisterForm } from "../hooks/use-register-form";

export default function RegisterForm() {
    const {
        firstname,
        lastname,
        username,
        email,
        password,
        confirmPassword,
        handleFirstName,
        handleLastName,
        handleUsername,
        handleEmail,
        handlePassword,
        handleConfirmPassword,
        handleSubmit
    } = UseRegisterForm();
    return (
        <div>
            <form className="space-y-4">
                {/* First Name */}
                    <label className="mb-1 block text-sm font-medium text-white-700">
                        First Name
                    </label>
                    <input
                        type="text"
                        placeholder="Enter first name"
                        value={firstname}
                        onChange={handleFirstName}
                        className="text-white w-full rounded-md border border-gray-300 px-3 py-2 focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
                    />
              
              <label className="mb-1 block text-sm font-medium text-white-700">
                        Last Name
                    </label>
                    <input
                        type="text"
                        placeholder="Enter last name"
                        value={lastname}
                        onChange={handleLastName}
                        className="text-white w-full rounded-md border border-gray-300 px-3 py-2 focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
                    />
              <label className="mb-1 block text-sm font-medium text-white-700">
                        Email
                    </label>
                    <input
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={handleEmail}
                        className="text-white w-full rounded-md border border-gray-300 px-3 py-2 focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
                    />

                    <label className="mb-1 block text-sm font-medium text-white-700">
                       username
                    </label>
                    <input
                        type="text"
                        placeholder="Enter username"
                        value={username}
                        onChange={handleUsername}
                        className="text-white w-full rounded-md border border-gray-300 px-3 py-2 focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
                    />
              
                    <label className="mb-1 block text-sm font-medium text-white-700">
                       password
                    </label>
                    <input
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={handlePassword}
                        className="text-white w-full rounded-md border border-gray-300 px-3 py-2 focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
                    />
                    
                    <label className="mb-1 block text-sm font-medium text-white-700">
                       Confirm password
                    </label>
                    <input
                        type="password"
                        placeholder="confirm password"
                        value={confirmPassword}
                        onChange={handleConfirmPassword}
                        className="text-white w-full rounded-md border border-gray-300 px-3 py-2 focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
                    />

                    <button
                        type="submit"
                        onClick={(e) => {
                            e.preventDefault();
                            handleSubmit();
                        }}
                        className="w-full rounded-md bg-black px-3 py-2 text-white hover:bg-gray-800"
                    >
                        Register
                    </button>
              
                </form>
        </div>
    );
}