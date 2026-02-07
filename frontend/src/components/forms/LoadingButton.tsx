/**
 * LoadingButton Component
 * 
 * A button component that shows a loading state with spinner
 * and disables interaction during loading.
 */

import { ButtonHTMLAttributes, forwardRef } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LoadingButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Whether the button is in a loading state */
  isLoading?: boolean;
  /** Text to display while loading (optional) */
  loadingText?: string;
  /** Button variant */
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  /** Button size */
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

/**
 * LoadingButton extends the base Button with loading state support.
 * 
 * @example
 * <LoadingButton 
 *   isLoading={isSubmitting}
 *   loadingText="Creating account..."
 * >
 *   Register
 * </LoadingButton>
 */
export const LoadingButton = forwardRef<HTMLButtonElement, LoadingButtonProps>(
  ({ 
    isLoading = false, 
    loadingText, 
    children, 
    disabled, 
    className,
    variant = 'default',
    size = 'default',
    ...props 
  }, ref) => {
    return (
      <Button
        ref={ref}
        disabled={isLoading || disabled}
        variant={variant}
        size={size}
        className={cn("relative", className)}
        {...props}
      >
        {isLoading && (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        )}
        {isLoading && loadingText ? loadingText : children}
      </Button>
    );
  }
);

LoadingButton.displayName = 'LoadingButton';
