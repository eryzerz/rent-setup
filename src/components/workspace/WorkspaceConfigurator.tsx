'use client';

import { CatalogSidebar } from './CatalogSidebar';
import { SelectedItemsBar } from './SelectedItemsBar';
import ViewportCanvas from './ViewportCanvas';

export default function WorkspaceConfigurator() {
  return (
    <div className="flex h-screen w-full bg-bg overflow-hidden">
      <CatalogSidebar />
      <div className="flex-1 relative">
        <ViewportCanvas />
        <SelectedItemsBar />
      </div>
    </div>
  );
}