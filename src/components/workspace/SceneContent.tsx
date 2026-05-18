'use client';

import { useConfiguratorStore } from '@/stores/useConfiguratorStore';
import { FurnitureModel } from './FurnitureModel';
import type { CatalogItem } from '@/types/catalog';
import type { Vector3Tuple } from 'three';
import type { Category } from '@/types/catalog';

// Auto-position configuration based on plan specs
const POSITION_CONFIG = {
  table: { position: [0, 0, 0] as Vector3Tuple, scale: 1 },
  chair: { position: [0, 0, -1.5] as Vector3Tuple, scale: 1 },
  monitor: { position: [0, 0.75, 0.3] as Vector3Tuple, scale: 1 },
  shelf: { position: [-2, 0, 0] as Vector3Tuple, scale: 1 },
  decorative: { position: [0, 0.75, 0.3] as Vector3Tuple, scale: 1 },
};

// Monitor slot offsets for up to 3 monitors (side by side on desk)
const MONITOR_SLOTS: Vector3Tuple[] = [
  [-1.0, 0.75, 0.3],
  [0, 0.75, 0.3],
  [1.0, 0.75, 0.3],
];

// Decorative item offsets around the desk
const DECORATIVE_SLOTS: Vector3Tuple[] = [
  [0.8, 0.75, 0.3],   // right front
  [-0.8, 0.75, 0.3],  // left front
  [0.7, 0.75, 0.2],   // right mid
  [-0.7, 0.75, 0.2],  // left mid
];

interface SceneItemProps {
  item: CatalogItem;
  position: Vector3Tuple;
  scale?: number;
}

function SceneItem({ item, position, scale = 1 }: SceneItemProps) {
  return (
    <FurnitureModel
      modelUrl={item.modelUrl}
      position={position}
      scale={scale}
    />
  );
}

export function SceneContent() {
  const table = useConfiguratorStore((s) => s.table);
  const chair = useConfiguratorStore((s) => s.chair);
  const monitors = useConfiguratorStore((s) => s.monitors);
  const decoratives = useConfiguratorStore((s) => s.decoratives);
  const shelf = useConfiguratorStore((s) => s.shelf);

  return (
    <group>
      {/* Table */}
      {table && (
        <SceneItem
          item={table}
          position={POSITION_CONFIG.table.position}
          scale={POSITION_CONFIG.table.scale}
        />
      )}

      {/* Chair */}
      {chair && (
        <SceneItem
          item={chair}
          position={POSITION_CONFIG.chair.position}
          scale={POSITION_CONFIG.chair.scale}
        />
      )}

      {/* Monitors - up to 3 side by side */}
      {monitors.map((monitor, index) => {
        const slot = MONITOR_SLOTS[index] ?? MONITOR_SLOTS[MONITOR_SLOTS.length - 1];
        return (
          <SceneItem
            key={monitor.id}
            item={monitor}
            position={slot}
          />
        );
      })}

      {/* Decorative items - positioned around desk */}
      {decoratives.map((deco, index) => {
        const slot = DECORATIVE_SLOTS[index % DECORATIVE_SLOTS.length];
        return (
          <SceneItem
            key={deco.id}
            item={deco}
            position={slot}
          />
        );
      })}

      {/* Shelves */}
      {shelf && (
        <SceneItem
          item={shelf}
          position={POSITION_CONFIG.shelf.position}
          scale={POSITION_CONFIG.shelf.scale}
        />
      )}
    </group>
  );
}