'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useConfiguratorStore } from '@/stores/useConfiguratorStore';
import { formatPrice } from '@/components/catalog/catalogData';
import { Check, ShoppingCart, Package, Monitor, Armchair, Box, ArrowRight } from 'lucide-react';

interface SummaryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedCount: number;
}

const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  table: Box,
  chair: Armchair,
  monitor: Monitor,
  decorative: Package,
  shelf: Box,
};

export function SummaryModal({ open, onOpenChange, selectedCount }: SummaryModalProps) {
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

  const itemsByCategory = selectedItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, typeof selectedItems>);

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-md w-[95vw] p-0 gap-0 overflow-hidden">
        {isConfirmed ? (
          <div className="flex flex-col items-center justify-center py-10 px-6 text-center">
            <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mb-5">
              <Check className="w-8 h-8 text-success" />
            </div>
            <DialogTitle className="text-xl font-semibold text-fg mb-2">
              Order Confirmed
            </DialogTitle>
            <DialogDescription className="text-fg-secondary mb-6 text-sm">
              Your workspace configuration has been submitted. Shipping details will be sent to your email.
            </DialogDescription>
            <Button onClick={handleClose} className="min-w-[120px]">
              Done
            </Button>
          </div>
        ) : (
          <>
            <DialogHeader className="px-6 pt-6 pb-4 border-b border-border">
              <DialogTitle className="text-lg font-semibold text-fg flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-accent" />
                Your Workspace
              </DialogTitle>
              <DialogDescription className="text-fg-muted text-sm">
                {hasItems ? `${selectedItems.length} item${selectedItems.length > 1 ? 's' : ''} selected` : 'No items selected yet'}
              </DialogDescription>
            </DialogHeader>

            <div className="px-6 py-4 max-h-[320px] overflow-y-auto">
              {hasItems ? (
                <div className="space-y-4">
                  {Object.entries(itemsByCategory).map(([category, items]) => {
                    const IconComponent = categoryIcons[category] || Package;
                    return (
                      <div key={category}>
                        <p className="text-xs font-medium text-fg-muted uppercase tracking-wide mb-2">
                          {category}
                        </p>
                        <div className="space-y-1.5">
                          {items.map((item) => (
                            <div
                              key={item.id}
                              className="flex items-center justify-between py-1.5"
                            >
                              <div className="flex items-center gap-2.5">
                                <IconComponent className="w-4 h-4 text-fg-muted" />
                                <span className="text-sm text-fg">{item.name}</span>
                              </div>
                              <span className="text-sm font-medium text-fg">
                                {formatPrice(item.price)}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-6 text-fg-muted">
                  <Package className="w-10 h-10 mx-auto mb-2 opacity-40" />
                  <p className="text-sm">Select items from the catalog to get started</p>
                </div>
              )}
            </div>

            <div className="px-6 py-4 border-t border-border bg-surface">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-fg">Total</span>
                <span className="text-2xl font-bold text-fg">{formatPrice(totalPrice)}</span>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={handleClose} className="flex-1">
                  Close
                </Button>
                <Button
                  onClick={handleConfirm}
                  disabled={!hasItems}
                  className="flex-1 gap-2"
                >
                  Rent {hasItems && `(${selectedCount})`}
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}