/**
 * Warranty Service
 * 
 * Handles all warranty-related API calls including
 * creating, retrieving, and managing product warranties.
 */

import { post, get } from './api';
import { WarrantyRequest, WarrantyResponse, ApiResponse } from '@/types';

/**
 * Creates a new warranty record
 * 
 * @param productName - Name of the product
 * @param purchaseDate - Date of purchase (ISO format: YYYY-MM-DD)
 * @param warrantyMonths - Duration of warranty in months
 * @returns Promise with the created warranty including calculated expiry date
 * 
 * @example
 * const result = await createWarranty('MacBook Pro', '2024-01-15', 24);
 * if (result.success) {
 *   console.log('Warranty expires on:', result.data.expiryDate);
 * }
 */
export async function createWarranty(
  productName: string,
  purchaseDate: string,
  warrantyMonths: number
): Promise<ApiResponse<WarrantyResponse>> {
  const payload: WarrantyRequest = {
    productName,
    purchaseDate,
    warrantyMonths,
  };

  return post<WarrantyResponse>('/warranties', payload);
}

/**
 * Retrieves all warranties (if the API supports it)
 * 
 * @returns Promise with an array of warranty records
 */
export async function getWarranties(): Promise<ApiResponse<WarrantyResponse[]>> {
  return get<WarrantyResponse[]>('/warranties');
}

/**
 * Validates warranty input data
 * 
 * @param productName - Product name to validate
 * @param purchaseDate - Purchase date to validate
 * @param warrantyMonths - Warranty duration to validate
 * @returns Object with validation result and any error messages
 */
export function validateWarrantyInput(
  productName: string,
  purchaseDate: string,
  warrantyMonths: number
): { isValid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  // Validate product name
  if (!productName || productName.trim().length === 0) {
    errors.productName = 'Product name is required';
  } else if (productName.trim().length < 2) {
    errors.productName = 'Product name must be at least 2 characters';
  } else if (productName.trim().length > 100) {
    errors.productName = 'Product name must be less than 100 characters';
  }

  // Validate purchase date
  if (!purchaseDate) {
    errors.purchaseDate = 'Purchase date is required';
  } else {
    const date = new Date(purchaseDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (isNaN(date.getTime())) {
      errors.purchaseDate = 'Invalid date format';
    } else if (date > today) {
      errors.purchaseDate = 'Purchase date cannot be in the future';
    }
  }

  // Validate warranty months
  if (!warrantyMonths || warrantyMonths <= 0) {
    errors.warrantyMonths = 'Warranty duration must be greater than 0';
  } else if (warrantyMonths > 120) {
    errors.warrantyMonths = 'Warranty duration cannot exceed 120 months';
  } else if (!Number.isInteger(warrantyMonths)) {
    errors.warrantyMonths = 'Warranty duration must be a whole number';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Calculates warranty status based on expiry date
 * 
 * @param expiryDate - Warranty expiration date
 * @returns Status object with type and message
 */
export function getWarrantyStatus(expiryDate: string): {
  status: 'active' | 'expiring' | 'expired';
  message: string;
  daysRemaining: number;
} {
  const expiry = new Date(expiryDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  expiry.setHours(0, 0, 0, 0);

  const diffTime = expiry.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) {
    return {
      status: 'expired',
      message: `Expired ${Math.abs(diffDays)} days ago`,
      daysRemaining: diffDays,
    };
  } else if (diffDays <= 30) {
    return {
      status: 'expiring',
      message: `Expires in ${diffDays} days`,
      daysRemaining: diffDays,
    };
  } else {
    return {
      status: 'active',
      message: `${diffDays} days remaining`,
      daysRemaining: diffDays,
    };
  }
}

/**
 * Formats a date string for display
 * 
 * @param dateString - ISO date string
 * @returns Formatted date string
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
