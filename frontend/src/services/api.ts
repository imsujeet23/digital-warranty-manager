/**
 * API Configuration and Base Utilities
 * 
 * This module provides the base configuration for API communication
 * and utility functions for making HTTP requests.
 */

import { ApiResponse, ApiError } from '@/types';

// Base URL for the backend API
// In production, this would come from environment variables
const API_BASE_URL = '/api';

/**
 * Custom error class for API-related errors
 */
export class ApiRequestError extends Error {
  public statusCode: number;
  public errors?: Record<string, string[]>;

  constructor(message: string, statusCode: number, errors?: Record<string, string[]>) {
    super(message);
    this.name = 'ApiRequestError';
    this.statusCode = statusCode;
    this.errors = errors;
  }
}

/**
 * Makes an HTTP request to the API
 * 
 * @param endpoint - The API endpoint (relative to base URL)
 * @param options - Fetch options (method, headers, body, etc.)
 * @returns Promise with the parsed JSON response
 */
async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const url = `${API_BASE_URL}${endpoint}`;

  // Default headers for JSON communication
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  const currentUserEmail = localStorage.getItem('currentUserEmail');
  if (currentUserEmail) {
    headers['x-user-email'] = currentUserEmail;
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    // Parse the response body
    const data = await response.json().catch(() => null);

    // Handle non-2xx responses
    if (!response.ok) {
      const errorMessage = data?.message || `Request failed with status ${response.status}`;
      return {
        data: null,
        error: {
          message: errorMessage,
          errors: data?.errors,
        },
        success: false,
      };
    }

return {
  data: (data && typeof data === "object" && "data" in data)
    ? data.data
    : data ?? ({} as T),
  error: null,
  success: true,
};


  } catch (error) {
    // Handle network errors or other exceptions
    const errorMessage = error instanceof Error 
      ? error.message 
      : 'An unexpected error occurred';

    return {
      data: null,
      error: {
        message: errorMessage,
      },
      success: false,
    };
  }
}

/**
 * HTTP GET request
 */
export async function get<T>(endpoint: string): Promise<ApiResponse<T>> {
  return request<T>(endpoint, { method: 'GET' });
}

/**
 * HTTP POST request
 */
export async function post<T>(
  endpoint: string,
  body: unknown
): Promise<ApiResponse<T>> {
  return request<T>(endpoint, {
    method: 'POST',
    body: JSON.stringify(body),
  });
}

/**
 * HTTP PUT request
 */
export async function put<T>(
  endpoint: string,
  body: unknown
): Promise<ApiResponse<T>> {
  return request<T>(endpoint, {
    method: 'PUT',
    body: JSON.stringify(body),
  });
}

/**
 * HTTP DELETE request
 */
export async function del<T>(endpoint: string): Promise<ApiResponse<T>> {
  return request<T>(endpoint, { method: 'DELETE' });
}
