"use server";
import { redirect } from "next/navigation";

export async function loginAction(username:string) {
    if(!username){
        return {error:"Username is required"}
    }
    // Simulate loading for 3 seconds to see the loading effect
    await new Promise((resolve) => setTimeout(resolve, 3000));
    if(username =="admin"){
        redirect("/example/hook-example")
    }else{
        redirect("/example/state")
    }
    
}