/**
 * Alert Component
 * 
 * Displays success, error, or informational messages
 * with appropriate styling and icons.
 */

import { ReactNode } from 'react';
import { AlertCircle, CheckCircle2, Info, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

type AlertType = 'success' | 'error' | 'warning' | 'info';

interface AlertMessageProps {
  /** Type of alert determining styling and icon */
  type: AlertType;
  /** Alert title (optional) */
  title?: string;
  /** Alert message content */
  children: ReactNode;
  /** Additional CSS classes */
  className?: string;
}

const alertStyles: Record<AlertType, string> = {
  success: 'bg-success/10 border-success/20 text-success',
  error: 'bg-destructive/10 border-destructive/20 text-destructive',
  warning: 'bg-warning/10 border-warning/20 text-warning',
  info: 'bg-primary/10 border-primary/20 text-primary',
};

const alertIcons: Record<AlertType, ReactNode> = {
  success: <CheckCircle2 className="h-5 w-5" />,
  error: <XCircle className="h-5 w-5" />,
  warning: <AlertCircle className="h-5 w-5" />,
  info: <Info className="h-5 w-5" />,
};

/**
 * AlertMessage displays feedback messages with consistent styling.
 * 
 * @example
 * <AlertMessage type="success" title="Success!">
 *   Your account has been created successfully.
 * </AlertMessage>
 */
export function AlertMessage({ type, title, children, className }: AlertMessageProps) {
  return (
    <div
      role="alert"
      className={cn(
        "flex gap-3 rounded-lg border p-4 animate-fade-in",
        alertStyles[type],
        className
      )}
    >
      <div className="flex-shrink-0 mt-0.5">
        {alertIcons[type]}
      </div>
      <div className="flex-1">
        {title && (
          <h4 className="font-medium mb-1">{title}</h4>
        )}
        <p className="text-sm opacity-90">{children}</p>
      </div>
    </div>
  );
}
