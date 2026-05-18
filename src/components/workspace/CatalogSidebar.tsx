'use client';

import { SLOTS, CATALOG_ITEMS } from '@/components/catalog/catalogData';
import { CategorySection } from './CategorySection';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import type { Category } from '@/types/catalog';

const CATEGORY_ICONS: Record<Category, string> = {
  table: '🪑',
  chair: '🪑',
  monitor: '🖥️',
  decorative: '🪴',
  shelf: '📚',
};

interface CatalogSidebarProps {
  className?: string;
}

export function CatalogSidebar({ className = '' }: CatalogSidebarProps) {
  return (
    <div 
      className={`w-[280px] flex-shrink-0 bg-gray-50 border-r border-gray-200 flex flex-col h-full overflow-hidden ${className}`}
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-200 bg-white">
        <h2 className="text-lg font-semibold text-fg">Catalog</h2>
        <p className="text-xs text-fg-secondary mt-0.5">Select items for your workspace</p>
      </div>
      
      {/* Category Accordions */}
      <div className="flex-1 overflow-y-auto p-3">
        <Accordion className="w-full" defaultValue={['table']}>
          {SLOTS.map((slot) => (
            <AccordionItem key={slot.category} value={slot.category}>
              <AccordionTrigger className="text-sm font-medium hover:no-underline">
                <span className="flex items-center gap-2">
                  <span>{CATEGORY_ICONS[slot.category]}</span>
                  {slot.label}
                  <Badge variant="secondary" className="ml-1 text-xs h-5 px-1.5">
                    {slot.maxItems}
                  </Badge>
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <CategorySection
                  category={slot.category}
                  label={slot.label}
                  items={CATALOG_ITEMS.filter((item) => item.category === slot.category)}
                />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}