"use client"

import { useForm } from "react-hook-form";
import umm from "../../assets/images/umm.jpg"
import Image from "next/image";
export default function ReactHookForm() {
    const {
        register,
        handleSubmit,
        formState: { errors,isSubmitting },

    }= useForm(
        {values:{"email":"","password"  :""}}

    );

    const onSubmit =async(data:any)=>{
        alert(data.email);
    }
    return (
        <div>
            <div className="mb-2">
            <Image 
            src={umm} alt ="umm" width={300} height={300}/>
            </div>
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
                        {...register("email",{required:"EMail is required"})}
                    />
                    {errors.email && (
                    <p className="text-red-500">{errors.email.message as string}</p>
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