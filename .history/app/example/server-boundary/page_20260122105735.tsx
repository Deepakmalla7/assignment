"use server";
import { exmpleAction } from "@/lib/actions/example-action";

export default async function Page() {
    const result = await exmpleAction();
    return (
        <div>
            loaded page


        </div>
    );
}