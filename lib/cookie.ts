"use server"

import { cookies }  from 'next/headers';

export const setAuthToken = async (token: string) => {
    try {
        console.log('setAuthToken called with token:', token ? 'Token exists' : 'No token');
        const cookieStore = await cookies();
        cookieStore.set({
            name: 'auth_token', 
            value: token,
            maxAge: 60 * 60 * 24 * 7, // 7 days
            path: '/',
            sameSite: 'lax',
            httpOnly: false,
            secure: process.env.NODE_ENV === 'production'
        })
        console.log('Auth token cookie set successfully');
    } catch (error) {
        console.error('Error setting auth token:', error);
        throw error;
    }
}

export const getAuthToken = async () => {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('auth_token')?.value;
        console.log('getAuthToken called, token found:', token ? 'Yes' : 'No');
        return token;
    } catch (error) {
        console.error('Error getting auth token:', error);
        return null;
    }
}

export const setUserData = async (userData: any) =>  {
    try {
        console.log('setUserData called with data:', JSON.stringify(userData));
        const cookieStore = await cookies();
        const userDataString = JSON.stringify(userData);
        console.log('User data string length:', userDataString.length);
        
        cookieStore.set(
            { 
                name: 'user_data', 
                value: userDataString,
                maxAge: 60 * 60 * 24 * 7, // 7 days
                path: '/',
                sameSite: 'lax',
                httpOnly: false,
                secure: process.env.NODE_ENV === 'production'
            }
        )
        console.log('User data cookie set successfully');
        
        // Verify it was set
        const verify = cookieStore.get('user_data')?.value;
        console.log('Verification - cookie stored:', verify ? 'Yes' : 'No');
    } catch (error) {
        console.error('Error setting user data:', error);
        throw error;
    }
}

export const getUserData = async () => {
    try {
        console.log('getUserData called');
        const cookieStore = await cookies();
        const userData = cookieStore.get('user_data')?.value;
        console.log('Raw cookie value:', userData ? `Found (${userData.length} chars)` : 'Not found');
        
        if (!userData) {
            console.log('No user_data cookie found');
            return null;
        }
        
        const parsed = JSON.parse(userData);
        console.log('Parsed user data:', parsed);
        return parsed;
    } catch (error) {
        console.error('Error getting user data:', error);
        return null;
    }
}
export const clearAuthCookies = async () => {
    const cookieStore = await cookies();
    cookieStore.delete('auth_token');
    cookieStore.delete('user_data');
}