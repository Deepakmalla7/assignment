"use server"

import { ca } from "zod/locales";
import { login, register } from "../api/auth";


export async function handleRegister(formData:any) {
    try{
        const result = await register(formData);
        if(result.success){
            return { success: true, message: "Registration successful" ,
                data: result.data
            };
        }
        return { success: false, message: result.message || "Registration failed" };
    }catch(err:Error | any){
        return { success: false, message: err.message || "Registration failed" };
    }

    
}

export async function handleLogin(formData:any) {
    try{
        const result = await login(formData);
        if(result.success){
            return { success: true, message: "Login successful" ,
                data: result.data
            };
        }
        return { success: false, message: result.message || "Login failed" };
    }catch(err:Error | any){
        return { success: false, message: err.message || "Login failed" };
    }
}
