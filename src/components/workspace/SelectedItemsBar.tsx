'use client';

import { X, Trash2, ShoppingCart } from 'lucide-react';
import { useConfiguratorStore } from '@/stores/useConfiguratorStore';
import { formatPrice } from '@/components/catalog/catalogData';
import { Button } from '@/components/ui/button';
import type { Category } from '@/types/catalog';

export function SelectedItemsBar() {
  const { removeItem, clearAll, getTotalPrice, getSelectedItems } = useConfiguratorStore();

  const totalPrice = getTotalPrice();
  const selectedItems = getSelectedItems();
  const selectedCount = selectedItems.length;

  const handleRemoveItem = (itemId: string, category: Category) => {
    removeItem(itemId, category);
  };

  if (selectedCount === 0) {
    return null;
  }

  return (
    <div className="absolute bottom-0 left-0 right-0 bg-surface/95 backdrop-blur-sm border-t border-border">
      <div className="flex items-center gap-4 px-4 py-3">
        {/* Selected items scroll */}
        <div className="flex-1 flex items-center gap-3 overflow-x-auto scrollbar-hide">
          {selectedItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-2 bg-bg border border-border rounded-lg px-3 py-2 min-w-fit"
            >
              <div className="w-8 h-8 bg-gray-200 border border-border rounded flex items-center justify-center">
                <span className="text-xs text-fg-secondary truncate">
                  {item.name.charAt(0)}
                </span>
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-fg truncate max-w-[120px]">
                  {item.name}
                </p>
                <p className="text-xs text-fg-secondary">
                  {formatPrice(item.price)}
                </p>
              </div>
              <button
                onClick={() => handleRemoveItem(item.id, item.category)}
                className="text-fg-muted hover:text-danger transition-colors p-1"
                aria-label={`Remove ${item.name}`}
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="w-px h-10 bg-border" />

        {/* Total price */}
        <div className="text-right min-w-[100px]">
          <p className="text-xs text-fg-secondary">Total</p>
          <p className="text-lg font-bold text-fg">{formatPrice(totalPrice)}</p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAll}
            className="text-fg-secondary hover:text-danger"
          >
            <Trash2 className="w-4 h-4 mr-1" />
            Clear All
          </Button>
          <Button size="sm">
            <ShoppingCart className="w-4 h-4 mr-1" />
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}