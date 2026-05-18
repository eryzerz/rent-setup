'use client';

import dynamic from 'next/dynamic';
import { CatalogSidebar } from './CatalogSidebar';
import { SelectedItemsBar } from './SelectedItemsBar';

// Dynamically import the 3D canvas to avoid SSR issues
const ViewportCanvas = dynamic(
  () => import('./ViewportCanvas'),
  { ssr: false, loading: () => <div className="w-full h-full bg-black/50 animate-pulse" /> }
);

export default function WorkspaceConfigurator() {
  return (
    <div className="flex h-screen w-full bg-bg">
      {/* Left Panel - Catalog Sidebar */}
      <CatalogSidebar />

      {/* Right Panel - 3D Viewport */}
      <div className="flex-1 relative">
        <ViewportCanvas />

        {/* Selected items bar at bottom */}
        <SelectedItemsBar />
      </div>
    </div>
  );
}