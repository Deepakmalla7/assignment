"use client"

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RedirectClient() {
    const router = useRouter();
    const [username,setUsername] = useState("")
    const handleSubmit =() =>{
        if(username =="admin"){
            router.push("/example/hook-example")
        }else{
            router.push("/example/state")

        }
    }

 
    return (
        <div className="bg-white text-black mx-auto max-w-md p-10">
            <label>Username</label>
            <input
            className="ml-5 border-2 h-10"
            onChange={(e)=> setUsername(e.target.value)}
            ></input>
            <button
            onClick={handleSubmit}
         className="m-4 w-full rounded-md bg-green-500 px-3 py-2 text-black hover:bg-green-600"
            >
                Submit
            </button>
        </div>
    );
}