"use server"

import { cookies } from 'next/headers';
import { getUserProfile } from "@/lib/api/auth";

export async function getCookieUserData() {
    try {
        console.log('Fetching user data from cookies...');
        
        const cookieStore = await cookies();
        const userDataString = cookieStore.get('user_data')?.value;
        
        console.log('Cookie found:', userDataString ? 'Yes' : 'No');

        if (!userDataString) {
            return {
                success: false,
                message: "User data not found in cookies"
            };
        }

        const userData = JSON.parse(userDataString);
        console.log('Retrieved user data:', userData);

        if (userData?.id) {
            try {
                const profileResult = await getUserProfile(userData.id);
                if (profileResult?.success && profileResult?.data) {
                    return {
                        success: true,
                        data: { ...userData, ...profileResult.data }
                    };
                }
            } catch (profileError: any) {
                console.error('Failed to refresh profile from API:', profileError);
            }
        }

        return {
            success: true,
            data: userData
        };
    } catch (error: any) {
        console.error("Error fetching user data from cookie:", error);
        return {
            success: false,
            message: error.message || "Failed to fetch user data"
        };
    }
}
