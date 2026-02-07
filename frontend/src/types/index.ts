/**
 * Type definitions for the Digital Warranty Manager application.
 * These types define the shape of data exchanged with the backend API.
 */

// User registration request payload
export interface RegisterRequest {
  email: string;
  password: string;
}

// User registration response from the API
export interface RegisterResponse {
  message: string;
  user?: {
    id: string;
    email: string;
  };
}

// Warranty creation request payload
export interface WarrantyRequest {
  productName: string;
  purchaseDate: string; // ISO date string (YYYY-MM-DD)
  warrantyMonths: number;
}

// Warranty response from the API
export interface WarrantyResponse {
  id?: string;
  productName: string;
  purchaseDate: string;
  warrantyMonths: number;
  expiryDate: string; // Calculated by the backend
  createdAt?: string;
}

// Generic API error response
export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
}

// API response wrapper for consistent error handling
export interface ApiResponse<T> {
  data: T | null;
  error: ApiError | null;
  success: boolean;
}
