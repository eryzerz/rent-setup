'use client';

import { CatalogSidebar } from './CatalogSidebar';
import ViewportCanvas from './ViewportCanvas';

export default function WorkspaceConfigurator() {
  return (
    <div className="flex h-screen w-full bg-bg overflow-hidden">
      <CatalogSidebar />
      <div className="flex-1 relative">
        <ViewportCanvas />
      </div>
    </div>
  );
}