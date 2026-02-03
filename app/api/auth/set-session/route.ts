import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { token, userData } = body;

        if (!token || !userData) {
            return NextResponse.json(
                { success: false, message: 'Token and userData are required' },
                { status: 400 }
            );
        }

        const cookieStore = await cookies();
        
        // Set auth token cookie
        cookieStore.set({
            name: 'auth_token',
            value: token,
            maxAge: 60 * 60 * 24 * 7, // 7 days
            path: '/',
            sameSite: 'lax',
            httpOnly: false,
            secure: process.env.NODE_ENV === 'production'
        });

        // Set user data cookie
        cookieStore.set({
            name: 'user_data',
            value: JSON.stringify(userData),
            maxAge: 60 * 60 * 24 * 7, // 7 days
            path: '/',
            sameSite: 'lax',
            httpOnly: false,
            secure: process.env.NODE_ENV === 'production'
        });

        return NextResponse.json({ 
            success: true, 
            message: 'Session set successfully' 
        });
    } catch (error: any) {
        console.error('Error setting session:', error);
        return NextResponse.json(
            { success: false, message: error.message || 'Failed to set session' },
            { status: 500 }
        );
    }
}
