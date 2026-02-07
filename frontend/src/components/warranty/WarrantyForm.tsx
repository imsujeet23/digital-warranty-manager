/**
 * WarrantyForm Component
 * 
 * Form for creating new warranty records with validation.
 */

import { useState, FormEvent, forwardRef } from 'react';
import { Plus } from 'lucide-react';
import { FormInput } from '@/components/forms/FormInput';
import { LoadingButton } from '@/components/forms/LoadingButton';
import { AlertMessage } from '@/components/feedback/AlertMessage';
import { Label } from '@/components/ui/label';
import { createWarranty, validateWarrantyInput } from '@/services/warrantyService';
import { WarrantyResponse } from '@/types';

interface WarrantyFormProps {
  /** Callback when a warranty is successfully created */
  onWarrantyCreated: (warranty: WarrantyResponse) => void;
}

/**
 * WarrantyForm handles warranty creation with validation.
 */
export const WarrantyForm = forwardRef<HTMLFormElement, WarrantyFormProps>(
  function WarrantyForm({ onWarrantyCreated }, ref) {
    // Form state
    const [productName, setProductName] = useState('');
    const [purchaseDate, setPurchaseDate] = useState('');
    const [warrantyMonths, setWarrantyMonths] = useState('');

    // UI state
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [apiError, setApiError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    /**
     * Resets the form to initial state
     */
    const resetForm = () => {
      setProductName('');
      setPurchaseDate('');
      setWarrantyMonths('');
      setErrors({});
    };

    /**
     * Handles form submission
     */
    const handleSubmit = async (e: FormEvent) => {
      e.preventDefault();
      setApiError(null);
      setSuccess(null);

      // Validate input
      const monthsNum = parseInt(warrantyMonths, 10) || 0;
      const validation = validateWarrantyInput(productName, purchaseDate, monthsNum);

      if (!validation.isValid) {
        setErrors(validation.errors);
        return;
      }

      setErrors({});
      setIsLoading(true);

      try {
        const result = await createWarranty(productName.trim(), purchaseDate, monthsNum);

        if (result.success && result.data) {
          setSuccess(`Warranty for "${productName}" created successfully!`);
          onWarrantyCreated(result.data);
          resetForm();
          
          // Clear success message after 5 seconds
          setTimeout(() => setSuccess(null), 5000);
        } else {
          setApiError(result.error?.message || 'Failed to create warranty. Please try again.');
        }
      } catch (error) {
        setApiError('An unexpected error occurred. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    // Get today's date for max date validation
    const today = new Date().toISOString().split('T')[0];

    return (
      <form ref={ref} onSubmit={handleSubmit} className="space-y-5">
        {/* Success Message */}
        {success && (
          <AlertMessage type="success">
            {success}
          </AlertMessage>
        )}

        {/* Error Message */}
        {apiError && (
          <AlertMessage type="error">
            {apiError}
          </AlertMessage>
        )}

        {/* Product Name */}
        <FormInput
          id="productName"
          label="Product Name"
          type="text"
          placeholder="e.g., MacBook Pro 14-inch"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          error={errors.productName}
          disabled={isLoading}
          maxLength={100}
        />

        {/* Purchase Date */}
        <div className="form-field">
          <Label htmlFor="purchaseDate" className="form-label">
            Purchase Date
          </Label>
          <input
            id="purchaseDate"
            type="date"
            value={purchaseDate}
            onChange={(e) => setPurchaseDate(e.target.value)}
            max={today}
            disabled={isLoading}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
          {errors.purchaseDate && (
            <p className="form-error" role="alert">{errors.purchaseDate}</p>
          )}
        </div>

        {/* Warranty Duration */}
        <FormInput
          id="warrantyMonths"
          label="Warranty Duration (months)"
          type="number"
          placeholder="e.g., 24"
          value={warrantyMonths}
          onChange={(e) => setWarrantyMonths(e.target.value)}
          error={errors.warrantyMonths}
          helperText="Enter the warranty period in months"
          disabled={isLoading}
          min={1}
          max={120}
        />

        {/* Submit Button */}
        <LoadingButton
          type="submit"
          className="w-full"
          isLoading={isLoading}
          loadingText="Creating Warranty..."
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Warranty
        </LoadingButton>
      </form>
    );
  }
);
