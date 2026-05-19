'use client';

import { useState, useTransition, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { CATALOG_ITEMS } from '@/components/catalog/catalogData';
import { useModelConfig, mergeWithConfig } from '@/contexts/ModelConfigContext';
import type { CatalogItem } from '@/types/catalog';
import { Button } from '@/components/ui/button';
import { Save, RotateCcw } from 'lucide-react';

interface ModelOverrides {
  scale: number;
  position: [number, number, number];
  rotation: [number, number, number];
}

function getItemsByCategory(category: CatalogItem['category']): CatalogItem[] {
  return CATALOG_ITEMS.filter((item) => item.category === category);
}

const tables = getItemsByCategory('table');
const chairs = getItemsByCategory('chair');
const monitors = getItemsByCategory('monitor');
const decoratives = getItemsByCategory('decorative');
const shelves = getItemsByCategory('shelf');

function CenteredModel({ url, position, scale, rotation }: { url: string; position: [number, number, number]; scale: number; rotation: [number, number, number] }) {
  const { scene } = useGLTF(url);
  const cloned = scene.clone();
  
  const box = new THREE.Box3().setFromObject(cloned);
  const center = new THREE.Vector3();
  box.getCenter(center);
  cloned.position.sub(center);
  
  cloned.rotation.set(rotation[0], rotation[1], rotation[2]);
  
  return (
    <group position={position}>
      <primitive object={cloned} scale={scale} />
    </group>
  );
}

function Scene({
  tableModel,
  tableOverrides,
  chairModel,
  chairOverrides,
  monitorModel,
  monitorOverrides,
  decorativeModel,
  decorativeOverrides,
  shelfModel,
  shelfOverrides,
}: {
  tableModel: CatalogItem;
  tableOverrides: ModelOverrides;
  chairModel?: CatalogItem;
  chairOverrides?: ModelOverrides;
  monitorModel?: CatalogItem;
  monitorOverrides?: ModelOverrides;
  decorativeModel?: CatalogItem;
  decorativeOverrides?: ModelOverrides;
  shelfModel?: CatalogItem;
  shelfOverrides?: ModelOverrides;
}) {
  return (
    <>
      <ambientLight intensity={1.5} />
      <directionalLight position={[5, 8, 5]} intensity={2} />
      
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#252540" />
      </mesh>
      
      <gridHelper args={[20, 40, '#333366', '#222244']} position={[0, 0.001, 0]} />
      
      <Suspense fallback={null}>
        <CenteredModel url={tableModel.modelUrl} position={tableOverrides.position} scale={tableOverrides.scale} rotation={tableOverrides.rotation} />
        
        {chairModel && chairOverrides && (
          <CenteredModel url={chairModel.modelUrl} position={chairOverrides.position} scale={chairOverrides.scale} rotation={chairOverrides.rotation} />
        )}
        
        {monitorModel && monitorOverrides && (
          <CenteredModel url={monitorModel.modelUrl} position={monitorOverrides.position} scale={monitorOverrides.scale} rotation={monitorOverrides.rotation} />
        )}
        
        {decorativeModel && decorativeOverrides && (
          <CenteredModel url={decorativeModel.modelUrl} position={decorativeOverrides.position} scale={decorativeOverrides.scale} rotation={decorativeOverrides.rotation} />
        )}
        
        {shelfModel && shelfOverrides && (
          <CenteredModel url={shelfModel.modelUrl} position={shelfOverrides.position} scale={shelfOverrides.scale} rotation={shelfOverrides.rotation} />
        )}
      </Suspense>
    </>
  );
}

function OverrideEditor({ 
  label, 
  overrides, 
  onChange, 
  onSave,
  onReset,
  isSaving,
}: { 
  label: string; 
  overrides: ModelOverrides; 
  onChange: (v: ModelOverrides) => void;
  onSave: () => void;
  onReset: () => void;
  isSaving: boolean;
}) {
  return (
    <div className="bg-gray-800 rounded p-3 mb-3">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-gray-300 text-sm font-medium">{label}</h3>
        <div className="flex gap-1">
          <Button size="icon-xs" variant="ghost" onClick={onReset} title="Reset to original">
            <RotateCcw className="w-3 h-3" />
          </Button>
          <Button size="icon-xs" onClick={onSave} disabled={isSaving} title="Save to catalog">
            <Save className="w-3 h-3" />
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2 text-xs">
        <div>
          <label className="text-gray-500 block mb-1">Scale</label>
          <input
            type="number"
            step="0.0001"
            value={overrides.scale}
            onChange={(e) => onChange({ ...overrides, scale: parseFloat(e.target.value) || 0 })}
            className="w-full bg-gray-700 text-white px-2 py-1 rounded"
          />
        </div>
        <div>
          <label className="text-gray-500 block mb-1">Pos X</label>
          <input
            type="number"
            step="0.01"
            value={overrides.position[0]}
            onChange={(e) => onChange({ ...overrides, position: [parseFloat(e.target.value) || 0, overrides.position[1], overrides.position[2]] })}
            className="w-full bg-gray-700 text-white px-2 py-1 rounded"
          />
        </div>
        <div>
          <label className="text-gray-500 block mb-1">Pos Y</label>
          <input
            type="number"
            step="0.01"
            value={overrides.position[1]}
            onChange={(e) => onChange({ ...overrides, position: [overrides.position[0], parseFloat(e.target.value) || 0, overrides.position[2]] })}
            className="w-full bg-gray-700 text-white px-2 py-1 rounded"
          />
        </div>
        <div>
          <label className="text-gray-500 block mb-1">Pos Z</label>
          <input
            type="number"
            step="0.01"
            value={overrides.position[2]}
            onChange={(e) => onChange({ ...overrides, position: [overrides.position[0], overrides.position[1], parseFloat(e.target.value) || 0] })}
            className="w-full bg-gray-700 text-white px-2 py-1 rounded"
          />
        </div>
        <div>
          <label className="text-gray-500 block mb-1">Rot Y</label>
          <input
            type="number"
            step="0.1"
            value={overrides.rotation[1]}
            onChange={(e) => onChange({ ...overrides, rotation: [0, parseFloat(e.target.value) || 0, 0] })}
            className="w-full bg-gray-700 text-white px-2 py-1 rounded"
          />
        </div>
      </div>
    </div>
  );
}

function getOverridesFromItem(item: CatalogItem, configMap: Record<string, { scale: number; slotPosition: [number, number, number]; rotation: [number, number, number] }>): ModelOverrides {
  const config = configMap[item.id];
  return {
    scale: config?.scale ?? item.scale,
    position: config?.slotPosition ?? item.slotPosition as [number, number, number],
    rotation: config?.rotation ?? item.rotation as [number, number, number],
  };
}

export default function PlaygroundPage() {
  const [, startTransition] = useTransition();
  const [saveStatus, setSaveStatus] = useState<Record<string, 'idle' | 'saving' | 'saved'>>({});
  const { config, updateConfig } = useModelConfig();

  const [tableIndex, setTableIndex] = useState(0);
  const [chairIndex, setChairIndex] = useState(0);
  const [monitorIndex, setMonitorIndex] = useState(0);
  const [decorativeIndex, setDecorativeIndex] = useState(0);
  const [shelfIndex, setShelfIndex] = useState(0);

  const [tableOverrides, setTableOverrides] = useState<ModelOverrides>(() => getOverridesFromItem(tables[0], config));
  const [chairOverrides, setChairOverrides] = useState<ModelOverrides>(() => getOverridesFromItem(chairs[0], config));
  const [monitorOverrides, setMonitorOverrides] = useState<ModelOverrides>(() => getOverridesFromItem(monitors[0], config));
  const [decorativeOverrides, setDecorativeOverrides] = useState<ModelOverrides>(() => getOverridesFromItem(decoratives[0], config));
  const [shelfOverrides, setShelfOverrides] = useState<ModelOverrides>(() => getOverridesFromItem(shelves[0], config));

  const saveItem = async (id: string, overrides: ModelOverrides) => {
    setSaveStatus(prev => ({ ...prev, [id]: 'saving' }));
    try {
      await updateConfig(id, {
        scale: overrides.scale,
        slotPosition: overrides.position,
        rotation: overrides.rotation,
      });
      setSaveStatus(prev => ({ ...prev, [id]: 'saved' }));
      setTimeout(() => setSaveStatus(prev => ({ ...prev, [id]: 'idle' })), 2000);
    } catch {
      setSaveStatus(prev => ({ ...prev, [id]: 'idle' }));
    }
  };

  return (
    <div className="h-screen flex">
      <div className="flex-1 relative">
        <Canvas camera={{ position: [3, 2, 3], fov: 50 }}>
          <OrbitControls />
          <Scene
            tableModel={tables[tableIndex]}
            tableOverrides={tableOverrides}
            chairModel={chairs[chairIndex]}
            chairOverrides={chairOverrides}
            monitorModel={monitors[monitorIndex]}
            monitorOverrides={monitorOverrides}
            decorativeModel={decoratives[decorativeIndex]}
            decorativeOverrides={decorativeOverrides}
            shelfModel={shelves[shelfIndex]}
            shelfOverrides={shelfOverrides}
          />
        </Canvas>
        
        <div className="absolute bottom-4 left-4 text-white text-xs bg-black/60 p-2 rounded">
          Drag to rotate &bull; Scroll to zoom
        </div>
      </div>
      
      <div className="w-[480px] bg-gray-900 p-4 overflow-y-auto">
        <h1 className="text-white text-xl font-bold mb-2">Manual Config Playground</h1>
        <p className="text-gray-500 text-xs mb-4">Configure scale, position (X/Y/Z), and rotation (Y) for each model</p>
        
        <div className="mb-4">
          <label className="block text-gray-400 text-sm mb-1">Table:</label>
          <select
            value={tableIndex}
            onChange={(e) => { 
              const idx = parseInt(e.target.value); 
              setTableIndex(idx); 
              setTableOverrides(getOverridesFromItem(tables[idx], config)); 
            }}
            className="w-full bg-gray-800 text-white px-3 py-2 rounded mb-2"
          >
            {tables.map((m, i) => (
              <option key={m.id} value={i}>{m.name}</option>
            ))}
          </select>
          <OverrideEditor 
            label="Table" 
            overrides={tableOverrides} 
            onChange={setTableOverrides}
            onSave={() => saveItem(tables[tableIndex].id, tableOverrides)}
            onReset={() => setTableOverrides(getOverridesFromItem(tables[tableIndex], config))}
            isSaving={saveStatus[tables[tableIndex].id] === 'saving'}
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-400 text-sm mb-1">Chair:</label>
          <select
            value={chairIndex}
            onChange={(e) => { 
              const idx = parseInt(e.target.value); 
              setChairIndex(idx); 
              setChairOverrides(getOverridesFromItem(chairs[idx], config)); 
            }}
            className="w-full bg-gray-800 text-white px-3 py-2 rounded mb-2"
          >
            {chairs.map((m, i) => (
              <option key={m.id} value={i}>{m.name}</option>
            ))}
          </select>
          <OverrideEditor 
            label="Chair" 
            overrides={chairOverrides} 
            onChange={setChairOverrides}
            onSave={() => saveItem(chairs[chairIndex].id, chairOverrides)}
            onReset={() => setChairOverrides(getOverridesFromItem(chairs[chairIndex], config))}
            isSaving={saveStatus[chairs[chairIndex].id] === 'saving'}
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-400 text-sm mb-1">Monitor:</label>
          <select
            value={monitorIndex}
            onChange={(e) => { 
              const idx = parseInt(e.target.value); 
              setMonitorIndex(idx); 
              setMonitorOverrides(getOverridesFromItem(monitors[idx], config)); 
            }}
            className="w-full bg-gray-800 text-white px-3 py-2 rounded mb-2"
          >
            {monitors.map((m, i) => (
              <option key={m.id} value={i}>{m.name}</option>
            ))}
          </select>
          <OverrideEditor 
            label="Monitor" 
            overrides={monitorOverrides} 
            onChange={setMonitorOverrides}
            onSave={() => saveItem(monitors[monitorIndex].id, monitorOverrides)}
            onReset={() => setMonitorOverrides(getOverridesFromItem(monitors[monitorIndex], config))}
            isSaving={saveStatus[monitors[monitorIndex].id] === 'saving'}
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-400 text-sm mb-1">Decorative:</label>
          <select
            value={decorativeIndex}
            onChange={(e) => { 
              const idx = parseInt(e.target.value); 
              setDecorativeIndex(idx); 
              setDecorativeOverrides(getOverridesFromItem(decoratives[idx], config)); 
            }}
            className="w-full bg-gray-800 text-white px-3 py-2 rounded mb-2"
          >
            {decoratives.map((m, i) => (
              <option key={m.id} value={i}>{m.name}</option>
            ))}
          </select>
          <OverrideEditor 
            label="Decorative" 
            overrides={decorativeOverrides} 
            onChange={setDecorativeOverrides}
            onSave={() => saveItem(decoratives[decorativeIndex].id, decorativeOverrides)}
            onReset={() => setDecorativeOverrides(getOverridesFromItem(decoratives[decorativeIndex], config))}
            isSaving={saveStatus[decoratives[decorativeIndex].id] === 'saving'}
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-400 text-sm mb-1">Shelf:</label>
          <select
            value={shelfIndex}
            onChange={(e) => { 
              const idx = parseInt(e.target.value); 
              setShelfIndex(idx); 
              setShelfOverrides(getOverridesFromItem(shelves[idx], config)); 
            }}
            className="w-full bg-gray-800 text-white px-3 py-2 rounded mb-2"
          >
            {shelves.map((m, i) => (
              <option key={m.id} value={i}>{m.name}</option>
            ))}
          </select>
          <OverrideEditor 
            label="Shelf" 
            overrides={shelfOverrides} 
            onChange={setShelfOverrides}
            onSave={() => saveItem(shelves[shelfIndex].id, shelfOverrides)}
            onReset={() => setShelfOverrides(getOverridesFromItem(shelves[shelfIndex], config))}
            isSaving={saveStatus[shelves[shelfIndex].id] === 'saving'}
          />
        </div>
      </div>
    </div>
  );
}