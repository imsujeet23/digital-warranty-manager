/**
 * Authentication Service
 * 
 * Handles all authentication-related API calls including
 * user registration and login operations.
 */

import { post } from './api';
import { RegisterRequest, RegisterResponse, ApiResponse } from '@/types';

/**
 * Registers a new user account
 * 
 * @param email - User's email address
 * @param password - User's chosen password
 * @returns Promise with the registration response
 * 
 * @example
 * const result = await registerUser('user@example.com', 'securePassword123');
 * if (result.success) {
 *   console.log('Registration successful:', result.data);
 * } else {
 *   console.error('Registration failed:', result.error);
 * }
 */
export async function registerUser(
  email: string,
  password: string
): Promise<ApiResponse<RegisterResponse>> {
  const payload: RegisterRequest = { email, password };
  return post<RegisterResponse>('/auth/register', payload);
}

/**
 * Validates an email address format
 * 
 * @param email - Email address to validate
 * @returns true if the email format is valid
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validates password strength
 * 
 * @param password - Password to validate
 * @returns Object with validation result and message
 */
export function validatePassword(password: string): { 
  isValid: boolean; 
  message: string 
} {
  if (password.length < 8) {
    return {
      isValid: false,
      message: 'Password must be at least 8 characters long',
    };
  }

  if (!/[A-Z]/.test(password)) {
    return {
      isValid: false,
      message: 'Password must contain at least one uppercase letter',
    };
  }

  if (!/[a-z]/.test(password)) {
    return {
      isValid: false,
      message: 'Password must contain at least one lowercase letter',
    };
  }

  if (!/[0-9]/.test(password)) {
    return {
      isValid: false,
      message: 'Password must contain at least one number',
    };
  }

  return {
    isValid: true,
    message: 'Password meets requirements',
  };
}
