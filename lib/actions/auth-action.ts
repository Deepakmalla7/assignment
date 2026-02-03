"use server"

import { register, login } from "../api/auth";

export async function handleRegister(formData:any) {
    console.log("handleRegister called with:", formData);
    try{
        const result = await register(formData);
        console.log("Registration result from API:", result);
        
        if(result.success){
            return { 
                success: true, 
                message: "Registration successful",
                data: result.data
            };
        }
        return { 
            success: false, 
            message: result.message || "Registration failed" 
        };
    }catch(err:Error | any){
        console.error('Handle register error:', err);
        return { 
            success: false, 
            message: err.message || "Registration failed" 
        };
    }
}

export async function handleLogin(formData:any) {
    try{
        const result = await login(formData);
        console.log('Login result from API:', result);
        
        if(result.success){
            console.log('Login successful, token:', result.token ? 'exists' : 'missing');
            console.log('User data:', result.newUser);
            
            // Set cookies via API route
            const sessionResponse = await fetch('http://localhost:3000/api/auth/set-session', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    token: result.token,
                    userData: result.newUser
                }),
                credentials: 'include'
            });

            const sessionResult = await sessionResponse.json();
            console.log('Session set result:', sessionResult);

            if (!sessionResult.success) {
                throw new Error('Failed to set session');
            }

            return { 
                success: true, 
                message: "Login successful",
                data: { newUser: result.newUser, token: result.token }
            };
        }
        console.log('Login failed with message:', result.message);
        return { 
            success: false, 
            message: result.message || "Login failed" 
        };
    }catch(err:Error | any){
        console.error('Handle login error:', err);
        return { 
            success: false, 
            message: err.message || "Login failed" 
        };
    }
}
