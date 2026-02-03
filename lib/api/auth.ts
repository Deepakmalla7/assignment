//AUTHENTICATION API CALLS
import {API} from "./endpoints";
import axios from "./axios";

export const register = async(registrationData:any) =>{
    try{
        const response = await axios.post(API.AUTH.REGISTER, registrationData)
        return response.data;
    }catch(err:Error |any){
        console.error('Registration error:', err);
        throw new Error(err.response?.data.message || err.message || "Registration failed");
    }
}

export const login = async(loginData:any) =>{
    try{
        const response = await axios.post(API.AUTH.LOGIN, loginData);   
        return response.data;
    }catch(err:Error |any){
        console.error('Login error:', err);
        throw new Error(err.response?.data.message || err.message || "Login failed");
    }
}

export const getUserProfile = async(userId: string) =>{
    try{
        const response = await axios.get(`${API.AUTH.GET_PROFILE}/${userId}`);
        return response.data;
    }catch(err:Error |any){
        console.error('Get profile error:', err);
        throw new Error(err.response?.data.message || err.message || "Failed to fetch profile");
    }
}
