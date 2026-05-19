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
import { Monitor, Armchair, Flower2, BookOpen } from 'lucide-react';

const CATEGORY_ICONS: Record<Category, React.ReactNode> = {
  table: <Armchair className="w-4 h-4" />,
  chair: <Armchair className="w-4 h-4" />,
  monitor: <Monitor className="w-4 h-4" />,
  decorative: <Flower2 className="w-4 h-4" />,
  shelf: <BookOpen className="w-4 h-4" />,
};

interface CatalogSidebarProps {
  className?: string;
}

export function CatalogSidebar({ className = '' }: CatalogSidebarProps) {
  return (
    <aside 
      className={`w-[300px] flex-shrink-0 bg-surface border-r border-border flex flex-col h-full overflow-hidden ${className}`}
    >
      <header className="p-5 border-b border-border bg-bg">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
            <BookOpen className="w-4 h-4 text-fg-inverse" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-fg leading-tight">Catalog</h2>
            <p className="text-xs text-fg-secondary mt-0.5">Customize your workspace</p>
          </div>
        </div>
      </header>
      
      <div className="flex-1 overflow-y-auto">
        <div className="p-2">
          <Accordion className="w-full" defaultValue={['table']}>
            {SLOTS.map((slot) => (
              <AccordionItem 
                key={slot.category} 
                value={slot.category}
                className="border-border"
              >
                <AccordionTrigger className="text-sm font-medium text-fg hover:no-underline hover:bg-surface-hover px-3 py-2.5 rounded-lg transition-colors group">
                  <span className="flex items-center gap-2.5">
                    <span className="text-fg-secondary group-hover:text-fg transition-colors">
                      {CATEGORY_ICONS[slot.category]}
                    </span>
                    <span className="flex-1 text-left">{slot.label}</span>
                    <Badge 
                      variant="secondary" 
                      className="text-[10px] h-5 px-1.5 font-medium bg-surface border border-border"
                    >
                      {slot.maxItems}
                    </Badge>
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-2 pb-3">
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

      <footer className="p-4 border-t border-border bg-bg">
        <p className="text-xs text-fg-muted text-center">
          Click items to add to workspace
        </p>
      </footer>
    </aside>
  );
}