# Portfolio Design Guidelines

## Design Approach
**Reference-Based Strategy**: Drawing inspiration from Behance, Dribbble, and Awwwards portfolios that prioritize visual impact. This portfolio breaks from traditional hero patterns by leading with work immediately.

## Layout Strategy

**Viewport-First Approach**: No traditional hero section. Instead, open with an immersive masonry grid showcasing projects immediately - visitors see your work within the first viewport, not marketing copy.

**Container System**:
- Main content: max-w-7xl
- Project grids: Full-width with inner max-w-7xl
- Project detail pages: max-w-4xl for text, full-width for images
- Admin interface: max-w-6xl

**Spacing Primitives**: Use Tailwind units of 4, 6, 8, 12, and 16 consistently throughout (p-4, m-8, gap-6, py-12, etc.)

## Typography Hierarchy

**Font Families** (Google Fonts):
- Display: 'Inter' - weights 700, 800 for headings
- Body: 'Inter' - weights 400, 500 for content
- Accent: 'JetBrains Mono' - weight 500 for metadata/tags (optional code/tech mentions)

**Scale**:
- Project titles (grid): text-xl md:text-2xl font-bold
- Project titles (detail): text-4xl md:text-5xl font-bold
- Section headings: text-2xl md:text-3xl font-bold
- Body text: text-base md:text-lg
- Metadata/tags: text-sm font-mono
- Admin labels: text-sm font-medium

## Component Library

### Navigation
Minimal fixed header (h-16) with:
- Logo/name (left)
- Navigation links: Projects, About, Contact (center)
- Admin login button (right, when not authenticated)
Transparent background with backdrop-blur-md when scrolling over content

### Project Grid (Homepage)
Masonry layout using CSS columns (column-count: 1 md:2 lg:3):
- Project cards with aspect ratios that vary naturally
- Hover state: scale-105 transition with overlay showing title + brief description
- No forced uniform heights - let images breathe
- Gap: gap-6 md:gap-8

Each card contains:
- Project image (full card width)
- Overlay on hover with blur backdrop
- Title + 1-line description
- Tech stack pills/badges

### Project Detail Page
Full-bleed hero image (h-[60vh] with project title overlaid)
Content section with:
- Project description (max-w-prose)
- Tech stack chips
- Project metadata (date, client, role)
- Image gallery (2-column grid: grid-cols-1 md:grid-cols-2 gap-4)
- Live link + GitHub buttons (if applicable)

### Admin Interface
Clean dashboard with:
- Project list table (sortable)
- Add/Edit forms with:
  - Title input
  - Rich text description editor
  - Image upload dropzone with preview
  - Tech stack tag input
  - Date picker
  - Link fields (live site, repository)
- Delete confirmation modals

### Footer
Simple footer (py-12) with:
- Social links (GitHub, LinkedIn, Twitter, Dribbble)
- Contact email
- Copyright notice
Single-column centered layout

## Interactions & Animations

**Minimal Animation Budget**:
- Project card hover: Smooth scale + opacity transitions (300ms)
- Page transitions: None - instant navigation
- Image loading: Fade-in once loaded
- Admin actions: Simple success/error toast notifications

**No scroll animations** - let the work speak for itself

## Images

**Essential Images**:
1. **Project Thumbnails**: Featured image for each project (16:9 or 4:3 aspect ratio recommended)
2. **Project Detail Galleries**: Multiple images per project showing different aspects/views
3. **No generic hero background** - portfolio leads directly with project grid

**Image Guidelines**:
- High-quality project screenshots/photography
- Consistent aspect ratios per project (but can vary between projects)
- Optimized for web (WebP format preferred)
- Responsive srcset for different viewport sizes

## Responsive Behavior

**Breakpoints**:
- Mobile: Single-column grid, stacked layout
- Tablet (md:): 2-column masonry
- Desktop (lg:): 3-column masonry
- Admin: Switches to single-column form layout on mobile

**Mobile Considerations**:
- Navigation collapses to hamburger menu
- Project cards stack vertically
- Reduced padding (py-8 instead of py-16)
- Touch-friendly tap targets (min h-12)

## Admin-Specific Design

Clean, functional interface prioritizing:
- Clear form labels and input states
- Drag-and-drop image upload zones
- Inline editing where possible
- Prominent save/cancel actions
- Data tables with search/filter capabilities