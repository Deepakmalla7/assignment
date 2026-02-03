import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(request: NextRequest) {
    try {
        console.log('Test endpoint called');
        const cookieStore = await cookies();
        
        // Set a test cookie
        cookieStore.set({
            name: 'test_cookie',
            value: 'test_value_' + Date.now(),
            maxAge: 60 * 60, // 1 hour
            path: '/',
            sameSite: 'lax',
            httpOnly: false,
            secure: false
        });

        console.log('Test cookie set');
        
        // Try to read existing cookies
        const authToken = cookieStore.get('auth_token')?.value;
        const userData = cookieStore.get('user_data')?.value;
        const testCookie = cookieStore.get('test_cookie')?.value;
        
        console.log('Existing cookies:', { authToken: !!authToken, userData: !!userData, testCookie });

        return NextResponse.json({ 
            success: true,
            message: 'Test cookie set',
            cookies: {
                auth_token: authToken ? 'exists' : 'missing',
                user_data: userData ? 'exists' : 'missing', 
                test_cookie: testCookie ? 'exists' : 'missing'
            }
        });
    } catch (error: any) {
        console.error('Test endpoint error:', error);
        return NextResponse.json(
            { success: false, message: error.message },
            { status: 500 }
        );
    }
}