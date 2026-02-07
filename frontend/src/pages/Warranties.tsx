/**
 * Warranties Page
 * 
 * Main page for managing warranties. Allows users to add new
 * warranties and view their existing warranty records.
 */

import { useState } from 'react';
import { Shield, Plus, Package } from 'lucide-react';
import { PageLayout } from '@/components/layout/PageLayout';
import { WarrantyForm } from '@/components/warranty/WarrantyForm';
import { WarrantyCard } from '@/components/warranty/WarrantyCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { WarrantyResponse } from '@/types';

/**
 * WarrantiesPage is the main warranty management interface.
 */
export default function WarrantiesPage() {
  // Store warranties locally (in a real app, these would come from the API)
  const [warranties, setWarranties] = useState<WarrantyResponse[]>([]);

  /**
   * Handles newly created warranties
   */
  const handleWarrantyCreated = (warranty: WarrantyResponse) => {
    setWarranties((prev) => [warranty, ...prev]);
  };

  return (
    <PageLayout>
      <div className="max-w-5xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Shield className="h-5 w-5 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">
              Warranty Manager
            </h1>
          </div>
          <p className="text-muted-foreground">
            Keep track of your product warranties and never miss an expiration date.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[380px_1fr]">
          {/* Add Warranty Form */}
          <div>
            <Card className="shadow-elevated sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Plus className="h-5 w-5 text-primary" />
                  Add New Warranty
                </CardTitle>
                <CardDescription>
                  Enter your product and warranty details
                </CardDescription>
              </CardHeader>
              <CardContent>
                <WarrantyForm onWarrantyCreated={handleWarrantyCreated} />
              </CardContent>
            </Card>
          </div>

          {/* Warranties List */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground">
                Your Warranties
              </h2>
              {warranties.length > 0 && (
                <span className="text-sm text-muted-foreground">
                  {warranties.length} {warranties.length === 1 ? 'item' : 'items'}
                </span>
              )}
            </div>

            {warranties.length === 0 ? (
              /* Empty State */
              <Card className="card-elevated">
                <CardContent className="py-12 text-center">
                  <div className="flex justify-center mb-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                      <Package className="h-8 w-8 text-muted-foreground" />
                    </div>
                  </div>
                  <h3 className="text-lg font-medium text-foreground mb-2">
                    No warranties yet
                  </h3>
                  <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                    Add your first warranty using the form to start tracking your product coverage.
                  </p>
                </CardContent>
              </Card>
            ) : (
              /* Warranties Grid */
              <div className="space-y-4">
                {warranties.map((warranty, index) => (
                  <WarrantyCard 
                    key={warranty.id || index} 
                    warranty={warranty} 
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
