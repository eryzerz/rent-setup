# Learning Platform Design System

> Extracted from dashboard reference · Compatible with Next.js, shadcn/ui, TailwindCSS

---

## Overview

A clean, minimal learning platform design system with a black sidebar, light content area, and subtle gray backgrounds. The system uses Inter as the primary font with a monochrome accent palette and semantic status colors.

**Design Philosophy:**
- Minimal, content-focused interface
- Black sidebar for strong visual hierarchy
- Subtle shadows and borders for depth
- Clear typography scale with tight tracking on headings
- Generous whitespace between sections

---

## Colors

### Background & Surface

| Token | Hex | OKLch | Tailwind | Usage |
|-------|-----|-------|----------|-------|
| `--bg` | `#F8F9FA` | `oklch(97% 0.002 250)` | `bg-gray-50` | Page background |
| `--surface` | `#FFFFFF` | `oklch(100% 0 0)` | `bg-white` | Cards, panels, inputs |
| `--surface-hover` | `#F3F4F6` | `oklch(96% 0.003 250)` | `bg-gray-100` | Hover states |
| `--sidebar` | `#000000` | `oklch(0% 0 0)` | `bg-black` | Sidebar background |
| `--sidebar-hover` | `#1A1A1A` | `oklch(12% 0.005 250)` | `bg-gray-900` | Sidebar item hover |

### Text

| Token | Hex | OKLch | Tailwind | Usage |
|-------|-----|-------|----------|-------|
| `--fg` | `#1A1A1A` | `oklch(12% 0.005 250)` | `text-gray-900` | Primary text, headings |
| `--fg-secondary` | `#6B7280` | `oklch(55% 0.015 250)` | `text-gray-500` | Secondary text, subtitles |
| `--fg-muted` | `#9CA3AF` | `oklch(70% 0.01 250)` | `text-gray-400` | Muted text, placeholders |
| `--fg-inverse` | `#FFFFFF` | `oklch(100% 0 0)` | `text-white` | Text on dark backgrounds |

### Borders

| Token | Hex | OKLch | Tailwind | Usage |
|-------|-----|-------|----------|-------|
| `--border` | `#E5E7EB` | `oklch(92% 0.005 250)` | `border-gray-200` | Default borders |
| `--border-strong` | `#D1D5DB` | `oklch(87% 0.006 250)` | `border-gray-300` | Strong borders, focus states |

### Semantic / Status

| Token | Hex | OKLch | Tailwind | Usage |
|-------|-----|-------|----------|-------|
| `--success` | `#10B981` | `oklch(76% 0.15 160)` | `text-emerald-500` | Success states, progress |
| `--success-bg` | `#D1FAE5` | `oklch(93% 0.08 160)` | `bg-emerald-100` | Success backgrounds |
| `--warning` | `#F59E0B` | `oklch(82% 0.14 80)` | `text-amber-500` | Warning states, ratings |
| `--warning-bg` | `#FEF3C7` | `oklch(96% 0.08 80)` | `bg-amber-100` | Warning backgrounds |
| `--danger` | `#EF4444` | `oklch(68% 0.18 25)` | `text-red-500` | Danger states, notifications |
| `--danger-bg` | `#FEE2E2` | `oklch(94% 0.08 25)` | `bg-red-100` | Danger backgrounds |
| `--info` | `#3B82F6` | `oklch(65% 0.18 250)` | `text-blue-500` | Info states |
| `--info-bg` | `#DBEAFE` | `oklch(92% 0.08 250)` | `bg-blue-100` | Info backgrounds |
| `--accent` | `#000000` | `oklch(0% 0 0)` | `bg-black` | Primary CTA, active states |
| `--accent-hover` | `#1A1A1A` | `oklch(12% 0.005 250)` | `bg-gray-900` | CTA hover state |

### Chart Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `--chart-line` | `#1F2937` | Line chart stroke |
| `--chart-fill` | `#F3F4F6` | Chart area fill |
| `--chart-dot` | `#000000` | Data point dots |

---

## Typography

### Font Families

```css
--font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
--font-mono: 'JetBrains Mono', 'IBM Plex Mono', ui-monospace, monospace;
```

### Type Scale

| Token | Size | Weight | Tracking | Line Height | Usage |
|-------|------|--------|----------|-------------|-------|
| `--text-4xl` | 48px / 3rem | 700 | -0.02em | 1 | Stat values, hero numbers |
| `--text-3xl` | 32px / 2rem | 700 | -0.02em | 1.2 | Page titles |
| `--text-2xl` | 24px / 1.5rem | 600 | -0.01em | 1.2 | Section headings |
| `--text-xl` | 18px / 1.125rem | 600 | 0 | 1.2 | Card titles, chart titles |
| `--text-lg` | 16px / 1rem | 400 | 0 | 1.5 | Body text |
| `--text-base` | 14px / 0.875rem | 400 | 0 | 1.5 | Default text, card meta |
| `--text-sm` | 12px / 0.75rem | 500 | 0 | 1.5 | Small text, labels, tabs |
| `--text-xs` | 11px / 0.6875rem | 500 | 0 | 1.5 | Captions, chart axis |

### Line Heights

| Token | Value | Usage |
|-------|-------|-------|
| `--leading-tight` | 1.2 | Headings, tight text |
| `--leading-normal` | 1.5 | Body text |
| `--leading-relaxed` | 1.75 | Long-form content |

### Font Weights

| Token | Value | Usage |
|-------|-------|-------|
| `--weight-normal` | 400 | Body text |
| `--weight-medium` | 500 | Labels, small text |
| `--weight-semibold` | 600 | Card titles, section headings |
| `--weight-bold` | 700 | Page titles, stat values |

---

## Spacing

### Scale

| Token | Value | Usage |
|-------|-------|-------|
| `--space-1` | 4px | Tight gaps, icon spacing |
| `--space-2` | 8px | Small gaps, padding |
| `--space-3` | 12px | Medium gaps |
| `--space-4` | 16px | Standard padding |
| `--space-5` | 20px | Button horizontal padding |
| `--space-6` | 24px | Section spacing |
| `--space-8` | 32px | Large section spacing |
| `--space-10` | 40px | Page-level spacing |
| `--space-12` | 48px | Major section breaks |
| `--space-16` | 64px | Page margins |

---

## Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-sm` | 8px | Buttons, inputs, small cards |
| `--radius-md` | 12px | Cards, panels |
| `--radius-lg` | 16px | Large containers, layout demos |
| `--radius-xl` | 24px | Hero sections |
| `--radius-full` | 9999px | Avatars, pills, icon buttons |

---

## Shadows

| Token | Value | Usage |
|-------|-------|-------|
| `--shadow-sm` | `0 1px 2px rgba(0,0,0,0.05)` | Subtle elevation |
| `--shadow-md` | `0 4px 6px -1px rgba(0,0,0,0.07), 0 2px 4px -2px rgba(0,0,0,0.05)` | Card hover |
| `--shadow-lg` | `0 10px 15px -3px rgba(0,0,0,0.08), 0 4px 6px -4px rgba(0,0,0,0.05)` | Dropdowns, modals |
| `--shadow-xl` | `0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.05)` | Large overlays |

---

## Transitions

| Token | Value | Usage |
|-------|-------|-------|
| `--transition-fast` | 150ms ease | Hover states, micro-interactions |
| `--transition-base` | 200ms ease | Standard transitions |
| `--transition-slow` | 300ms ease | Progress animations, page transitions |

---

## Layout

| Token | Value | Usage |
|-------|-------|-------|
| `--sidebar-width` | 80px | Sidebar navigation width |
| `--container-max` | 1200px | Max content width |
| `--header-height` | 64px | Top header height |

---

## Components

### Buttons

#### Primary Button
```html
<button class="btn btn-primary">Continue</button>
```
- Background: `--accent` (#000000)
- Text: `--fg-inverse` (#FFFFFF)
- Padding: `8px 20px`
- Border radius: `8px`
- Font: 12px, 500 weight

#### Secondary Button
```html
<button class="btn btn-secondary">Secondary</button>
```
- Background: transparent
- Border: 1px solid `--border`
- Text: `--fg`
- Padding: `8px 20px`
- Border radius: `8px`

#### Ghost Button
```html
<button class="btn btn-ghost">...</button>
```
- Background: transparent
- Text: `--fg-secondary`
- Padding: `8px`
- Border radius: `8px`

#### Icon Button
```html
<button class="btn btn-icon">
  <svg>...</svg>
</button>
```
- Size: 36x36px
- Border radius: full
- Background: transparent
- Hover: `--surface-hover`

### Inputs

#### Text Input
```html
<input type="text" class="input" placeholder="Enter text...">
```
- Padding: `8px 16px`
- Border: 1px solid `--border`
- Border radius: `8px`
- Focus: border `--accent`, ring 3px rgba(0,0,0,0.08)

#### Search Input
```html
<input type="text" class="input input-search" placeholder="Search courses...">
```
- Same as text input with search icon background

### Cards

#### Course Card
```html
<div class="card">
  <div class="card-body">
    <div class="card-header">
      <div class="card-icon">...</div>
      <div>
        <div class="card-title">Learn Figma</div>
        <div class="card-subtitle">by Christopher Morgan</div>
      </div>
    </div>
    <div class="card-meta">
      <span>6h 30min</span>
      <span class="card-rating">4.9</span>
      <button class="btn btn-primary">View course</button>
    </div>
  </div>
</div>
```
- Background: `--surface`
- Border: 1px solid `--border`
- Border radius: `12px`
- Hover: shadow-md, border-strong

#### Stat Card
```html
<div class="stat-card">
  <div class="stat-value">11</div>
  <div class="stat-label">Courses<br>completed</div>
</div>
```
- Background: `--surface`
- Border: 1px solid `--border`
- Border radius: `12px`
- Padding: `20px`

### Tabs

```html
<div class="tabs">
  <button class="tab active">All Courses</button>
  <button class="tab">The Newest</button>
  <button class="tab">Top Rated</button>
</div>
```
- Border bottom: 1px solid `--border`
- Active: text `--fg`, 2px accent underline
- Inactive: text `--fg-muted`

### Progress Ring

```html
<div class="progress-ring">
  <svg width="40" height="40" viewBox="0 0 40 40">
    <circle class="progress-ring-bg" cx="20" cy="20" r="17"/>
    <circle class="progress-ring-fill" cx="20" cy="20" r="17"/>
  </svg>
  <div class="progress-ring-text">83%</div>
</div>
```
- Size: 40x40px
- Background stroke: `--border`
- Fill stroke: `--success`
- Text: 11px, 600 weight

### Chart

#### Line Chart
- Container: `--surface`, border `--border`, radius `12px`
- Line: `--chart-line` (#1F2937), 2.5px stroke
- Fill: gradient from `--chart-line` at 10% opacity to transparent
- Dots: `--chart-dot` (#000000), 5px radius, white stroke
- Grid lines: `--border`, 1px
- Labels: `--fg-muted`, 11px

### Avatars

```html
<div class="avatar">
  <svg>...</svg>
</div>
```
- Sizes: 28px (sm), 36px (default), 48px (lg)
- Background: `--border`
- Border radius: full

### Notification Badge

```html
<button class="btn btn-icon notification-bell">
  <svg>...</svg>
  <span class="notification-badge"></span>
</button>
```
- Size: 8x8px
- Background: `--danger`
- Border: 2px solid `--surface`
- Position: top-right of bell icon

### Promo / CTA Card

```html
<div class="promo-card">
  <div>
    <div class="promo-title">Learn even more!</div>
    <div class="promo-text">Unlock premium features...</div>
    <button class="btn btn-primary">Go Premium</button>
  </div>
  <div class="promo-illustration">
    <svg>...</svg>
  </div>
</div>
```
- Background: `--surface`
- Border: 1px solid `--border`
- Border radius: `12px`
- Padding: `24px`

### Sidebar

```html
<div class="sidebar-demo">
  <div class="sidebar-logo">...</div>
  <div class="sidebar-item active">...</div>
  <div class="sidebar-item">...</div>
</div>
```
- Width: 80px
- Background: `--sidebar` (#000000)
- Border radius: `16px`
- Items: 40x40px, radius `8px`
- Active: `--sidebar-hover` background, white icon
- Inactive: rgba(255,255,255,0.5) icon

---

## Layout Patterns

### Dashboard Layout

```
┌─────────────────────────────────────────────────────────┐
│ Sidebar (80px) │ Main Content Area                      │
│                │ ┌────────────────────────────────────┐ │
│ [Logo]         │ │ Header: Greeting + Search + Avatar │ │
│ [Home]         │ ├────────────────────────────────────┤ │
│ [Courses]      │ │ Stats Row (2 cards)                │ │
│ [Profile]      │ │ Current Course Card                │ │
│ [Messages]     │ │ Course List with Tabs              │ │
│ [Settings]     │ │                                    │ │
│ [Logout]       │ │ Right Sidebar:                     │ │
│                │ │ - Chart                            │ │
│                │ │ - Promo Card                       │ │
│                │ └────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
```

### Grid System

- 2-column: `grid-template-columns: repeat(2, 1fr)`
- 3-column: `grid-template-columns: repeat(3, 1fr)`
- 4-column: `grid-template-columns: repeat(4, 1fr)`
- 5-column: `grid-template-columns: repeat(5, 1fr)`
- 6-column: `grid-template-columns: repeat(6, 1fr)`

### Responsive Breakpoints

| Breakpoint | Max Width | Changes |
|------------|-----------|---------|
| Wide | 1920px | Full layout |
| Desktop | 1440-1536px | Standard layout |
| Laptop | 1280-1366px | Standard layout |
| Tablet Landscape | 1024-1180px | 3-column grids |
| Tablet Portrait | 768-834px | 2-column grids, stacked layout |
| Mobile | 360-430px | Single column |

---

## TailwindCSS Configuration

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        bg: '#F8F9FA',
        surface: {
          DEFAULT: '#FFFFFF',
          hover: '#F3F4F6',
        },
        sidebar: {
          DEFAULT: '#000000',
          hover: '#1A1A1A',
        },
        fg: {
          DEFAULT: '#1A1A1A',
          secondary: '#6B7280',
          muted: '#9CA3AF',
          inverse: '#FFFFFF',
        },
        border: {
          DEFAULT: '#E5E7EB',
          strong: '#D1D5DB',
        },
        accent: '#000000',
        success: '#10B981',
        'success-bg': '#D1FAE5',
        warning: '#F59E0B',
        'warning-bg': '#FEF3C7',
        danger: '#EF4444',
        'danger-bg': '#FEE2E2',
        info: '#3B82F6',
        'info-bg': '#DBEAFE',
        chart: {
          line: '#1F2937',
          fill: '#F3F4F6',
          dot: '#000000',
        },
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'IBM Plex Mono', 'monospace'],
      },
      fontSize: {
        xs: ['0.6875rem', { lineHeight: '1.5', fontWeight: '500' }],
        sm: ['0.75rem', { lineHeight: '1.5', fontWeight: '500' }],
        base: ['0.875rem', { lineHeight: '1.5', fontWeight: '400' }],
        lg: ['1rem', { lineHeight: '1.5', fontWeight: '400' }],
        xl: ['1.125rem', { lineHeight: '1.2', fontWeight: '600' }],
        '2xl': ['1.5rem', { lineHeight: '1.2', fontWeight: '600', letterSpacing: '-0.01em' }],
        '3xl': ['2rem', { lineHeight: '1.2', fontWeight: '700', letterSpacing: '-0.02em' }],
        '4xl': ['3rem', { lineHeight: '1', fontWeight: '700', letterSpacing: '-0.02em' }],
      },
      borderRadius: {
        sm: '0.5rem',
        md: '0.75rem',
        lg: '1rem',
        xl: '1.5rem',
      },
      boxShadow: {
        sm: '0 1px 2px rgba(0,0,0,0.05)',
        md: '0 4px 6px -1px rgba(0,0,0,0.07), 0 2px 4px -2px rgba(0,0,0,0.05)',
        lg: '0 10px 15px -3px rgba(0,0,0,0.08), 0 4px 6px -4px rgba(0,0,0,0.05)',
        xl: '0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.05)',
      },
      spacing: {
        1: '0.25rem',
        2: '0.5rem',
        3: '0.75rem',
        4: '1rem',
        5: '1.25rem',
        6: '1.5rem',
        8: '2rem',
        10: '2.5rem',
        12: '3rem',
        16: '4rem',
      },
    },
  },
}
```

---

## shadcn/ui Component Mapping

| Design System | shadcn/ui Component | Notes |
|---------------|---------------------|-------|
| `btn-primary` | `<Button>` | variant="default" |
| `btn-secondary` | `<Button>` | variant="outline" |
| `btn-ghost` | `<Button>` | variant="ghost" |
| `btn-icon` | `<Button size="icon">` | variant="ghost" |
| `input` | `<Input>` | Standard input |
| `card` | `<Card>` | Standard card |
| `tabs` | `<Tabs>` | Standard tabs |
| `avatar` | `<Avatar>` | Standard avatar |
| `progress-ring` | Custom SVG | Use `@radix-ui/react-progress` for linear |
| `chart` | Custom SVG | Use `recharts` for data visualization |
| `notification-badge` | `<Badge>` | variant="destructive" |

---

## Usage Guidelines

### Do's
- Use the black sidebar for strong visual hierarchy
- Keep content areas light with `--surface` backgrounds
- Use `--accent` (black) sparingly for primary CTAs only
- Apply subtle shadows on hover for interactive elements
- Maintain consistent 8px grid spacing

### Don'ts
- Don't use gradients on backgrounds
- Don't add colored left borders to cards
- Don't use emoji as icons
- Don't mix serif fonts with this system
- Don't exceed 2px border thickness
- Don't use warm beige/peach backgrounds

---

## File Structure

```
design-system/
── design-system.html      # Interactive component library
├── design-system.md        # This specification
├── tailwind.config.js      # TailwindCSS configuration
└── components/
    ├── Button.tsx          # Button variants
    ├── Card.tsx            # Card components
    ├── Input.tsx           # Input components
    ├── Tabs.tsx            # Tab components
    ├── Avatar.tsx          # Avatar component
    ├── ProgressRing.tsx    # Progress indicator
    ├── Chart.tsx           # Line chart component
    └── Sidebar.tsx         # Sidebar navigation
```

---

*Generated from dashboard reference image · Last updated: 2026*
