export type Category = 'table' | 'chair' | 'monitor' | 'decorative' | 'shelf';

export interface SlotDefinition {
  category: Category;
  label: string;
  maxItems: number;
  description: string;
}

export interface CatalogItem {
  id: string;
  name: string;
  category: Category;
  price: number; // in cents
  modelUrl: string;
  scale: number;
  slotPosition: [number, number, number];
  rotation?: number[];
  thumbnail?: string;
  description?: string;
}

export interface Selection {
  table: CatalogItem | null;
  chair: CatalogItem | null;
  monitors: CatalogItem[];
  decoratives: CatalogItem[];
  shelf: CatalogItem | null;
}