"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginSchema, LoginType } from "./schema";




export default function ReactHookForm() {
    const {
        register,
        handleSubmit,
        formState: { errors,isSubmitting },

    }= useForm(
        {resolver:zodResolver(loginSchema),
        values:{email:"",password:""}
        }
    );

    const onSubmit =async(data:LoginType)=>{
        alert(data.email);
    }
    return (
        <div>
            <form
            className="mx-auto mt-10 flex max-w-md flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
            >
                <div className="mb-2">
                    <label className="mb-1 block font-bold" htmlFor="email">
                        Email:
                    </label>
                    <input
                        className="w-full rounded border border-gray-300 p-2"
                        type="email"
                        {...register("email")}
                    />
                    {errors.email && (
                    <p className="text-red-500">{errors.email.message as string}</p>
                    )}
                </div>
                <div className="mb-2">
                    <label className="mb-1 block font-bold" htmlFor="password">
                        Password:
                    </label>
                    <input
                        className="w-full rounded border border-gray-300 p-2"
                        type="password"
                        {...register("password")}
                    />
                    {errors.password && (
                    <p className="text-red-500">{errors.password.message as string}</p>
                    )}
                </div>
                <button
                    className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
                    type="submit"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Submitting..." : "Submit"}
                </button>
            </form>
        </div>
    );
}