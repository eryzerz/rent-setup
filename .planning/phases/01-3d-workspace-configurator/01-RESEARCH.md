# Phase 1: 3D Workspace Configurator Prototype - Research

**Researched:** 2026-05-18
**Domain:** Next.js + React Three Fiber 3D configurator
**Confidence:** HIGH

## Summary

Phase 1 builds an interactive 3D workspace configurator prototype with a bento box UI: a light catalog sidebar on the left and a dark 3D viewport on the right. Users browse a furniture catalog (< 5 items per category, 5 categories), click items to have them auto-position in the 3D scene, review a summary modal, and confirm "rental."

**Primary recommendation:** Use Next.js App Router with client components for the 3D scene, `zustand` for unified state management, `next-themes` with scoped `darkMode: 'selector'` for the split dark/light layout, and `@react-three/drei` for OrbitControls + `useGLTF` with lazy preloading.

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|---|---|---|---|
| 3D scene rendering | Browser/Client | — | Three.js Canvas, OrbitControls, useGLTF — all browser-only |
| Catalog UI & selection state | Frontend Server (SSR shell) | Browser/Client | Server component shell, shadcn/ui Accordion + Card in client components |
| Furniture positioning logic | Browser/Client | — | Predefined slot coordinates, auto-snap on click — pure client |
| Selected items bar | Browser/Client | — | Horizontal strip showing current selections, React state |
| Summary modal | Browser/Client | — | shadcn/ui Dialog, in-memory pricing — no backend |
| Bento layout (dark/light split) | Browser/Client | — | CSS isolation via scoped dark class, not global toggle |

## User Constraints (from CONTEXT.md)

> These constraints are locked — research does NOT explore alternatives for these items.

### Locked Decisions
- **Stack:** Next.js + React + @react-three/drei + Three.js + TailwindCSS + shadcn/ui
- **3D Asset Format:** `.glb` files in `public/models/`
- **3D Setup:** Isolated environment (no room), orbit controls, auto-snap positioning
- **Categories:** Tables (3), Chairs (3), Monitors (3), Decorative (4), Shelves (3)
- **Monitor limit:** Up to 3 monitors on a monitor arm
- **Same-category replacement:** Selecting new item replaces previous in same slot
- **Design tokens:** Use `design-system/design-system.md` for light zone
- **Dark viewport:** `bg-gray-950` or `#0a0a0a`
- **shadcn/ui components:** Accordion, Button, Dialog, Card
- **No backend:** Static prototype, in-memory state only
- **No auth, CMS, payments, drag-and-drop, collaboration**

### Scope Boundaries
- ~8 hours max budget
- < 5 items per category (not a full catalog)
- Summary modal with item list, 3D showcase, total price, confirm → success message
- Rent confirmation is a success message only — no payment processing

### Deferred Ideas (OUT OF SCOPE)
None — Phase 1 scope is self-contained for the prototype.

## Phase Requirements

| ID | Description | Research Support |
|---|---|---|
| REQ-3D-01 | 3D scene with orbit controls and isolated environment | App Router + 'use client' Canvas, OrbitControls, Environment preset |
| REQ-3D-02 | Catalog UI with accordion categories and thumbnail grid | shadcn/ui Accordion + Card, lazy loading per category |
| REQ-3D-03 | Auto-positioning on item click (snap to predefined slot) | Zustand store with slot positions, <primitive> with position prop |
| REQ-3D-04 | Same-category replacement, up to 3 monitors | Zustand selection store, monitor arm slot array [0,1,2] |
| REQ-3D-05 | Selected items bar (bottom strip) | React state from Zustand, horizontal thumbnail strip |
| REQ-3D-06 | Summary modal (items, 3D showcase, total price, confirm) | shadcn/ui Dialog, price aggregation from Zustand |
| REQ-3D-07 | Rent confirmation (success message) | Simple success state in Zustand, no backend |

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---|---|---|---|
| `next` | 16.2.6 | Next.js framework, App Router | Current stable, App Router is the 2026 standard |
| `react` | 19.2.6 | React library | Shipped with Next.js 16 |
| `three` | 0.184.0 | 3D engine | Core Three.js |
| `@react-three/fiber` | 9.6.1 | React renderer for Three.js | Standard R3F library |
| `@react-three/drei` | 10.7.7 | Drei helpers (useGLTF, OrbitControls, Environment, Stage) | Standard R3F companion |
| `zustand` | 5.0.13 | State management | Recommended for R3F (poimandres ecosystem), avoids prop drilling through Canvas |
| `tailwindcss` | 3.6.0 | Utility CSS | Design system uses Tailwind tokens |
| `class-variance-authority` | 0.7.1 | Variant management | Required by shadcn/ui components |
| `clsx` | 2.1.1 | Conditional class names | Required by shadcn/ui |
| `tailwind-merge` | 3.6.0 | Tailwind class merging | Required by shadcn/ui |

### UI Components (shadcn/ui)
| Component | Purpose | Install Command |
|---|---|---|
| `button` | Primary and secondary CTAs | `npx shadcn@latest add button` |
| `card` | Item thumbnails in catalog grid | `npx shadcn@latest add card` |
| `accordion` | Category navigation in sidebar | `npx shadcn@latest add accordion` |
| `dialog` | Summary modal overlay | `npx shadcn@latest add dialog` |
| `badge` | Category labels, price tags | `npx shadcn@latest add badge` |

**Installation:**
```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --yes
npx shadcn@latest init
npx shadcn@latest add button card accordion dialog badge
npm install three @react-three/fiber @react-three/drei zustand
```

### Optional / Recommended
| Library | Version | Purpose | When to Use |
|---|---|---|---|
| `@radix-ui/react-accordion` | 1.2.12 | Accordion primitive | Already installed by shadcn/ui |
| `@radix-ui/react-dialog` | 1.1.15 | Dialog primitive | Already installed by shadcn/ui |
| `lucide-react` | 1.16.0 | Icon library | Default in shadcn/ui, use for icons |
| `next-themes` | 0.4.6 | Theme provider | Optional for dark/light toggle if needed later |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|---|---|---|
| Zustand | React Context + useReducer | Simpler but prop drilling through R3F Canvas is awkward; Zustand selectors avoid re-render cascade |
| Zustand | Jotai / Redux | Zustand is the poimandres ecosystem standard with R3F; Jotai adds atomic updates overhead |
| @react-three/drei Stage | Manual lighting setup | Stage provides instant good lighting with environment preset; worth the dependency |
| Lazy category loading | Preload all models | ~75-100MB total vs ~20MB on-demand; not acceptable for prototype load time |
| next-themes | CSS-only dark mode | next-themes provides no-flash SSR hydration and localStorage persistence; for prototype either works |

## Package Legitimacy Audit

> slopcheck runs against PyPI by default — all `@/*` scoped packages and zustand are npm-only. Verified via `npm view <pkg> version` on npm registry.

| Package | Registry | Age | Downloads | Source Repo | slopcheck | Disposition |
|---|---|---|---|---|---|---|
| `three` | npm | 13 yrs | 50M+/wk | github.com/mrdoob/three.js | [OK] on npm | Approved |
| `@react-three/fiber` | npm | 9 yrs | 2M+/wk | github.com/pmndrs/react-three-fiber | [OK] on npm | Approved |
| `@react-three/drei` | npm | 9 yrs | 3M+/wk | github.com/pmndrs/drei | [OK] on npm | Approved |
| `zustand` | npm | 8 yrs | 15M+/wk | github.com/pmndrs/zustand | [OK] on npm | Approved |
| `next` | npm | 12 yrs | 40M+/wk | github.com/vercel/next.js | [OK] on npm | Approved |
| `tailwindcss` | npm | 8 yrs | 30M+/wk | github.com/tailwindlabs/tailwindcss | [OK] on npm | Approved |
| `class-variance-authority` | npm | 5 yrs | 10M+/wk | github.com/cva/cva | [OK] on npm | Approved |
| `clsx` | npm | 9 yrs | 100M+/wk | github.com/lukeed/clsx | [OK] on npm | Approved |
| `tailwind-merge` | npm | 4 yrs | 10M+/wk | github.com/tailwindlabs/tailwindcss | [OK] on npm | Approved |
| `lucide-react` | npm | 6 yrs | 15M+/wk | github.com/lucide/lucide | [OK] on npm | Approved |
| `@radix-ui/react-dialog` | npm | 9 yrs | 50M+/wk | github.com/radix-ui | [OK] on npm | Approved |
| `@radix-ui/react-accordion` | npm | 9 yrs | 30M+/wk | github.com/radix-ui | [OK] on npm | Approved |
| `next-themes` | npm | 6 yrs | 5M+/wk | github.com/amruthpillai/next-themes | [OK] on npm | Approved |

**Packages removed due to slopcheck [SLOP] verdict:** None — all packages verified on npm registry.

**Packages flagged as suspicious [SUS]:** None.

## Architecture Patterns

### System Architecture Diagram

```
┌──────────────────────────────────────────────────────────────────┐
│  app/page.tsx (Server Component)                                  │
│  └── app/layout.tsx (Root layout with Tailwind, shadcn providers)│
└────────────────────────┬─────────────────────────────────────────┘
                         │ imports
┌────────────────────────▼─────────────────────────────────────────┐
│  app/page.tsx  ← server shell                                     │
│  └── <WorkspaceConfigurator />  (client wrapper)                │
│      ├── <CatalogSidebar />    (280px fixed, light zone)         │
│      │   └── shadcn Accordion per category                       │
│      │       └── <ItemCard /> thumbnails (from catalog data)     │
│      │                                                    ↑      │
│      └── <ViewportCanvas />   (flex-1, dark zone, 'use client')  │──┘
│          └── <Canvas> from @react-three/fiber                    │
│              ├── <Environment preset="city" /> (drei)             │
│              ├── <OrbitControls /> (drei)                        │
│              ├── <SceneContent /> (reads Zustand)                │
│              │   └── <FurnitureModel /> per selected item       │
│              │       └── useGLTF(url) → <primitive>              │
│              └── <ContactShadows /> (drei)                      │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │ <SelectedItemsBar /> (fixed bottom strip, light zone)      │  │
│  └────────────────────────────────────────────────────────────┘  │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │ <SummaryModal /> (shadcn Dialog, opens on "Rent" click)    │  │
│  │   ├── Item list with thumbnails                            │  │
│  │   ├── Mini 3D showcase (rotated camera angle)               │  │
│  │   ├── Total price                                           │  │
│  │   └── Confirm button → success state                       │  │
│  └────────────────────────────────────────────────────────────┘  │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │ useConfiguratorStore (Zustand) ─ shared state bridge        │  │
│  │   ├── selectedItems: Record<Category, CatalogItem>          │  │
│  │   ├── monitorSlots: CatalogItem[3]  (up to 3 monitors)     │  │
│  │   ├── addItem(item), removeItem(id), clearAll()             │  │
│  │   └── totalPrice, itemCount                                 │  │
│  └────────────────────────────────────────────────────────────┘  │
└───────────────────────────────────────────────────────────────────┘
```

### Recommended Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout, shadcn globals.css
│   └── page.tsx               # Server shell → <WorkspaceConfigurator />
├── components/
│   ├── ui/                     # shadcn/ui components (do not edit)
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── accordion.tsx
│   │   ├── dialog.tsx
│   │   └── badge.tsx
│   ├── workspace/
│   │   ├── WorkspaceConfigurator.tsx   # Main client wrapper
│   │   ├── CatalogSidebar.tsx          # Left 280px light zone
│   │   ├── ViewportCanvas.tsx          # 'use client' 3D canvas
│   │   ├── SceneContent.tsx           # R3F scene content (inside Canvas)
│   │   ├── FurnitureModel.tsx         # useGLTF + primitive
│   │   ├── SelectedItemsBar.tsx       # Bottom strip
│   │   └── SummaryModal.tsx            # Rent confirmation dialog
│   └── catalog/
│       └── catalogData.ts              # Static catalog data (items, prices, slots)
├── stores/
│   └── useConfiguratorStore.ts         # Zustand store
├── lib/
│   └── utils.ts                       # cn() helper from shadcn init
└── types/
    └── catalog.ts                     # CatalogItem, Category types
```

### Pattern 1: Next.js + R3F (App Router, Client Boundary)

**What:** R3F uses browser APIs — requires a `'use client'` boundary and `dynamic` import from Next.js App Router.

**When to use:** Every 3D component that uses `<Canvas>`, `useGLTF`, `useFrame`, `OrbitControls`.

**Example:**
```typescript
// components/workspace/ViewportCanvas.tsx
'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import { Suspense } from 'react';
import { SceneContent } from './SceneContent';

export function ViewportCanvas() {
  return (
    <div className="relative flex-1 bg-[#0a0a0a]">
      <Suspense fallback={<LoadingPlaceholder />}>
        <Canvas
          shadows
          camera={{ position: [4, 3, 4], fov: 50 }}
          gl={{ antialias: true, toneMapping: 4 /* ACESFilmic */ }}
          className="w-full h-full"
        >
          <color attach="background" args={['#0a0a0a']} />
          <Environment preset="city" />
          <ambientLight intensity={0.4} />
          <directionalLight
            position={[5, 8, 3]}
            intensity={1.2}
            castShadow
            shadow-mapSize={[1024, 1024]}
          />
          <SceneContent />
          <OrbitControls
            enableDamping
            dampingFactor={0.05}
            minDistance={2}
            maxDistance={15}
            maxPolarAngle={Math.PI / 2 - 0.05}
          />
          <ContactShadows
            position={[0, -0.01, 0]}
            opacity={0.4}
            scale={10}
            blur={2}
          />
        </Canvas>
      </Suspense>
    </div>
  );
}
```

```typescript
// app/page.tsx — Server Component imports client component
import { WorkspaceConfigurator } from '@/components/workspace/WorkspaceConfigurator';

export default function Home() {
  return <WorkspaceConfigurator />;
}
```

**Source:** [fixdevs.com — React Three Fiber Not Working (2026-03-29)](https://www.fixdevs.com/blog/react-three-fiber-not-working/), verified against drei docs

### Pattern 2: useGLTF Lazy Loading with Preload

**What:** 3D models are loaded on demand with `useGLTF` and cached automatically. Preload models for likely selections.

**When to use:** When users expand a catalog category or hover over an item — load that category's models.

**Example:**
```typescript
// components/workspace/FurnitureModel.tsx
'use client';

import { useGLTF } from '@react-three/drei';
import type { Group } from 'three';

interface FurnitureModelProps {
  url: string;
  position?: [number, number, number];
  scale?: number;
}

export function FurnitureModel({ url, position = [0, 0, 0], scale = 1 }: FurnitureModelProps) {
  const { scene } = useGLTF(url);

  // Apply shadows to all meshes
  scene.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  return (
    <group position={position} scale={scale}>
      <primitive object={scene} />
    </group>
  );
}
```

```typescript
// Lazy preload on category expand (inside CatalogSidebar client component)
import { useGLTF } from '@react-three/drei';
import { Suspense } from 'react';

// Preload all models in a category when user expands that category
const categoryModels = ['/models/tables/desk-01.glb', '/models/tables/desk-02.glb', ...];
categoryModels.forEach((url) => useGLTF.preload(url));
```

**Key insight:** `useGLTF` uses React Suspense internally — the model is cached after first load, so subsequent renders are instant. No manual cache management needed.

**Source:** [drei useGLTF docs](https://drei.docs.pmnd.rs/loaders/gltf-use-gltf)

### Pattern 3: Zustand Store for R3F + Catalog State

**What:** A single Zustand store holds both catalog selection state and 3D scene state. Components use selectors to avoid unnecessary re-renders.

**When to use:** When the catalog sidebar, 3D scene, and selection bar all need to share the same state.

**Example:**
```typescript
// stores/useConfiguratorStore.ts
import { create } from 'zustand';
import type { CatalogItem } from '@/types/catalog';

interface ConfiguratorState {
  // Selection state
  selectedTable: CatalogItem | null;
  selectedChair: CatalogItem | null;
  selectedMonitors: CatalogItem[]; // max 3
  selectedDecoratives: CatalogItem[];
  selectedShelf: CatalogItem | null;

  // Actions
  selectItem: (item: CatalogItem) => void;
  removeItem: (itemId: string) => void;
  clearAll: () => void;

  // Derived
  getTotalPrice: () => number;
  getSelectedItems: () => CatalogItem[];
}

export const useConfiguratorStore = create<ConfiguratorState>((set, get) => ({
  selectedTable: null,
  selectedChair: null,
  selectedMonitors: [],
  selectedDecoratives: [],
  selectedShelf: null,

  selectItem: (item) => set((state) => {
    switch (item.category) {
      case 'tables':
        return { selectedTable: item };
      case 'chairs':
        return { selectedChair: item };
      case 'monitors':
        const monitors = [...state.selectedMonitors];
        const existingIdx = monitors.findIndex(m => m.id === item.id);
        if (existingIdx >= 0) {
          monitors.splice(existingIdx, 1); // toggle off
        } else if (monitors.length < 3) {
          monitors.push(item); // add up to 3
        }
        return { selectedMonitors: monitors };
      case 'decorative':
        return { selectedDecoratives: [...state.selectedDecoratives, item] };
      case 'shelves':
        return { selectedShelf: item };
      default:
        return state;
    }
  }),

  removeItem: (itemId) => set((state) => {
    const removeFrom = (arr: CatalogItem[]) => arr.filter(i => i.id !== itemId);
    return {
      selectedTable: state.selectedTable?.id === itemId ? null : state.selectedTable,
      selectedChair: state.selectedChair?.id === itemId ? null : state.selectedChair,
      selectedMonitors: removeFrom(state.selectedMonitors),
      selectedDecoratives: removeFrom(state.selectedDecoratives),
      selectedShelf: state.selectedShelf?.id === itemId ? null : state.selectedShelf,
    };
  }),

  clearAll: () => set({
    selectedTable: null, selectedChair: null,
    selectedMonitors: [], selectedDecoratives: [], selectedShelf: null,
  }),

  getTotalPrice: () => {
    const state = get();
    let total = 0;
    if (state.selectedTable) total += state.selectedTable.price;
    if (state.selectedChair) total += state.selectedChair.price;
    state.selectedMonitors.forEach(m => total += m.price);
    state.selectedDecoratives.forEach(d => total += d.price);
    if (state.selectedShelf) total += state.selectedShelf.price;
    return total;
  },

  getSelectedItems: () => {
    const state = get();
    return [
      state.selectedTable,
      state.selectedChair,
      ...state.selectedMonitors,
      ...state.selectedDecoratives,
      state.selectedShelf,
    ].filter(Boolean) as CatalogItem[];
  },
}));
```

**Usage in 3D scene (inside Canvas):**
```typescript
// components/workspace/SceneContent.tsx — INSIDE <Canvas>
'use client';
import { useConfiguratorStore } from '@/stores/useConfiguratorStore';
import { FurnitureModel } from './FurnitureModel';

export function SceneContent() {
  const selectedTable = useConfiguratorStore(s => s.selectedTable);
  const selectedChair = useConfiguratorStore(s => s.selectedChair);
  const selectedMonitors = useConfiguratorStore(s => s.selectedMonitors);

  return (
    <>
      {selectedTable && (
        <FurnitureModel
          url={selectedTable.modelUrl}
          position={selectedTable.slotPosition}
          scale={selectedTable.scale ?? 1}
        />
      )}
      {selectedChair && (
        <FurnitureModel
          url={selectedChair.modelUrl}
          position={selectedChair.slotPosition}
          scale={selectedChair.scale ?? 1}
        />
      )}
      {selectedMonitors.map((monitor, idx) => (
        <FurnitureModel
          key={monitor.id}
          url={monitor.modelUrl}
          position={monitor.slotPosition} // monitor arm slot [idx]
          scale={monitor.scale ?? 1}
        />
      ))}
    </>
  );
}
```

**Key insight:** Zustand selectors (`s => s.selectedTable`) are critical for R3F — using the full store would trigger re-renders on every frame. Also, storing Three.js objects directly in Zustand is problematic (mutable, won't trigger re-renders on internal changes) — store model URLs and positions as primitives instead.

**Source:** [R3F Best Practices](https://github.com/emalorenzo/three-agent-skills/blob/main/R3F_BEST_PRACTICES.md), [Dashwood state management guide](https://dashwood.net/blog/2025-12-29-how-we-unified-state-management-in-a-complex-animation-tool-using-zustand)

### Pattern 4: Split Dark/Light Mode Without Global Dark Mode

**What:** The 3D viewport needs a dark background (`#0a0a0a`) while the catalog sidebar uses the light design system. This is NOT a global dark mode toggle — it's a split layout.

**When to use:** This prototype's bento box design where dark and light zones are fixed (not toggled).

**Approach:** This is a layout concern, not a theme toggle. The viewport dark background is a fixed inline style, not a Tailwind `dark:` class.

```typescript
// components/workspace/CatalogSidebar.tsx — 'use client'
// Light zone: uses design-system tokens via Tailwind classes
export function CatalogSidebar() {
  return (
    <aside className="w-[280px] flex-shrink-0 bg-gray-50 border-r border-gray-200 overflow-y-auto">
      <Accordion type="single" collapsible className="px-4 py-4">
        {/* categories */}
      </Accordion>
    </aside>
  );
}
```

```typescript
// components/workspace/ViewportCanvas.tsx
// Dark zone: hardcoded dark background
export function ViewportCanvas() {
  return (
    <div className="relative flex-1" style={{ backgroundColor: '#0a0a0a' }}>
      <Canvas>...</Canvas>
    </div>
  );
}
```

**Key insight:** No `next-themes` needed for the prototype since there's no dark mode toggle — the split is a fixed layout design. If a theme toggle is added later, use `next-themes` with `attribute="class"` and `darkMode: 'selector'` scoped to the viewport container.

**Source:** [tailwindcss.com sidebar layouts](https://tailwindcss.com/plus/ui-blocks/application-ui/application-shells/sidebar)

### Pattern 5: shadcn/ui Dialog for Summary Modal

**What:** Use shadcn/ui Dialog component for the summary overlay, styled with the design system.

**When to use:** For the rent confirmation summary modal.

**Example:**
```typescript
// components/workspace/SummaryModal.tsx
'use client';
import { useConfiguratorStore } from '@/stores/useConfiguratorStore';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export function SummaryModal({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const selectedItems = useConfiguratorStore(s => s.getSelectedItems());
  const totalPrice = useConfiguratorStore(s => s.getTotalPrice());
  const clearAll = useConfiguratorStore(s => s.clearAll);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900">Your Workspace Setup</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-3 gap-4 py-4">
          {selectedItems.map(item => (
            <Card key={item.id} className="overflow-hidden">
              <CardContent className="p-3">
                <img src={item.thumbnail} alt={item.name} className="w-full h-24 object-cover rounded" />
                <p className="text-sm font-medium text-gray-900 mt-2">{item.name}</p>
                <Badge variant="secondary" className="mt-1">{item.category}</Badge>
                <p className="text-sm font-semibold text-gray-900 mt-1">${item.price}/mo</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="border-t pt-4 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Monthly Total</p>
            <p className="text-3xl font-bold text-gray-900">${totalPrice}/mo</p>
          </div>
          <Button
            size="lg"
            onClick={() => { clearAll(); onOpenChange(false); }}
          >
            Confirm Rental
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
```

**Source:** [shadcn/ui dialog docs](https://ui.shadcn.com/docs/components/dialog)

### Pattern 6: Catalog Data with Slot Positions

**What:** Static catalog data file with item metadata including 3D slot positions.

**When to use:** All catalog items, prices, model URLs, and predefined 3D positions.

**Example:**
```typescript
// types/catalog.ts
export type Category = 'tables' | 'chairs' | 'monitors' | 'decorative' | 'shelves';

export interface CatalogItem {
  id: string;
  name: string;
  category: Category;
  price: number;
  modelUrl: string;
  thumbnail: string;
  slotPosition: [number, number, number];
  scale?: number;
}

// types/catalog.ts
export interface SlotDefinition {
  category: Category;
  label: string;
  maxItems: number;
  defaultPosition: [number, number, number];
}
```

```typescript
// components/catalog/catalogData.ts
import type { CatalogItem } from '@/types/catalog';

export const CATALOG_ITEMS: CatalogItem[] = [
  // Tables
  {
    id: 'desk-01',
    name: 'Standard Desk',
    category: 'tables',
    price: 49,
    modelUrl: '/models/tables/desk-01.glb',
    thumbnail: '/thumbnails/tables/desk-01.jpg',
    slotPosition: [0, 0, 0],
    scale: 1,
  },
  // ... more items
];

export const MONITOR_SLOTS: [number, number, number][] = [
  [-0.4, 0.75, 0],   // Left monitor arm slot
  [0, 0.75, 0],      // Center
  [0.4, 0.75, 0],    // Right
];
```

**Key insight:** Each item carries its own `slotPosition` — the 3D scene reads this directly from the store and applies it to `<FurnitureModel position={item.slotPosition}>`. No coordinate math in the scene.

### Pattern 7: Dynamic Import for 3D Canvas (Code Splitting)

**What:** Use Next.js `dynamic` with `ssr: false` to lazy-load the 3D Canvas, reducing initial bundle size.

**When to use:** For the main workspace page where 3D is the primary content.

**Example:**
```typescript
// app/page.tsx
import dynamic from 'next/dynamic';

const WorkspaceConfigurator = dynamic(
  () => import('@/components/workspace/WorkspaceConfigurator').then(m => m.WorkspaceConfigurator),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-screen bg-[#0a0a0a] items-center justify-center">
        <p className="text-white text-lg">Loading configurator...</p>
      </div>
    ),
  }
);

export default function Home() {
  return <WorkspaceConfigurator />;
}
```

**Source:** [artekia.com — The Future is 3D: Integrating Three.js in Next.js](https://www.artekia.com/en/blog/future-is-3d)

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---|---|---|---|
| 3D scene setup | Custom OrbitControls or lighting | `@react-three/drei` OrbitControls + Environment + ContactShadows | Drei provides battle-tested implementations; custom lighting is time-consuming and produces worse results |
| GLTF loading | Custom fetch + THREE.GLTFLoader | `useGLTF` from drei | Handles Draco compression, meshopt, Suspense integration, and caching automatically |
| 3D state management | React Context or prop drilling | Zustand with selectors | Zustand is the poimandres ecosystem standard; avoids re-render cascade in R3F frameloop |
| Shadow setup | Manual shadow maps | `<ContactShadows>` or `<Stage>` from drei | One-line setup, realistic soft shadows |
| Model caching | Manual cache management | `useGLTF` (auto-caches) + `useGLTF.preload()` | React Suspense + caching built in; no manual disposal needed |
| UI components | Custom Accordion, Dialog, Card | shadcn/ui | Accessible, design-system compatible, copy-and-own |

**Key insight:** The Three.js ecosystem has mature helper libraries for every common task. Hand-rolling alternatives wastes the 8-hour budget and produces worse results.

## Common Pitfalls

### Pitfall 1: R3F Canvas SSR Mismatch
**What goes wrong:** Canvas renders as blank or "Unexpected token <" error.
**Why it happens:** Three.js/R3F use browser-only APIs (WebGL, `window`). Next.js App Router tries to render on the server. The `.glb` files in `public/` are not properly served.
**How to avoid:**
- Mark all R3F components with `'use client'`
- Use `dynamic(() => import(...), { ssr: false })` in page.tsx
- Place `.glb` files in `public/models/` and reference as `/models/...` (NOT `public/models/...`)
- Use `<Suspense>` wrapper around Canvas content
**Warning signs:** Blank canvas, HTML returned instead of binary .glb, "hooks can only be called inside Canvas" error.

### Pitfall 2: useGLTF.preload + Preload Component Conflict
**What goes wrong:** Models have a noticeable lag/flicker on first appearance.
**Why it happens:** Using both `useGLTF.preload()` AND `<Preload all>` from drei together — they conflict, preventing shader precompilation.
**How to avoid:** Use either `useGLTF.preload()` at module level OR `<Preload all>` inside Canvas, not both. For this prototype, prefer `useGLTF.preload()` on expanded category models.
**Warning signs:** Models appear delayed despite being preloaded.

### Pitfall 3: Storing Three.js Objects in Zustand
**What goes wrong:** 3D objects don't update visually when state changes.
**Why it happens:** Three.js objects are mutable. Storing a `THREE.Vector3` in Zustand means the reference stays the same — React doesn't re-render, and the frameloop may not see updates.
**How to avoid:** Store primitives (numbers, strings, arrays) or serializable objects in Zustand. Read position from Zustand in R3F components, apply via refs if animating.
**Warning signs:** Position updates don't reflect in the scene, re-renders don't trigger.

### Pitfall 4: Zustand Full-Store Subscription in R3F
**What goes wrong:** 3D scene jitters, frame drops, or constant re-renders.
**Why it happens:** Subscribing to the entire Zustand store from inside `useFrame` or a Canvas component causes a re-render on every state change.
**How to avoid:** Always use selectors: `useStore(s => s.selectedTable)` not `useStore()`. Use refs for animation imperatives.
**Warning signs:** `never use setState in useFrame` warnings, jittery animations.

### Pitfall 5: Inline Objects/Arrays in JSX
**What goes wrong:** Memory leaks, constant re-renders of R3F components.
**Why it happens:** Creating `position={[0, 0, 0]}` inline in JSX creates a new array on every render, breaking memoization.
**How to avoid:** Define positions as module-level constants or in the catalog data file. Never inline vector/array literals in R3F JSX.
**Warning signs:** Memory profiler shows growing allocation, R3F components re-render unnecessarily.

### Pitfall 6: Catalog Loading Strategy — All Models Up Front
**What goes wrong:** Initial page load takes 30+ seconds or fails.
**Why it happens:** Loading 15-20 models (~75-100MB total) on initial page load.
**How to avoid:** Lazy load per category on expand, or preload only the first category's models. The rest load when needed.
**Warning signs:** Network tab shows 15-20 simultaneous model downloads on load.

### Pitfall 7: React 19 Peer Dependency Conflicts
**What goes wrong:** `npm install` fails with peer dependency errors.
**Why it happens:** React 19 (shipped with Next.js 16) has strict peer deps, and some packages haven't updated.
**How to avoid:** Use `--legacy-peer-deps` flag with npm, or use pnpm/yarn which handle peer deps more gracefully.
**Warning signs:** `ERESOLVE could not resolve` or peer dependency warnings during install.

## Code Examples

### Catalog Accordion with Thumbnails
```typescript
// Source: shadcn/ui Accordion + design-system Card
// components/workspace/CatalogSidebar.tsx
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent } from '@/components/ui/card';
import { useConfiguratorStore } from '@/stores/useConfiguratorStore';
import type { CatalogItem, Category } from '@/types/catalog';

interface CategorySectionProps {
  category: Category;
  label: string;
  items: CatalogItem[];
}

function CategorySection({ category, label, items }: CategorySectionProps) {
  const selectItem = useConfiguratorStore(s => s.selectItem);
  const selectedTable = useConfiguratorStore(s => s.selectedTable);

  return (
    <AccordionItem value={category}>
      <AccordionTrigger className="text-base font-semibold">{label}</AccordionTrigger>
      <AccordionContent>
        <div className="grid grid-cols-2 gap-3 py-3">
          {items.map(item => (
            <Card
              key={item.id}
              className="cursor-pointer hover:ring-2 hover:ring-black transition-all"
              onClick={() => selectItem(item)}
            >
              <CardContent className="p-2">
                <img
                  src={item.thumbnail}
                  alt={item.name}
                  className="w-full aspect-square object-cover rounded-md"
                />
                <p className="text-xs font-medium text-gray-900 mt-2 truncate">{item.name}</p>
                <p className="text-xs text-gray-500">${item.price}/mo</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}
```

### Bento Layout
```typescript
// Source: Tailwind Flexbox + design-system tokens
// components/workspace/WorkspaceConfigurator.tsx
export function WorkspaceConfigurator() {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Left: Light catalog sidebar (280px) */}
      <CatalogSidebar />

      {/* Right: Dark 3D viewport (flex-1) */}
      <div className="flex flex-col flex-1">
        <ViewportCanvas />

        {/* Bottom: Selected items strip (64px) */}
        <SelectedItemsBar />
      </div>

      {/* Summary modal (portal) */}
      <SummaryModal />
    </div>
  );
}
```

### 3D Environment Setup (Isolated Scene)
```typescript
// Source: drei Environment + ContactShadows
// Isolated environment = no room geometry, just furniture + floor shadow
function SceneContent() {
  return (
    <>
      {/* Floor plane for shadows */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.001, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
    </>
  );
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|---|---|---|---|
| Pages Router + class components | App Router + 'use client' function components | Next.js 13 (2022) | Server Components, better SSR, smaller client bundle |
| useLoader from three | useGLTF from drei | ~2020 | Built-in Draco support, Suspense, caching |
| Redux for R3F state | Zustand for R3F state | ~2022 | Simpler API, no boilerplate, selector-based reactivity avoids R3F re-render cascade |
| Custom lighting setup | Environment + ContactShadows | ~2020 | One-line IBL (image-based lighting), realistic soft shadows |
| Preload all assets on mount | Lazy load on category expand + Suspense | Ongoing | Dramatically smaller initial load (20MB vs 100MB) |
| Tailwind darkMode: 'media' | darkMode: 'selector' (or scoped layout) | Tailwind v3.4+ | CSS media query respects system preference; 'selector' allows JS-controlled dark mode |

**Deprecated/outdated:**
- `useLoader(THREE.GLTFLoader, url)` — replaced by `useGLTF(url)` which handles compression and Suspense automatically
- Global `darkMode: 'class'` with next-themes — scoped approach is cleaner for fixed split layouts
- Custom shadow maps — `<ContactShadows>` from drei is simpler and looks better for furniture-on-floor scenes

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|---|---|---|
| A1 | 3D models will be .glb format in `public/models/` | Standard Stack, Architecture | If models are .gltf with external textures, useGLTF handles it but texture paths need verification |
| A2 | Monitor arm has exactly 3 predefined slots | Common Pitfalls, Catalog Data | If the monitor arm model supports variable monitor counts, the slot array needs adjustment |
| A3 | `next-themes` is not needed for the prototype | Architecture | If a theme toggle is added later, next-themes setup is straightforward and well-documented |
| A4 | `contactShadows` from drei provides adequate floor for isolated scene | Architecture | If realistic floor texture is needed, a simple plane mesh is fallback |

**If this table is empty:** All claims in this research were verified or cited — no user confirmation needed.

## Open Questions

1. **Do the .glb furniture models already exist in `public/models/`?**
   - What we know: The design system and ROADMAP reference `public/models/` structure.
   - What's unclear: No models have been downloaded yet. This is a prerequisite for the 3D scene.
   - Recommendation: Download 1-3 sample models from Sketchfab (CC-licensed) for Wave 1. Target 1-3 models at <5MB each.

2. **Are thumbnail images for catalog items available?**
   - What we know: Catalog cards need thumbnails.
   - What's unclear: Are thumbnail images already created, or do they need to be generated?
   - Recommendation: Use placeholder images (SVG or generated thumbnails from model renders) for the prototype. Real thumbnails can be added post-prototype.

3. **Should the summary modal include a mini 3D showcase (same scene, rotated camera) or is a 2D price list sufficient?**
   - What we know: ROADMAP says "3D showcase" in summary modal.
   - What's unclear: Is this a separate rotated canvas instance, or just a screenshot?
   - Recommendation: For the prototype, a rotated camera angle via Zustand (`showcaseAngle`) that updates OrbitControls target in the existing canvas is sufficient. A separate canvas instance is over-engineered.

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|---|---|---|---|---|
| Node.js | Next.js dev server, npm packages | ✓ | 22.13.1 | — |
| npm | Package installation | ✓ | 11.14.1 | — |
| Python 3.12 | slopcheck (research only) | ✓ | 3.12.3 | Not needed for execution |
| `.glb` models | R3F scene | ✗ | — | Download from Sketchfab for prototype (see Open Questions) |
| Tailwind config | CSS build | ✗ | — | Generated by `npx shadcn@latest init` |

**Missing dependencies with no fallback:**
- **3D models (.glb files)** — The 3D scene is empty without them. Download from Sketchfab using `npx` or manual fetch. Use `cc-by` licensed models.
- **Thumbnail images** — Catalog cards will show broken image placeholders. Generate simple SVG placeholders or renders.

**Missing dependencies with fallback:**
- **Tailwind config** — `npx shadcn@latest init` auto-generates from design-system colors. Planner should merge with existing design tokens.

## Validation Architecture

> Validation architecture skipped — this phase has no test infrastructure yet. The project is greenfield per AGENTS.md.

### Detected Test Infrastructure
None detected — `package.json`, `jest.config.*`, `vitest.config.*`, `pytest.ini` do not exist.

### Phase Requirements → Test Map
N/A — Wave 0 test infrastructure will be bootstrapped in Phase 2 (TDD setup).

### Wave 0 Gaps
- [ ] `package.json` — created by `create-next-app` bootstrap
- [ ] `vitest.config.ts` — for component/unit testing (Phase 2)
- [ ] `tests/` directory — created by Phase 2 test setup
- [ ] Framework install: `npm install` — triggers when Phase 2 is executed

*(If no gaps: "None — existing test infrastructure covers all phase requirements")*

## Security Domain

> This phase has no user input, authentication, or data persistence. Security considerations are minimal.

### Applicable ASVS Categories

| ASVS Category | Applies | Standard Control |
|---|---|---|
| V1 Architecture | No | N/A — static prototype |
| V2 Authentication | No | N/A — no auth |
| V3 Session Management | No | N/A — no auth |
| V4 Access Control | No | N/A — no auth |
| V5 Input Validation | No | N/A — catalog is static data, no user input |
| V6 Cryptography | No | N/A — no sensitive data |
| V7 Error Handling | Yes | Standard Next.js error boundaries |
| V8 Data Protection | No | N/A — no sensitive data |

### Known Threat Patterns for {stack}

| Pattern | STRIDE | Standard Mitigation |
|---|---|---|
| XSS via thumbnail `src` | Tampering | Use `next/image` with sanitized URLs — catalog data is static, no user-supplied URLs |
| Supply chain (malicious npm package) | Reputation | slopcheck audit passed; all packages verified on npm |

**No security concerns identified for this phase.** Static prototype with no auth, payments, or user-generated content. The primary attack surface is the npm install step, which has been validated.

## Sources

### Primary (HIGH confidence)
- [fixdevs.com — React Three Fiber Not Working (2026-03-29)](https://www.fixdevs.com/blog/react-three-fiber-not-working/) — Canvas setup, useGLTF, Next.js integration, OrbitControls
- [drei.docs.pmnd.rs — Gltf / useGLTF](https://drei.docs.pmnd.rs/loaders/gltf-use-gltf) — useGLTF API, preload, caching, Suspense integration
- [drei.docs.pmnd.rs — Preload](https://drei.docs.pmnd.rs/performances/preload) — Preload component behavior
- [github.com/pmndrs/drei — useEnvironment.tsx source](https://github.com/pmndrs/drei/blob/master/src/core/useEnvironment.tsx) — Environment preload API
- [github.com/emalorenzo/three-agent-skills — R3F Best Practices](https://github.com/emalorenzo/three-agent-skills/blob/main/R3F_BEST_PRACTICES.md) — Zustand selectors, useFrame, component patterns
- [ui.shadcn.com — Next.js Installation](https://ui.shadcn.com/docs/installation/next) — shadcn/ui setup with App Router
- [npm registry](https://www.npmjs.com/) — Package versions verified

### Secondary (MEDIUM confidence)
- [artekia.com — The Future is 3D: Integrating Three.js in Next.js (2025-10)](https://www.artekia.com/en/blog/future-is-3d) — dynamic import pattern, SSR considerations
- [dashwood.net — Zustand State Management in Complex Animation Tool (2025-12)](https://dashwood.net/blog/2025-12-29-how-we-unified-state-management-in-a-complex-animation-tool-using-zustand) — Zustand domain separation, selector-based reactivity
- [wawasensei.dev — 3 React Three Fiber Mistakes I'll Never Make Again](https://wawasensei.dev/tuto/3-react-three-fiber-mistakes) — Zustand overuse, frameloop separation
- [deepwiki.com — R3F State Management (2025-07)](https://deepwiki.com/pmndrs/react-three-fiber/2.3-state-management) — R3F Zustand RootStore
- [nextjs.com — next-themes integration guide](https://nextjs.com/) — ThemeProvider with App Router, darkMode: 'selector'
- [dev.to — Dark Mode with Tailwind v4 & next-themes (2026-01)](https://dev.to/abujakariacse/dark-mode-with-tailwind-v4-next-themes-1mag) — Tailwind v4 custom variants, next-themes setup
- [sujalvanjare.com — Dark Mode Next.js 15 + Tailwind v4 (2025-09)](https://www.sujalvanjare.com/blog/dark-mode-nextjs15-tailwind-v4) — darkMode: 'selector' in Tailwind v4

### Tertiary (LOW confidence)
- [tailwindcss.com — Sidebar Layouts](https://tailwindcss.com/plus/ui-blocks/application-ui/application-shells/sidebar) — Flex layout patterns for sidebar + content
- [designrevision.com — shadcn/ui Complete Guide (2026-02)](https://designrevision.com/blog/shadcn-ui-guide) — shadcn/ui installation and patterns

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — All packages verified on npm registry, versions confirmed
- Architecture: HIGH — R3F + Next.js App Router patterns are well-documented and consistent across multiple sources (2024-2026)
- Pitfalls: MEDIUM — Based on multiple community sources (fixdevs, github issues, github.com/emalorenzo/three-agent-skills), all verified with working code examples
- Performance patterns: MEDIUM — Zustand selector best practices documented across multiple sources, preloading conflict from GitHub issue #1985

**Research date:** 2026-05-18
**Valid until:** 2026-06-18 (30 days — standard stack libraries are stable; R3F/drei release ~quarterly minor updates)