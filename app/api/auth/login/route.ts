import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import axios from 'axios';

const BACKEND_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { email, password, rememberMe } = body;

        console.log('Login API: Calling backend at', `${BACKEND_URL}/api/auth/login`);

        // Call backend login API
        const backendResponse = await axios.post(`${BACKEND_URL}/api/auth/login`, {
            email,
            password
        });

        console.log('Backend response:', backendResponse.data);
        const { success, token, newUser, message } = backendResponse.data;

        if (!success || !token || !newUser) {
            console.error('Login failed:', message);
            return NextResponse.json(
                { success: false, message: message || 'Login failed' },
                { status: 401 }
            );
        }

        console.log('Setting cookies for user:', newUser.email);
        
        // Set cookies
        const cookieStore = await cookies();
        
        const maxAge = rememberMe ? 60 * 60 * 24 * 30 : 60 * 60 * 24; // 30 days or 1 day
        
        cookieStore.set({
            name: 'auth_token',
            value: token,
            maxAge,
            path: '/',
            sameSite: 'lax',
            httpOnly: false,
            secure: process.env.NODE_ENV === 'production'
        });

        cookieStore.set({
            name: 'user_data',
            value: JSON.stringify(newUser),
            maxAge,
            path: '/',
            sameSite: 'lax',
            httpOnly: false,
            secure: process.env.NODE_ENV === 'production'
        });

        // Set session_data cookie for middleware
        cookieStore.set({
            name: 'session_data',
            value: JSON.stringify({ role: newUser.role || 'user', userId: newUser.id }),
            maxAge,
            path: '/',
            sameSite: 'lax',
            httpOnly: false,
            secure: process.env.NODE_ENV === 'production'
        });

        console.log('Cookies set successfully');

        return NextResponse.json({ 
            success: true, 
            message: 'Login successful',
            data: { newUser, token }
        });
    } catch (error: any) {
        console.error('Login API error:', error);
        return NextResponse.json(
            { 
                success: false, 
                message: error.response?.data?.message || error.message || 'Login failed' 
            },
            { status: error.response?.status || 500 }
        );
    }
}
