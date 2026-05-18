'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useConfiguratorStore } from '@/stores/useConfiguratorStore';
import { formatPrice } from '@/components/catalog/catalogData';
import { Check, ShoppingCart, Package, Monitor, Armchair, Box } from 'lucide-react';

interface SummaryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  table: Box,
  chair: Armchair,
  monitor: Monitor,
  decorative: Package,
  shelf: Box,
};

export function SummaryModal({ open, onOpenChange }: SummaryModalProps) {
  const { getTotalPrice, getSelectedItems } = useConfiguratorStore();
  const [isConfirmed, setIsConfirmed] = useState(false);

  const totalPrice = getTotalPrice();
  const selectedItems = getSelectedItems();
  const hasItems = selectedItems.length > 0;

  const handleConfirm = () => {
    setIsConfirmed(true);
  };

  const handleClose = () => {
    setIsConfirmed(false);
    onOpenChange(false);
  };

  // Group items by category for display
  const itemsByCategory = selectedItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, typeof selectedItems>);

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl w-[90vw] max-h-[90vh] overflow-hidden flex flex-col">
        {isConfirmed ? (
          // Success state
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-20 h-20 rounded-full bg-success-bg flex items-center justify-center mb-6">
              <Check className="w-10 h-10 text-success" />
            </div>
            <DialogTitle className="text-2xl font-bold text-fg mb-2">
              Rent Completed!
            </DialogTitle>
            <DialogDescription className="text-fg-secondary mb-6 max-w-sm">
              Your workspace configuration has been saved. Wait for shipping details to be sent to your email.
            </DialogDescription>
            <div className="flex gap-3">
              <Button variant="outline" onClick={handleClose}>
                Close
              </Button>
              <Button onClick={handleClose}>
                Done
              </Button>
            </div>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold text-fg">
                Workspace Summary
              </DialogTitle>
              <DialogDescription className="text-fg-secondary">
                Review your selected items and confirm your rental
              </DialogDescription>
            </DialogHeader>

            {/* 3D Preview - showcase view with description */}
            <div className="relative h-48 bg-black rounded-lg overflow-hidden mb-4">
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Simple animated gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800" />
                <div className="relative z-10 text-center">
                  <Package className="w-16 h-16 text-gray-600 mx-auto mb-2" />
                  <p className="text-gray-500 text-sm">Your 3D Workspace</p>
                  <p className="text-gray-600 text-xs mt-1">Check the main viewport for full preview</p>
                </div>
              </div>
              <div className="absolute bottom-2 left-2 text-xs text-gray-400">
                Preview
              </div>
            </div>

            {/* Items List */}
            <div className="flex-1 overflow-y-auto max-h-[300px]">
              {hasItems ? (
                <div className="space-y-4">
                  {Object.entries(itemsByCategory).map(([category, items]) => {
                    const IconComponent = categoryIcons[category] || Package;
                    return (
                      <div key={category}>
                        <h4 className="text-sm font-medium text-fg-secondary mb-2 capitalize">
                          {category}{items.length > 1 ? 's' : ''}
                        </h4>
                        <div className="space-y-2">
                          {items.map((item) => (
                            <div
                              key={item.id}
                              className="flex items-center justify-between bg-bg border border-border rounded-lg px-3 py-2"
                            >
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-surface border border-border rounded flex items-center justify-center">
                                  <IconComponent className="w-4 h-4 text-fg-muted" />
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-fg">{item.name}</p>
                                  <p className="text-xs text-fg-muted">{item.category}</p>
                                </div>
                              </div>
                              <p className="text-sm font-semibold text-fg">
                                {formatPrice(item.price)}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-8 text-fg-muted">
                  <Package className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>No items selected</p>
                </div>
              )}
            </div>

            {/* Total and Actions */}
            <div className="border-t border-border pt-4 mt-4">
              <div className="flex items-center justify-between mb-4">
                <span className="text-lg font-medium text-fg">Total</span>
                <span className="text-2xl font-bold text-fg">
                  {formatPrice(totalPrice)}
                </span>
              </div>
              <DialogFooter className="gap-2">
                <Button variant="outline" onClick={handleClose}>
                  Cancel
                </Button>
                <Button
                  onClick={handleConfirm}
                  disabled={!hasItems}
                  className="gap-2"
                >
                  <ShoppingCart className="w-4 h-4" />
                  Confirm Rental
                </Button>
              </DialogFooter>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}