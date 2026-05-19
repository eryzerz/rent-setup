This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Limitations
- Model placement is currently fixed — users cannot drag-and-drop to reposition items. A workaround exists at `/playground` for manual position/scale/rotation adjustment via sliders.

## Approach & Tech Stack

Built with **Next.js 16** (App Router), **React**, and **@react-three/drei** for 3D rendering. 3D models (.glb) are lazy-loaded via `useGLTF` with an in-memory Zustand store for state management. No backend — purely client-side for this prototype.

## What I'd Add With More Time

- **Drag-and-drop positioning**: raycasting on the ground plane with snap-to-grid
- **Persistence**: save configurations to localStorage or a lightweight backend
- **Mobile-responsive 3D**: touch controls and simplified viewports for smaller screens
- **Model collision detection**: prevent overlapping items
- **Snapshot export**: generate images/PDFs of the configured workspace
- **Auth & Payment process**
