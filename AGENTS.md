# Agents

## Project State

Greenfield prototype. No build system, tests, or CI configured yet.

## Active Scope

See `ROADMAP.md` for current phase.

## Stack

- **Frontend:** Next.js + React + @react-three/drei + Three.js
- **3D Assets:** .glb files in `public/models/`, lazy-loaded with useGLTF cache
- **No backend:** static prototype, in-memory state only
- **No auth, payments, or CMS**

## Design System

- Use `design-system/design-system.md` for colors, typography, spacing, and component specs
- Tailwind config available at `design-system/tailwind.config.js`

## Key Conventions

- Max **~8 hours** for the Phase 1 prototype
- Catalog: **<5 items per category** (not a full catalog)
- Monitor slot: supports up to **3 monitors** on a monitor arm
- Same-category selections **replace** previous items
- Three.js scene: **isolated environment** (no room context), **orbit controls**, **auto-snap positioning**

## Three.js / R3F Setup

- Import ViewportCanvas **directly** (not via `dynamic()`) — dynamic loading can cause WebGL context loss on re-render
- Use `Suspense` wrapping `useGLTF` calls for loading states
- Scene background: `#1a1a2e` (dark blue-gray)
- Environment preset: `studio` for good product lighting
- Model positioning: center on ground using `Box3.setFromObject()` + offset calculation

## Debug Notes

- WebGL context loss can occur with complex re-render cycles or `dynamic()` imports
- Test isolated: pure WebGL canvas → R3F basic → R3F + Environment → R3F + useGLTF
- Always use `ResizeObserver` or explicit dimensions for canvas container