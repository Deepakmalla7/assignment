import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(request: NextRequest) {
    try {
        const cookieStore = await cookies();
        
        const authToken = cookieStore.get('auth_token')?.value;
        const userDataString = cookieStore.get('user_data')?.value;

        if (!authToken || !userDataString) {
            return NextResponse.json(
                { success: false, message: 'No session found' },
                { status: 404 }
            );
        }

        const userData = JSON.parse(userDataString);

        return NextResponse.json({ 
            success: true, 
            data: {
                token: authToken,
                user: userData
            }
        });
    } catch (error: any) {
        console.error('Error getting session:', error);
        return NextResponse.json(
            { success: false, message: error.message || 'Failed to get session' },
            { status: 500 }
        );
    }
}
