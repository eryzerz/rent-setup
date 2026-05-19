'use client';

import { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, ContactShadows, Environment } from '@react-three/drei';
import { SummaryModal } from './SummaryModal';
import { useConfiguratorStore } from '@/stores/useConfiguratorStore';
import { useModelConfig, mergeWithConfig } from '@/contexts/ModelConfigContext';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import * as THREE from 'three';

interface ModelProps {
  url: string;
  position: [number, number, number];
  scale: number;
  rotation?: number[];
}

function Model({ url, position, scale, rotation }: ModelProps) {
  const { scene } = useGLTF(url);
  const cloned = scene.clone();

  const box = new THREE.Box3().setFromObject(cloned);
  const center = new THREE.Vector3();
  box.getCenter(center);
  cloned.position.sub(center);

  if (rotation && rotation.length === 3) {
    cloned.rotation.set(rotation[0], rotation[1], rotation[2]);
  }

  return (
    <group position={position}>
      <primitive object={cloned} scale={scale} />
    </group>
  );
}

function LoadingFallback() {
  return (
    <mesh position={[0, 0.3, 0]}>
      <boxGeometry args={[0.3, 0.3, 0.3]} />
      <meshStandardMaterial color="#666666" wireframe />
    </mesh>
  );
}

function SceneContent() {
  const { config } = useModelConfig();
  const table = useConfiguratorStore((s) => s.table);
  const chair = useConfiguratorStore((s) => s.chair);
  const monitors = useConfiguratorStore((s) => s.monitors);
  const decoratives = useConfiguratorStore((s) => s.decoratives);
  const shelf = useConfiguratorStore((s) => s.shelf);

  const resolvedTable = table ? mergeWithConfig(table, config) : null;
  const resolvedChair = chair ? mergeWithConfig(chair, config) : null;
  const resolvedMonitors = monitors.map(m => mergeWithConfig(m, config));
  const resolvedDecos = decoratives.map(d => mergeWithConfig(d, config));
  const resolvedShelf = shelf ? mergeWithConfig(shelf, config) : null;

  return (
    <>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#252540" />
      </mesh>
      
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <circleGeometry args={[0.05, 16]} />
        <meshStandardMaterial color="#6366f1" />
      </mesh>
      
      {resolvedTable && (
        <Suspense fallback={<LoadingFallback />}>
          <Model
            url={resolvedTable.modelUrl}
            position={resolvedTable.slotPosition}
            scale={resolvedTable.scale}
            rotation={resolvedTable.rotation}
          />
        </Suspense>
      )}
      
      {resolvedChair && (
        <Suspense fallback={<LoadingFallback />}>
          <Model
            url={resolvedChair.modelUrl}
            position={resolvedChair.slotPosition}
            scale={resolvedChair.scale}
            rotation={resolvedChair.rotation}
          />
        </Suspense>
      )}
      
      {resolvedMonitors.map((monitor) => (
        <Suspense key={monitor.id} fallback={<LoadingFallback />}>
          <Model
            url={monitor.modelUrl}
            position={monitor.slotPosition}
            scale={monitor.scale}
            rotation={monitor.rotation}
          />
        </Suspense>
      ))}
      
      {resolvedDecos.map((deco) => (
        <Suspense key={deco.id} fallback={<LoadingFallback />}>
          <Model
            url={deco.modelUrl}
            position={deco.slotPosition}
            scale={deco.scale}
            rotation={deco.rotation}
          />
        </Suspense>
      ))}
      
      {resolvedShelf && (
        <Suspense fallback={<LoadingFallback />}>
          <Model
            url={resolvedShelf.modelUrl}
            position={resolvedShelf.slotPosition}
            scale={resolvedShelf.scale}
            rotation={resolvedShelf.rotation}
          />
        </Suspense>
      )}
    </>
  );
}

export default function ViewportCanvas() {
  const [summaryOpen, setSummaryOpen] = useState(false);
  const selectedCount = useConfiguratorStore((s) => s.getSelectedItems().length);

  return (
    <div className="relative w-full h-full" style={{ height: 'calc(100vh - 80px)' }}>
      <Canvas
        camera={{ position: [4, 3, 4], fov: 50 }}
        style={{ background: '#1a1a2e', width: '100%', height: '100%' }}
      >
        <OrbitControls
          enableDamping
          dampingFactor={0.05}
          minDistance={2}
          maxDistance={15}
          maxPolarAngle={Math.PI / 2}
        />
        
        <ambientLight intensity={1.5} />
        <directionalLight position={[5, 8, 5]} intensity={2} castShadow />
        <directionalLight position={[-3, 5, -3]} intensity={0.8} />
        <Environment preset="studio" />
        
        <ContactShadows
          position={[0, 0, 0]}
          opacity={0.5}
          scale={12}
          blur={2}
          far={4}
        />

        <SceneContent />
      </Canvas>

      <div className="absolute bottom-16 left-4 text-xs text-gray-400">
        Drag to rotate &bull; Scroll to zoom
      </div>

      <div className="absolute bottom-4 right-4">
        <Button
          onClick={() => setSummaryOpen(true)}
          disabled={selectedCount === 0}
          className="gap-2"
        >
          <ShoppingCart className="w-4 h-4" />
          Rent{selectedCount > 0 && ` (${selectedCount})`}
        </Button>
      </div>

      <SummaryModal open={summaryOpen} onOpenChange={setSummaryOpen} />
    </div>
  );
}