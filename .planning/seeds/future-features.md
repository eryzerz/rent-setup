---
title: Future Features Expansion
trigger_condition: When the 3D Workspace Configurator prototype proves concept viability
planted_date: 2026-05-18
status: seed
---

## Rationale

The prototype is intentionally scoped to 8 hours: single-user, no backend, no payments. This seed captures features that would unlock in a more mature version.

## Feature Candidates

### Drag-and-Drop Positioning
Allow users to reposition items in the 3D scene manually instead of auto-positioning. Requires raycasting, collision detection, position constraints.
**Complexity:** Medium-High | **Priority:** Low

### Real-Time Collaboration (Liveblocks)
Enable friends or colleagues to co-configure a workspace together. See each other's selections live, chat about it, share the setup.
**Complexity:** High | **Priority:** Low

### User Accounts
Save configurations across sessions, view rental history, favorite setups.
**Complexity:** Medium | **Priority:** Medium

### Payment Flow
Actual checkout process with Stripe or similar. Handle successful/failed payments, receipts.
**Complexity:** Medium | **Priority:** High (required for real business)

### Inventory Management / CMS
Admin interface to add/remove items, update pricing, manage stock levels.
**Complexity:** Medium | **Priority:** Medium

### Multi-Asset Scenes
Beyond single items — allow users to pick entire "layout presets" (home office, gaming setup, minimalist desk) that load a pre-configured scene.
**Complexity:** Low-Medium | **Priority:** Low

### AR Preview
Let users view their configured workspace in their actual room using AR on mobile.
**Complexity:** High | **Priority:** Low

### Social Sharing
Generate a shareable link or image of the configured setup. "Check out my dream workspace."
**Complexity:** Low | **Priority:** Medium

## Recommended Next Steps (Post-Prototype)

1. **Add payment flow first** — without it, the app can't actually transact
2. **User accounts second** — enables persistence, history, personalization
3. **CMS third** — enables non-developer item management
4. **Drag-and-drop fourth** — adds fun factor without adding business value

## Notes

- Liveblocks skipped for prototype but was mentioned early — consider re-evaluating if collaboration becomes a selling point
- Inventory management could use headless CMS like Sanity or Contentful
- AR preview depends on having a solid 3D asset library