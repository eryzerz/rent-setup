'use client';

import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import { SceneContent } from './SceneContent';
import { SummaryModal } from './SummaryModal';
import { useConfiguratorStore } from '@/stores/useConfiguratorStore';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';

export default function ViewportCanvas() {
  const [summaryOpen, setSummaryOpen] = useState(false);
  const { getSelectedItems } = useConfiguratorStore();
  const selectedCount = getSelectedItems().length;

  return (
    <div className="relative w-full h-full">
      <Canvas
        camera={{ position: [4, 3, 4], fov: 50 }}
        style={{ background: '#0a0a0a' }}
      >
        <OrbitControls
          enableDamping
          dampingFactor={0.05}
          minDistance={2}
          maxDistance={15}
          maxPolarAngle={Math.PI / 2}
        />
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 8, 5]} intensity={1} castShadow />
        <Environment preset="city" />
        <ContactShadows
          position={[0, -0.01, 0]}
          opacity={0.4}
          scale={10}
          blur={2}
          far={4}
        />

        <SceneContent />
      </Canvas>

      {/* Camera controls hint */}
      <div className="absolute bottom-4 left-4 text-xs text-gray-400">
        Drag to rotate &bull; Scroll to zoom
      </div>

      {/* Rent button - bottom right */}
      <div className="absolute bottom-4 right-4">
        <Button
          onClick={() => setSummaryOpen(true)}
          disabled={selectedCount === 0}
          className="gap-2"
        >
          <ShoppingCart className="w-4 h-4" />
          Rent
        </Button>
      </div>

      <SummaryModal open={summaryOpen} onOpenChange={setSummaryOpen} />
    </div>
  );
}