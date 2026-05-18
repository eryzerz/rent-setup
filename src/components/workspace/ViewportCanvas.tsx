'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import { SceneContent } from './SceneContent';

export default function ViewportCanvas() {
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
    </div>
  );
}