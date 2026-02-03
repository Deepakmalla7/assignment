"use server";
import { exmpleAction } from "@/lib/actions/example-action";

export default async function Page() {
    const result = await exmpleAction();
    if(result.success){
        console.log(result.message);
    }
    return (
        <div>
            loaded page
        </div>
    );
}