/**
 * Script to calculate scale factors for GLTF models
 * Run: npx tsx scripts/calculate-model-scales.ts
 */

import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { join } from 'path';

// Target sizes (in meters) for each category
const TARGET_SIZES: Record<string, number> = {
  table: 1.2,
  chair: 0.6,
  monitor: 0.6,
  decorative: 0.3,
  shelf: 0.8,
};

const MODELS = [
  { name: 'computer_desk', category: 'table', file: 'public/models/computer_desk.glb' },
  { name: 'modern_computer_desk', category: 'table', file: 'public/models/modern_computer_desk.glb' },
  { name: 'wood_desk', category: 'table', file: 'public/models/wooden_desk.glb' },
  { name: 'gaming_chair', category: 'chair', file: 'public/models/gaming_chair.glb' },
  { name: 'office_chair', category: 'chair', file: 'public/models/office_chair.glb' },
  { name: 'plastic_chair', category: 'chair', file: 'public/models/plastic_chair.glb' },
  { name: 'monitor', category: 'monitor', file: 'public/models/monitor.glb' },
  { name: 'curved_monitor', category: 'monitor', file: 'public/models/curved_monitor.glb' },
  { name: 'ultrawide_monitor', category: 'monitor', file: 'public/models/ultrawide_monitor.glb' },
  { name: 'desk_lamp', category: 'decorative', file: 'public/models/desk_lamp.glb' },
  { name: 'sci-fi_desk_lamp', category: 'decorative', file: 'public/models/sci-fi_desk_lamp.glb' },
  { name: 'fake_plant', category: 'decorative', file: 'public/models/fake_plant.glb' },
  { name: 'pencil_holder', category: 'decorative', file: 'public/models/pencil_holder.glb' },
  { name: 'modern_bookshelf', category: 'shelf', file: 'public/models/modern_bookshelf.glb' },
  { name: 'wooden_bookshelf', category: 'shelf', file: 'public/models/wooden_bookshelf.glb' },
  { name: 'mounted_bookshelf', category: 'shelf', file: 'public/models/mounted_bookshelf.glb' },
];

const PROJECT_ROOT = process.cwd();

function loadGLTF(filePath: string): Promise<THREE.Group> {
  return new Promise((resolve, reject) => {
    const loader = new GLTFLoader();
    const absolutePath = join(PROJECT_ROOT, filePath);
    
    loader.load(
      `file://${absolutePath}`,
      (gltf) => resolve(gltf.scene),
      undefined,
      (error) => reject(error)
    );
  });
}

function getBoundingBoxSize(group: THREE.Group): THREE.Vector3 {
  const box = new THREE.Box3().setFromObject(group);
  return box.getSize(new THREE.Vector3());
}

function calculateScale(size: THREE.Vector3, targetWidth: number): number {
  const maxDim = Math.max(size.x, size.y, size.z);
  return maxDim > 0 ? targetWidth / maxDim : 1;
}

async function analyzeModels() {
  console.log('\n🧮 Model Scale Analysis\n');
  console.log('═'.repeat(60));
  
  const results: Record<string, { w: number; h: number; d: number; scale: number }> = {};
  
  for (const model of MODELS) {
    try {
      const scene = await loadGLTF(model.file);
      const size = getBoundingBoxSize(scene);
      const targetWidth = TARGET_SIZES[model.category] || 1;
      const scale = calculateScale(size, targetWidth);
      
      results[model.name] = {
        w: Math.round(size.x * 1000) / 1000,
        h: Math.round(size.y * 1000) / 1000,
        d: Math.round(size.z * 1000) / 1000,
        scale: Math.round(scale * 1000) / 1000,
      };
      
      console.log(`\n📦 ${model.name}`);
      console.log(`   Size: ${size.x.toFixed(3)}m × ${size.y.toFixed(3)}m × ${size.z.toFixed(3)}m`);
      console.log(`   Target: ${targetWidth}m wide`);
      console.log(`   Scale: ${scale.toFixed(3)}`);
      
    } catch (error) {
      console.log(`\n❌ ${model.name}: ${error}`);
    }
  }
  
  console.log('\n\n📋 For catalogData.ts:\n');
  console.log('═'.repeat(60));
  
  for (const [name, data] of Object.entries(results)) {
    console.log(`  '${name}': ${data.scale},`);
  }
  
  console.log('\n✅ Done!\n');
}

analyzeModels().catch(console.error);