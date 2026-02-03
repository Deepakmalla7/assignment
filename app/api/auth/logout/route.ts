import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
    try {
        // Get all cookies and clear them
        const cookieStore = await cookies();
        
        // Delete auth-related cookies
        cookieStore.delete('auth_token');
        cookieStore.delete('user_data');
        cookieStore.delete('session_data');

        console.log('User logged out successfully');

        return NextResponse.json({ 
            success: true, 
            message: 'Logged out successfully'
        });
    } catch (error: any) {
        console.error('Logout API error:', error);
        return NextResponse.json(
            { 
                success: false, 
                message: error.message || 'Logout failed' 
            },
            { status: 500 }
        );
    }
}
