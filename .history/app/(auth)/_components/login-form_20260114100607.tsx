"use client";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
export const loginSchema = z.object(
    {
        email: z.email({ message: "Email milena" }),
        password: z.string().min(6, { message: "Password pugena" })
    }
)

export type LoginForm = z.infer<typeof loginSchema>;

export default function Page() {
    const router = useRouter();
    const [pending, setTransition] = useTransition()
    const { register, handleSubmit, formState: { errors, isSubmitting } }
        = useForm<LoginForm>(
            {
                resolver: zodResolver(loginSchema),
            }
        )
    const [error, setError] = useState("")
    const onSubmit = async (data: LoginForm) => {
        // call action here, redirect to "/" on success 

    }

    return (
        <div>
            {error && <div className="text-red-500">{error}</div>}
            <form onSubmit={handleSubmit(onSubmit)}
                className="mx-auto p-2 max-w-xl border">
                <div className="mt-2">
                    <label>Email</label>
                    <input {...register("email")} className="border" />
                    {errors.email && <span className="text-red-500">{errors.email.message}</span>}
                </div>

                <div className="mt-2">
                    <label>Password</label>
                    <input type="password" {...register("password")} className="border" />
                    {errors.password && <span className="text-red-500">{errors.password.message}</span>}
                </div>
                <button type="submit" className="p-2 bg-green-500 mt-4">Submit</button>
            </form>
        </div>
    );
}