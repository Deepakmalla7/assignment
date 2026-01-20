"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { register } from "module";
import { useForm } from "react-hook-form";
import { registerSchema, RegisterType } from "./schema";




export default function ReactHookForm() {
    const {
        register,
        handleSubmit,
        formState: { errors,isSubmitting },

    }= useForm(
        {resolver:zodResolver(registerSchema),
        values:{
            firstName:"",
            lastName:"",
            age:"",
            email:"",
            password:""}
        }
    );

    const onSubmit =async(data:RegisterType)=>{
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
                        First Name:
                    </label>
                    <input
                        className="w-full rounded border border-gray-300 p-2"
                        type="text"
                        {...register("firstName")}
                    />
                    {errors.firstName && (
                    <p className="text-red-500">{errors.firstName.message as string}</p>
                    )}
                    </div>
                <div className="mb-2">
                    <label className="mb-1 block font-bold" htmlFor="lastName">
                        Last Name:
                    </label>
                    <input
                        className="w-full rounded border border-gray-300 p-2"
                        type="text"
                        {...register("lastName")}
                    />
                    {errors.lastName && (
                    <p className="text-red-500">{errors.lastName.message as string}</p>
                    )}

                <div className="mb-2">
                    <label className="mb-1 block font-bold" htmlFor="age">
                        Age:
                    </label>
                    <input
                        className="w-full rounded border border-gray-300 p-2"
                        type="number"
                        {...register("age")}
                    />
                    {errors.age && (
                    <p className="text-red-500">{errors.age.message as string}</p>
                    )}
                </div>

                </div>
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