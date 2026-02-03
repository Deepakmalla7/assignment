"use server"

import { cookies } from 'next/headers';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

export async function deleteUserAccountAction(userId: string) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('auth_token')?.value;

        if (!token) {
            return {
                success: false,
                message: "Authentication token not found"
            };
        }

        console.log('Deleting user with ID:', userId);
        console.log('API URL:', `${API_BASE_URL}/api/users/${userId}`);

        const response = await fetch(`${API_BASE_URL}/api/users/${userId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        console.log('Response status:', response.status);
        console.log('Response headers:', response.headers);

        const contentType = response.headers.get('content-type');
        let data;

        if (contentType && contentType.includes('application/json')) {
            data = await response.json();
        } else {
            const text = await response.text();
            console.error('Non-JSON response:', text.substring(0, 200));
            data = { message: 'Invalid response from server' };
        }

        console.log('Response data:', data);

        if (!response.ok) {
            return {
                success: false,
                message: data.message || `Failed to delete account (Status: ${response.status})`
            };
        }

        // Clear cookies after successful deletion
        const cookies_instance = await cookies();
        cookies_instance.delete('auth_token');
        cookies_instance.delete('user_data');

        return {
            success: true,
            message: data.message || "Account deleted successfully"
        };
    } catch (error: any) {
        console.error("Error deleting account:", error);
        return {
            success: false,
            message: error.message || "Failed to delete account"
        };
    }
}

