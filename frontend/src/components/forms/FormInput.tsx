/**
 * FormInput Component
 * 
 * A reusable form input component with label, error handling,
 * and consistent styling across the application.
 */

import { forwardRef, InputHTMLAttributes } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Unique identifier for the input */
  id: string;
  /** Label text displayed above the input */
  label: string;
  /** Error message to display (if any) */
  error?: string;
  /** Helper text displayed below the input */
  helperText?: string;
}

/**
 * FormInput provides a styled input field with label and error handling.
 * 
 * @example
 * <FormInput
 *   id="email"
 *   label="Email Address"
 *   type="email"
 *   error={errors.email}
 *   {...register('email')}
 * />
 */
export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ id, label, error, helperText, className, ...props }, ref) => {
    return (
      <div className="form-field">
        <Label 
          htmlFor={id} 
          className={cn(
            "form-label",
            error && "text-destructive"
          )}
        >
          {label}
        </Label>
        
        <Input
          id={id}
          ref={ref}
          className={cn(
            "transition-colors",
            error && "border-destructive focus-visible:ring-destructive",
            className
          )}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : helperText ? `${id}-helper` : undefined}
          {...props}
        />
        
        {error && (
          <p id={`${id}-error`} className="form-error" role="alert">
            {error}
          </p>
        )}
        
        {helperText && !error && (
          <p id={`${id}-helper`} className="form-description">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

FormInput.displayName = 'FormInput';
