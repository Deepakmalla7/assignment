/**
 * Authentication Types
 * Data structures for auth operations
 */

export interface RegisterFormData {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface LoginFormData {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  token?: string;
  user?: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    username: string;
  };
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  age?: number;
  event?: string;
  gender?: string;
}
