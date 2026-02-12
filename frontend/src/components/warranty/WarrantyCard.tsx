/**
 * WarrantyCard Component
 * 
 * Displays a single warranty record with status indication
 * and key information.
 */

import { Package, Calendar, Clock, CheckCircle2, AlertTriangle, XCircle, Hash } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { WarrantyResponse } from '@/types';
import { getWarrantyStatus, formatDate } from '@/services/warrantyService';
import { cn } from '@/lib/utils';

interface WarrantyCardProps {
  warranty: WarrantyResponse;
}

/**
 * WarrantyCard displays warranty information with visual status indicators.
 */
export function WarrantyCard({ warranty }: WarrantyCardProps) {
  const status = getWarrantyStatus(warranty.expiryDate);

  const statusStyles = {
    active: {
      badge: 'badge-success',
      icon: <CheckCircle2 className="h-4 w-4" />,
      label: 'Active',
    },
    expiring: {
      badge: 'badge-warning',
      icon: <AlertTriangle className="h-4 w-4" />,
      label: 'Expiring Soon',
    },
    expired: {
      badge: 'badge-destructive',
      icon: <XCircle className="h-4 w-4" />,
      label: 'Expired',
    },
  };

  const currentStatus = statusStyles[status.status];

  return (
    <Card className={cn(
      "card-elevated transition-all hover:shadow-elevated animate-fade-in",
      status.status === 'expired' && "opacity-70"
    )}>
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-4">
          {/* Product Info */}
          <div className="flex items-start gap-4 flex-1 min-w-0">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 flex-shrink-0">
              <Package className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-foreground truncate">
                {warranty.productName}
              </h3>
              <p className="text-sm text-muted-foreground mt-0.5">
                {warranty.warrantyMonths} month warranty
              </p>
              <p className="text-sm text-muted-foreground mt-0.5 flex items-center gap-1">
                <Hash className="h-3.5 w-3.5" />
                Serial: {warranty.serialNumber || 'N/A'}
              </p>
            </div>
          </div>

          {/* Status Badge */}
          <div className={currentStatus.badge}>
            {currentStatus.icon}
            <span className="ml-1">{currentStatus.label}</span>
          </div>
        </div>

        {/* Dates */}
        <div className="mt-4 pt-4 border-t border-border grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <div>
              <span className="text-muted-foreground">Purchased: </span>
              <span className="text-foreground font-medium">
                {formatDate(warranty.purchaseDate)}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <div>
              <span className="text-muted-foreground">Expires: </span>
              <span className={cn(
                "font-medium",
                status.status === 'active' && "text-success",
                status.status === 'expiring' && "text-warning",
                status.status === 'expired' && "text-destructive"
              )}>
                {formatDate(warranty.expiryDate)}
              </span>
            </div>
          </div>
        </div>

        {/* Days remaining */}
        <p className="text-xs text-muted-foreground mt-3">
          {status.message}
        </p>
      </CardContent>
    </Card>
  );
}
