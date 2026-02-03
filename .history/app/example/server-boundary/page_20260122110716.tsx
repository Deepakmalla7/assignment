"use server";
import { exmpleAction } from "@/lib/actions/example-action";
import { notFound } from "next/navigation";
import { th } from "zod/locales";

export default async function Page() {
    const result = await exmpleAction();

    if(result.success){
        throw new Error("Failed to load data");
    }

    return (
        <div>
            loaded page
        </div>
    );
}