"use client"

import { useState, useTransition } from "react";
import { loginAction } from "./actions/login";

export default function RedirectServer() {
    const [username,setUsername] = useState("")
    const [isPending,setTransition] = useTransition();
    const handleSubmit =async() =>{
        //using the action login.ts with transition to simulate loading
        setTransition(async() =>{
            // Simulate loading delay for 3 seconds to see the loading effect
            await new Promise(resolve => setTimeout(resolve, 3000));
            
            const response =await loginAction(username);
            if(response?.error){
                alert(`Login failed: ${response.error}`);
            } else {
                alert("Login successful!");
            }
        });
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
            disabled={isPending}
         className="m-4 w-full rounded-md bg-green-500 px-3 py-2 text-black hover:bg-green-600"
            >
                {isPending ? "Loading..." : "Submit"}
            </button>
        </div>
    );
}