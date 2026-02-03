import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import axios from 'axios';

const BACKEND_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { firstName, lastName, username, email, password, confirmPassword } = body;

        console.log('Register API: Calling backend at', `${BACKEND_URL}/api/auth/register`);

        // Call backend register API
        const backendResponse = await axios.post(`${BACKEND_URL}/api/auth/register`, {
            firstName,
            lastName,
            username,
            email,
            password,
            confirmPassword
        });

        console.log('Backend response:', backendResponse.data);
        const { success, token, newUser, message } = backendResponse.data;

        if (!success) {
            console.error('Registration failed:', message);
            return NextResponse.json(
                { success: false, message: message || 'Registration failed' },
                { status: 400 }
            );
        }

        // If registration successful and token provided, set cookies (auto-login)
        if (token && newUser) {
            console.log('Setting cookies for newly registered user:', newUser.email);
            
            const cookieStore = await cookies();
            const maxAge = 60 * 60 * 24; // 1 day
            
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

            cookieStore.set({
                name: 'session_data',
                value: JSON.stringify({ role: newUser.role || 'user', userId: newUser.id }),
                maxAge,
                path: '/',
                sameSite: 'lax',
                httpOnly: false,
                secure: process.env.NODE_ENV === 'production'
            });

            console.log('Cookies set successfully for new user');
        }

        return NextResponse.json({ 
            success: true, 
            message: message || 'Registration successful',
            data: { newUser, token }
        });
    } catch (error: any) {
        console.error('Register API error:', error);
        
        // Extract error message from axios error
        const errorMessage = error.response?.data?.message || error.message || 'Registration failed';
        
        return NextResponse.json(
            { 
                success: false, 
                message: errorMessage
            },
            { status: error.response?.status || 500 }
        );
    }
}
