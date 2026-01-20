"use server";
import { redirect } from "next/navigation";

export async function orderStatus(status:string) {
    if(!status){
        return {error:"Status is required"}
    }
    // Simulate loading for 3 seconds to see the loading effect
    await new Promise((resolve) => setTimeout(resolve, 3000));
    if(!status){
       alert("Status is required");
       return;
    }
    if(status.toLowerCase()=="active"){
        redirect("/example/orders/success")
    }else{
        redirect("/example/orders/unauthorized")
    }
    
}