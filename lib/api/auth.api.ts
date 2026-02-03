// Auth API Layer
import apiClient from './client';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data?: {
    user: any;
    token?: string;
  };
}

/**
 * Auth API calls
 */
export const authApi = {
  /**
   * Login user
   */
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    return apiClient.post('/auth/login', credentials);
  },

  /**
   * Register new user
   */
  register: async (data: RegisterData): Promise<AuthResponse> => {
    return apiClient.post('/auth/register', data);
  },

  /**
   * Logout user
   */
  logout: async (): Promise<AuthResponse> => {
    return apiClient.post('/auth/logout');
  },

  /**
   * Get current user profile
   */
  getCurrentUser: async (): Promise<AuthResponse> => {
    return apiClient.get('/auth/me');
  },

  /**
   * Refresh token
   */
  refreshToken: async (): Promise<AuthResponse> => {
    return apiClient.post('/auth/refresh');
  },
};

export default authApi;
