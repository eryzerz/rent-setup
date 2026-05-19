---
title: 3D Workspace Configurator - Phase 1 Context
date: 2026-05-18
status: ready-for-planning
source: Initial project setup via /gsd-plan-phase
---

## Phase Boundary

Phase 1 delivers a working 3D Workspace Configurator prototype with:
- 3D scene with furniture models (Three.js, orbit controls, isolated environment)
- Catalog UI with accordion categories and item thumbnails
- Auto-positioning of selected items in 3D scene
- Selection logic (same-category replacement, up to 3 monitors)
- Selected items bar
- Summary modal with pricing and rent confirmation

## Implementation Decisions

### Stack
- Next.js + React for UI framework
- @react-three/drei + Three.js for 3D rendering
- TailwindCSS + shadcn/ui for styling
- Bento box layout: dark 3D viewport + light catalog sidebar
- No backend, static prototype, in-memory state

### 3D Asset Strategy
- Models stored in `public/models/` as .glb files
- Lazy loading via useGLTF cache (load on hover/category expand)
- Target 1-5MB per model, ~15-20 models total
- Source from Sketchfab for each category

### Design System
- Use `design-system/design-system.md` for light zone tokens
- Dark viewport: `bg-gray-950` or `#0a0a0a`
- shadcn/ui components: Accordion, Button, Dialog, Card

## Canonical References

- `.planning/notes/3d-workspace-configurator.md` — Full feature spec
- `design-system/design-system.md` — Design tokens and component specs
- `AGENTS.md` — Project instructions and conventions

## Specific Ideas

### Categories and Items
| Category | Items | Notes |
|---|---|---|
| Tables | 3 | Different desk styles/sizes |
| Chairs | 3 | Ergonomic, executive, casual |
| Monitors | 3 | 27", 32", ultrawide variants |
| Decorative | 4 | Lamps, plants, accessories |
| Shelves | 3 | Wall-mounted, standing |

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

## Deferred Ideas

None — Phase 1 scope is complete for prototype

---

*Phase: 01-3d-workspace-configurator*
*Context gathered: 2026-05-18 via /gsd-plan-phase*