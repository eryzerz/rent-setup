---
title: 3D Workspace Configurator
date: 2026-05-18
tags: [workspace, configurator, 3d]
context: Interactive tool where users design their dream workspace setup and rent it as a furniture package
---

## Concept

An interactive 3D configurator where users build their ideal workspace by selecting furniture items (desk, chair, monitors, lamp, plant) and seeing it rendered in real-time. Users can rotate the view, review their selection in a summary screen, and confirm the "rent" to receive a shipping message.

**Core experience:** Browse catalog → click items → see 3D update instantly → review summary → confirm

## Layout

```
+------------------+--------------------------+
|  Left Sidebar    |                          |
|  (280px)         |    3D Preview            |
|                  |    (center)              |
|  - Tables        |                          |
|  - Chairs        |                          |
|  - Monitors      |                          |
|  - Decorative    |                          |
|  - Shelves       |                          |
+------------------+--------------------------+
|         Selected Items Bar (bottom)         |
+------------------------------------------------+
|         Summary Modal (on "Rent" click)        |
+------------------------------------------------+
```

- **Sidebar (280px):** Accordion categories, square thumbnail grid per category
- **3D Preview:** Fills remaining space, orbit controls for rotation
- **Selected Items Bar:** Horizontal strip of thumbnails showing current selections
- **Summary Modal:** Full-screen overlay with item list, 3D showcase view, total price

## Interaction Model

### Selection
- Click thumbnail → item auto-positions in 3D scene
- Click same category item → replaces previous selection
- Monitors: can pick up to 3, positioned on monitor arm

### 3D Scene
- **Isolated environment:** no room context, just furniture floating
- **Auto-positioning:** items snap to predefined slots
- **Orbit controls:** rotate, zoom, pan to view from any angle
- **Auto-swap:** selecting new item replaces old in slot

### Summary View
- Triggered by "Rent" button (enabled when ≥1 item selected)
- Shows: item list with thumbnails, 3D view rotated to showcase angle, total price
- Confirm button → success message ("Rent completed! Wait for shipping")

## Tech Stack

- **Next.js + React:** UI framework with server-side rendering support
- **Three.js + @react-three/drei:** 3D rendering, GLTF/GLB loader, orbit controls, useGLTF caching
- **No backend:** static prototype, state managed in memory

## UI Layout Approach

### Bento Box Design
- **3D Viewport:** Dark background zone (e.g., `bg-gray-950` or `#0a0a0a`), the 3D canvas fills this area
- **Sidebar/Catalog:** Light design system zone (`bg-surface`, `bg-gray-50`), accordion categories with thumbnails
- **Contrast creates visual hierarchy:** Dark makes models pop, light keeps catalog scannable

### Design System Integration
- Use `design-system/design-system.md` for light zone tokens (buttons, cards, accordions)
- Dark viewport: custom dark background + subtle border to frame the 3D scene
- shadcn/ui for catalog components: Accordion, Button, Dialog (summary modal), Card (item thumbnails)

### Key UI Components
- Accordion for category navigation
- Grid of item thumbnails (2-3 columns per category)
- Selected items bar (horizontal strip at bottom)
- Modal/dialog for summary view

### Layout
```
+------------------+--------------------------+
|  Left Sidebar    |                          |
|  (280px)         |    3D Preview            |
|  light zone      |    dark viewport         |
|                  |                          |
+------------------+--------------------------+
|         Selected Items Bar (bottom)         |
+------------------------------------------------+
|         Summary Modal (on "Rent" click)        |
+------------------------------------------------+
```

## 3D Asset Management

### Model Format
- Use **.glb** (binary GLTF) — single self-contained file, no external dependencies
- Download 1k textures from Sketchfab to keep sizes manageable (target 1-5MB per model)
- Consider Draco compression for further size reduction if needed

### Storage Strategy
- Models stored in `public/models/` directory
- Structure: `public/models/{category}/{model-name}.glb`
- No database needed — static files served directly

### Loading Strategy
- **Catalog thumbnails:** tiny images, load upfront with the UI
- **3D models:** lazy load on category expand or item hover (not on initial page load)
- **Selected items:** keep in memory via `useGLTF` cache for instant toggle between categories
- Expected concurrent load: 2-4 models max (~20MB) vs 15-20 models total (~75-100MB)

### React Three Fiber Setup
```jsx
import { useGLTF } from '@react-three/drei'

// Models auto-cached after first load
useGLTF.preload('/models/tables/desk-01.glb')
```

## Items per Category (<5 each for prototype)

| Category | Items | Notes |
|---|---|---|
| Tables | 3 | Different desk styles/sizes |
| Chairs | 3 | Ergonomic, executive, casual |
| Monitors | 3 | 27", 32", ultrawide variants |
| Decorative | 4 | Lamps, plants, accessories |
| Shelves | 3 | Wall-mounted, standing |

## Out of Scope

- User authentication
- Payment flow
- Inventory management / CMS
- Real-time collaboration
- Drag-and-drop positioning
- Shipping/logistics integration

## Success Criteria

- User can browse catalog and select items from all categories
- 3D scene updates in real-time on selection
- Can rotate view to inspect setup from any angle
- Summary view shows all selected items, price, 3D showcase
- Rent confirmation displays success message
- Can be built and run within 8 hours