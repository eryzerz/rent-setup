'use client';

import { Suspense } from 'react';
import { useGLTF } from '@react-three/drei';
import type { Vector3Tuple } from 'three';

interface FurnitureModelProps {
  modelUrl: string;
  position?: Vector3Tuple;
  scale?: number | Vector3Tuple;
}

function FurnitureModelInner({ modelUrl, position = [0, 0, 0], scale = 1 }: FurnitureModelProps) {
  const { scene } = useGLTF(modelUrl);

  return (
    <group position={position}>
      <primitive object={scene} scale={scale} />
    </group>
  );
}

export function FurnitureModel(props: FurnitureModelProps) {
  return (
    <Suspense fallback={null}>
      <FurnitureModelInner {...props} />
    </Suspense>
  );
}

// Preload models for better performance
export function preloadModel(modelUrl: string) {
  useGLTF.preload(modelUrl);
}