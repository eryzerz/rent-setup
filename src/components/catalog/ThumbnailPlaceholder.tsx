'use client';

import type { Category } from '@/types/catalog';

interface ThumbnailPlaceholderProps {
  name: string;
  category: Category;
  size?: number;
}

const CATEGORY_COLORS: Record<Category, string> = {
  table: '#3B82F6',   // blue
  chair: '#10B981',   // green
  monitor: '#8B5CF6', // purple
  decorative: '#F59E0B', // amber
  shelf: '#F43F5E',   // rose
};

const CATEGORY_SHAPES: Record<Category, string> = {
  table: `
    <rect x="15" y="40" width="50" height="25" rx="2" fill="currentColor" opacity="0.9"/>
    <rect x="18" y="35" width="44" height="6" rx="1" fill="currentColor"/>
  `,
  chair: `
    <rect x="30" y="25" width="20" height="30" rx="3" fill="currentColor" opacity="0.9"/>
    <rect x="28" y="55" width="24" height="8" rx="2" fill="currentColor"/>
    <circle cx="32" cy="65" r="4" fill="currentColor"/>
    <circle cx="48" cy="65" r="4" fill="currentColor"/>
  `,
  monitor: `
    <rect x="15" y="20" width="50" height="35" rx="3" fill="currentColor" opacity="0.9"/>
    <rect x="35" y="55" width="10" height="10" fill="currentColor"/>
    <rect x="30" y="65" width="20" height="4" rx="1" fill="currentColor"/>
  `,
  decorative: `
    <ellipse cx="40" cy="55" rx="18" ry="10" fill="currentColor" opacity="0.9"/>
    <ellipse cx="40" cy="40" rx="15" ry="15" fill="currentColor"/>
    <path d="M40 25 L40 15 M35 20 L45 20" stroke="currentColor" stroke-width="2" fill="none"/>
  `,
  shelf: `
    <rect x="20" y="30" width="40" height="5" rx="1" fill="currentColor"/>
    <rect x="20" y="45" width="40" height="5" rx="1" fill="currentColor"/>
    <rect x="20" y="60" width="40" height="5" rx="1" fill="currentColor"/>
    <rect x="20" y="25" width="3" height="40" fill="currentColor"/>
    <rect x="57" y="25" width="3" height="40" fill="currentColor"/>
  `,
};

export function ThumbnailPlaceholder({ name, category, size = 80 }: ThumbnailPlaceholderProps) {
  const color = CATEGORY_COLORS[category];
  const shape = CATEGORY_SHAPES[category];
  
  // Truncate name if too long
  const displayName = name.length > 12 ? name.slice(0, 11) + '…' : name;
  
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      className="rounded-lg"
      style={{ backgroundColor: color }}
    >
      <g style={{ color: 'white' }}>
        <g dangerouslySetInnerHTML={{ __html: shape }} />
      </g>
      <text
        x="40"
        y="75"
        textAnchor="middle"
        fill="white"
        fontSize="8"
        fontWeight="600"
        fontFamily="system-ui, sans-serif"
      >
        {displayName}
      </text>
    </svg>
  );
}