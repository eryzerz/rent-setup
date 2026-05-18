'use client';

import { useConfiguratorStore } from '@/stores/useConfiguratorStore';
import { ThumbnailPlaceholder } from '@/components/catalog/ThumbnailPlaceholder';
import { formatPrice } from '@/components/catalog/catalogData';
import type { CatalogItem } from '@/types/catalog';
import { Card, CardContent } from '@/components/ui/card';

interface CategorySectionProps {
  category: CatalogItem['category'];
  label: string;
  items: CatalogItem[];
}

export function CategorySection({ category, label, items }: CategorySectionProps) {
  const { selectItem } = useConfiguratorStore();
  
  // Determine selected item(s) for this category
  const { table, chair, monitors, decoratives, shelf } = useConfiguratorStore();
  
  const getSelectedIds = (): string[] => {
    switch (category) {
      case 'table':
        return table ? [table.id] : [];
      case 'chair':
        return chair ? [chair.id] : [];
      case 'monitor':
        return monitors.map((m) => m.id);
      case 'decorative':
        return decoratives.map((d) => d.id);
      case 'shelf':
        return shelf ? [shelf.id] : [];
    }
  };
  
  const selectedIds = getSelectedIds();
  
  const handleSelect = (item: CatalogItem) => {
    selectItem(item);
  };
  
  return (
    <div className="grid grid-cols-2 gap-2 pt-2">
      {items.map((item) => {
        const isSelected = selectedIds.includes(item.id);
        
        return (
          <Card
            key={item.id}
            className={`cursor-pointer transition-all hover:ring-2 hover:ring-accent/50 ${
              isSelected 
                ? 'ring-2 ring-accent border-accent bg-accent/5' 
                : 'border-border hover:border-border-strong'
            }`}
            onClick={() => handleSelect(item)}
          >
            <CardContent className="p-2 flex flex-col items-center gap-1.5">
              <ThumbnailPlaceholder name={item.name} category={item.category} size={70} />
              <div className="w-full text-center">
                <p className="text-xs font-medium text-fg truncate w-full" title={item.name}>
                  {item.name}
                </p>
                <p className="text-xs font-semibold text-fg-secondary">
                  {formatPrice(item.price)}/mo
                </p>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}