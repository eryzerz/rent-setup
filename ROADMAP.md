# Project Roadmap

## Phase 1: 3D Workspace Configurator Prototype

**Goal:** Interactive configurator where users design their workspace setup and rent it as a furniture package.

**Time Budget:** ~8 hours

**Plans:** 4 plans in 4 waves

**Plan list:**
- [ ] 01-01-PLAN.md — Project setup, Next.js + R3F, Zustand store, placeholder models
- [ ] 01-02-PLAN.md — Catalog sidebar, accordion categories, item thumbnails, selection logic
- [ ] 01-03-PLAN.md — 3D scene wiring, auto-positioning, selected items bar
- [ ] 01-04-PLAN.md — Summary modal, pricing, rent confirmation, polish

**Scope:**
- [ ] 3D scene with Three.js (isolated environment, orbit controls)
- [ ] Catalog UI (accordion categories, thumbnail grid, <5 items per category)
- [ ] Auto-positioning (click item → snap to predefined slot)
- [ ] Selection logic (replace same-category items, support up to 3 monitors)
- [ ] Selected items bar (bottom strip showing current selections)
- [ ] Summary modal (item list, 3D showcase, total price, confirm button)
- [ ] Rent confirmation (success message, no actual payment/processing)

**Stack:** Next.js + React + @react-three/drei + Three.js + TailwindCSS + shadcn/ui

**Out of Scope:** Auth, payments, CMS, inventory management, collaboration, drag-and-drop

**Success Criteria:**
- User can browse catalog and select items from all categories
- 3D scene updates in real-time on selection
- Can rotate view to inspect setup from any angle
- Summary view shows all selected items, price, 3D showcase
- Rent confirmation displays success message

---

*Last updated: 2026-05-18*