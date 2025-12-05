# Portfolio Application

## Overview

This is a modern portfolio web application built to showcase creative projects with a visual-first approach. The application features a masonry grid layout for displaying projects, detailed project pages, and an admin interface for content management. Built with React and Express, it emphasizes visual impact over traditional marketing-focused layouts, drawing inspiration from design portfolio platforms like Behance and Dribbble.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- React with TypeScript for type-safe component development
- Vite as the build tool and development server for fast hot module replacement
- Wouter for lightweight client-side routing instead of React Router
- TanStack Query (React Query) for server state management and data fetching

**UI Component System**
- Shadcn/ui component library (New York style variant) providing accessible, customizable components built on Radix UI primitives
- Tailwind CSS for utility-first styling with custom design tokens
- Class Variance Authority (CVA) for type-safe component variant management
- Custom theming system supporting light/dark modes with CSS variables

**Design System**
- Typography: Inter font family for display and body text, JetBrains Mono for code/metadata
- Viewport-first layout strategy with no traditional hero section - projects displayed immediately
- Masonry grid layout using CSS columns for natural, varied aspect ratios
- Responsive breakpoints using Tailwind's built-in system
- Consistent spacing primitives (4, 6, 8, 12, 16 Tailwind units)

**State Management**
- React Query for asynchronous server state with automatic caching and refetching
- React Hook Form with Zod validation for form state and validation
- Context API for global UI state (theme provider)
- Local component state for UI interactions

### Backend Architecture

**Server Framework**
- Express.js for HTTP server and API routing
- TypeScript for type safety across the stack
- Custom middleware for request logging and JSON body parsing
- HTTP server with potential WebSocket support infrastructure

**API Design**
- RESTful API endpoints under `/api` prefix
- Resource-based routing for projects (`/api/projects`, `/api/projects/:id`)
- Standard HTTP methods (GET, POST, PATCH, DELETE)
- JSON request/response format
- Error handling with appropriate status codes

**Data Layer**
- Drizzle ORM configured for PostgreSQL database interactions
- Type-safe schema definitions with Zod validation integration
- In-memory storage fallback implementation (MemStorage) for development/testing
- Storage interface pattern for easy database backend swapping

**Database Schema**
- Projects table with fields:
  - Basic info: id, title, description, shortDescription
  - Media: imageUrl, galleryImages (array)
  - Metadata: techStack (array), liveUrl, repoUrl, client, role, date
- Schema defined using Drizzle's pgTable with TypeScript inference
- Validation schemas derived from database schema using drizzle-zod

### Build & Deployment

**Development Mode**
- Vite dev server with HMR running on frontend
- Express server with tsx for TypeScript execution
- Concurrent development with API proxy configuration
- Source map support for debugging

**Production Build**
- Two-stage build process:
  1. Vite builds client into `dist/public`
  2. esbuild bundles server code into `dist/index.cjs`
- Server dependencies bundled (allowlist strategy) to reduce syscalls and improve cold start
- Static file serving from built client directory
- Single-file server bundle for simplified deployment

**Environment Configuration**
- DATABASE_URL environment variable required for PostgreSQL connection
- NODE_ENV for development/production mode switching
- Replit-specific plugins for development tools (cartographer, dev banner, error overlay)

### Rendering Strategy

**Client-Side Rendering (CSR)**
- Single Page Application architecture
- Client-side routing with Wouter
- API data fetching on component mount
- Loading states and skeletons for async data
- 404 fallback routing handled by Express serving index.html

### Path Aliases & Module Resolution

**TypeScript Path Mapping**
- `@/*` → `client/src/*` for frontend code
- `@shared/*` → `shared/*` for shared types/schemas
- `@assets/*` → `attached_assets/*` for static assets
- Vite configured to resolve these aliases during build

## External Dependencies

### UI Component Libraries
- **Radix UI**: Headless, accessible component primitives (dialogs, dropdowns, popovers, tooltips, etc.)
- **Embla Carousel**: Carousel/slider functionality
- **cmdk**: Command palette component
- **Lucide React**: Icon library

### Data & Validation
- **Drizzle ORM**: PostgreSQL ORM with type-safe query building
- **Zod**: Runtime type validation and schema definition
- **drizzle-zod**: Bridge between Drizzle schemas and Zod validation

### Form Management
- **React Hook Form**: Performant form state management
- **@hookform/resolvers**: Zod resolver integration for form validation

### Database
- **PostgreSQL**: Primary database (configured via DATABASE_URL)
- **pg**: PostgreSQL client driver
- **connect-pg-simple**: PostgreSQL session store (infrastructure for session management)

### Styling
- **Tailwind CSS**: Utility-first CSS framework
- **tailwindcss-animate**: Animation utilities
- **class-variance-authority**: Component variant API
- **clsx / tailwind-merge**: Class name utilities

### Development Tools
- **Vite**: Build tool and dev server
- **esbuild**: JavaScript bundler for server code
- **tsx**: TypeScript execution engine
- **@replit/vite-plugin-***: Replit-specific development enhancements

### Utilities
- **date-fns**: Date manipulation and formatting
- **nanoid**: Unique ID generation
- **crypto**: UUID generation (Node.js built-in)