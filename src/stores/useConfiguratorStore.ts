import { create } from 'zustand';
import type { CatalogItem, Category } from '@/types/catalog';

interface ConfiguratorState {
  // Selected items
  table: CatalogItem | null;
  chair: CatalogItem | null;
  monitors: CatalogItem[];
  decoratives: CatalogItem[];
  shelf: CatalogItem | null;

  // Actions
  selectItem: (item: CatalogItem) => void;
  removeItem: (itemId: string, category: Category) => void;
  clearAll: () => void;
  getTotalPrice: () => number;
  getSelectedItems: () => CatalogItem[];
}

const MAX_MONITORS = 2;
const MAX_DECORATIVES = 10;

export const useConfiguratorStore = create<ConfiguratorState>((set, get) => ({
  table: null,
  chair: null,
  monitors: [],
  decoratives: [],
  shelf: null,

  selectItem: (item: CatalogItem) => {
    switch (item.category) {
      case 'table':
        set({ table: item });
        break;
      case 'chair':
        set({ chair: item });
        break;
      case 'monitor':
        set((state) => {
          const existing = state.monitors.find((m) => m.id === item.id);
          if (existing) {
            // Toggle off - remove the monitor
            return { monitors: state.monitors.filter((m) => m.id !== item.id) };
          }
          const newMonitors =
            state.monitors.length >= MAX_MONITORS
              ? [...state.monitors.slice(1), item]
              : [...state.monitors, item];
          return { monitors: newMonitors };
        });
        break;
      case 'decorative':
        set((state) => {
          const existing = state.decoratives.find((d) => d.id === item.id);
          if (existing) {
            // Toggle off - remove the decorative
            return { decoratives: state.decoratives.filter((d) => d.id !== item.id) };
          }
          const newDeco =
            state.decoratives.length >= MAX_DECORATIVES
              ? [...state.decoratives.slice(1), item]
              : [...state.decoratives, item];
          return { decoratives: newDeco };
        });
        break;
      case 'shelf':
        set({ shelf: item });
        break;
    }
  },

  removeItem: (itemId: string, category: Category) => {
    switch (category) {
      case 'table':
        set((state) => (state.table?.id === itemId ? { table: null } : state));
        break;
      case 'chair':
        set((state) => (state.chair?.id === itemId ? { chair: null } : state));
        break;
      case 'monitor':
        set((state) => ({
          monitors: state.monitors.filter((m) => m.id !== itemId),
        }));
        break;
      case 'decorative':
        set((state) => ({
          decoratives: state.decoratives.filter((d) => d.id !== itemId),
        }));
        break;
      case 'shelf':
        set((state) => (state.shelf?.id === itemId ? { shelf: null } : state));
        break;
    }
  },

  clearAll: () =>
    set({
      table: null,
      chair: null,
      monitors: [],
      decoratives: [],
      shelf: null,
    }),

  getTotalPrice: () => {
    const state = get();
    let total = 0;
    if (state.table) total += state.table.price;
    if (state.chair) total += state.chair.price;
    state.monitors.forEach((m) => (total += m.price));
    state.decoratives.forEach((d) => (total += d.price));
    if (state.shelf) total += state.shelf.price;
    return total;
  },

  getSelectedItems: () => {
    const state = get();
    const items: CatalogItem[] = [];
    if (state.table) items.push(state.table);
    if (state.chair) items.push(state.chair);
    items.push(...state.monitors);
    items.push(...state.decoratives);
    if (state.shelf) items.push(state.shelf);
    return items;
  },
}));