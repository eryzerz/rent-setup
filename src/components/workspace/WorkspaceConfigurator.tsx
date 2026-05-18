'use client';

import dynamic from 'next/dynamic';
import { useConfiguratorStore } from '@/stores/useConfiguratorStore';
import { formatPrice } from '@/components/catalog/catalogData';
import type { Category } from '@/types/catalog';
import { CatalogSidebar } from './CatalogSidebar';
import { Trash2, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Dynamically import the 3D canvas to avoid SSR issues
const ViewportCanvas = dynamic(
  () => import('./ViewportCanvas'),
  { ssr: false, loading: () => <div className="w-full h-full bg-black/50 animate-pulse" /> }
);

export default function WorkspaceConfigurator() {
  const {
    removeItem,
    clearAll,
    getTotalPrice,
    getSelectedItems,
  } = useConfiguratorStore();

  const totalPrice = getTotalPrice();
  const selectedItems = getSelectedItems();
  const selectedCount = selectedItems.length;

  const handleRemoveItem = (itemId: string, category: Category) => {
    removeItem(itemId, category);
  };

  return (
    <div className="flex h-screen w-full bg-bg">
      {/* Left Panel - Catalog Sidebar */}
      <CatalogSidebar />

      {/* Right Panel - 3D Viewport */}
      <div className="flex-1 relative">
        <ViewportCanvas selectedItems={selectedItems} />

        {/* Selected items overlay */}
        {selectedCount > 0 && (
          <div className="absolute top-4 right-4 bg-surface/90 backdrop-blur-sm rounded-lg border border-border p-3 max-w-[200px]">
            <p className="text-sm font-semibold text-fg mb-2">
              Selected Items ({selectedCount})
            </p>
            <div className="space-y-1">
              {selectedItems.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center text-xs"
                >
                  <span className="text-fg-secondary truncate">{item.name}</span>
                  <button
                    onClick={() => handleRemoveItem(item.id, item.category)}
                    className="text-danger hover:text-danger/80 ml-2"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer with total */}
        <div className="absolute bottom-4 left-4 right-4 bg-surface/90 backdrop-blur-sm rounded-lg border border-border p-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <span className="text-sm text-fg-secondary">Total</span>
              <p className="text-2xl font-bold text-fg">{formatPrice(totalPrice)}</p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={clearAll}
                disabled={selectedCount === 0}
              >
                <Trash2 className="w-4 h-4 mr-1" />
                Clear All
              </Button>
              <Button size="sm" disabled={selectedCount === 0}>
                <ShoppingCart className="w-4 h-4 mr-1" />
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}