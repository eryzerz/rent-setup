'use client';

import { Suspense, useEffect, useState } from 'react';
import { useGLTF } from '@react-three/drei';
import type { Vector3Tuple } from 'three';
import * as THREE from 'three';

interface FurnitureModelProps {
  modelUrl: string;
  position?: Vector3Tuple;
  scale?: number | Vector3Tuple;
}

function ErrorFallback({ message }: { message: string }) {
  return (
    <mesh>
      <boxGeometry args={[0.4, 0.4, 0.4]} />
      <meshStandardMaterial color="#ff6b6b" wireframe />
    </mesh>
  );
}

function ModelContent({ modelUrl, position, scale }: FurnitureModelProps) {
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    console.log('Loading model:', modelUrl);
  }, [modelUrl]);
  
  try {
    const { scene } = useGLTF(modelUrl);
    
    useEffect(() => {
      console.log('Model loaded:', modelUrl);
    }, [modelUrl]);
    
    // Clone the scene to avoid sharing issues
    const clonedScene = scene.clone();
    
    // Ensure materials are ready
    clonedScene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        if (Array.isArray(child.material)) {
          child.material.forEach((m) => {
            m.transparent = true;
          });
        } else if (child.material) {
          child.material.transparent = true;
        }
      }
    });
    
    return (
      <group position={position}>
        <primitive object={clonedScene} scale={scale} />
      </group>
    );
  } catch (err) {
    console.error('Model load error:', err);
    setError(String(err));
    return <ErrorFallback message={error || 'Failed to load model'} />;
  }
}

// Loading placeholder
function LoadingPlaceholder() {
  return (
    <mesh position={[0, 0.3, 0]}>
      <boxGeometry args={[0.3, 0.3, 0.3]} />
      <meshStandardMaterial color="#666666" />
    </mesh>
  );
}

export function FurnitureModel({ modelUrl, position = [0, 0, 0], scale = 1 }: FurnitureModelProps) {
  return (
    <Suspense fallback={<LoadingPlaceholder />}>
      <ModelContent modelUrl={modelUrl} position={position} scale={scale} />
    </Suspense>
  );
}

export function preloadModel(modelUrl: string) {
  useGLTF.preload(modelUrl);
}