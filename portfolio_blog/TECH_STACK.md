# Tech Stack & Blueprint

## Platform & Rendering
- **Next.js 16** with the **App Router** enabled (`src/app/`). React 19 powers the UI with the new compiler enabled via `reactCompiler: true` in `next.config.ts`.
- Routes live inside `src/app/` with dynamic routes for blog posts and projects (e.g., `src/app/blog/[slug]/page.tsx`). Content is authored in Markdown/MDX files stored in `content/` with frontmatter metadata, then compiled and rendered at runtime using `next-mdx-remote`.
- Core routes implemented: `/` (home), `/blog` (post index + detail), `/projects` (project index + detail), `/about`, `/uses`.

## Styling & Design System
- **Tailwind CSS 4** via `@import "tailwindcss"` in `globals.css`, combined with the `tw-animate-css` plugin for reusable animation classes.
- **Custom Color Palette** with `@theme inline` in `globals.css`:
  - **Crème Background**: `hsl(40 33% 93%)` – warm, off-white primary background
  - **Copper Primary**: `hsl(28 56% 46%)` – warm metallic accent for buttons, links, highlights
  - **Warm Charcoal Foreground**: `hsl(30 6% 16%)` – dark text on light backgrounds
  - **Card Background**: `hsl(36 25% 89%)` – slightly tinted white for card components
- **Custom Animations**:
  - `spin-slow`: 20s linear infinite rotation
  - `fade-in-up`: 0.8s ease-out fade with upward translation
  - `bounce-soft`: 1s ease-in-out subtle bounce
- **Blueprint Grid Pattern**: Dual-layer linear gradient background (horizontal + vertical lines at 40px intervals, 8% opacity) for visual texture.
- **Utility Classes**: `bg-copper-gradient`, `text-copper`, `shadow-soft`, `shadow-hover`, `border-copper` for consistent copper theming across components.
- **shadcn/ui** configuration in `components.json` with new-york design kit and Lucide icons. Components scaffold into `src/components/ui/` with full TypeScript support.
- `src/lib/utils.ts` exports the `cn` helper (clsx + tailwind-merge) for safe class composition.

## Typography
- Fonts provided through `next/font/google` in `layout.tsx`:
  - **DM Serif Display** (serif, 400 weight): Headings and display text for elegant visual hierarchy
  - **Source Sans 3** (sans-serif, 300/400/600 weights): Body text and general content
  - **JetBrains Mono** (monospace, 400/600 weights): Labels, navigation, code-like elements
- Font variables injected into `<body>` via CSS custom properties for use in Tailwind classes.

## Components & UI
- **shadcn/ui Components**: Button (copper variants), Card (with Header/Title/Description/Content/Footer), Badge (subtle border style), Avatar (image + fallback), Separator.
- **Custom Layout Components**:
  - `SiteHeader`: Sticky header with copper gradient logo, uppercase mono navigation
  - `SiteFooter`: Footer with copyright and tech attribution
  - `PageContainer`: Max-width wrapper for consistent content width
- **Icon Library**: lucide-react (0.561.0) for consistent, lightweight UI icons with hover animations.
- **Radix UI**: Underlying component primitives (@radix-ui/react-slot, @radix-ui/react-avatar, @radix-ui/react-separator) for unstyled, accessible building blocks.

## Content Pipeline & Data Management
- **MDX with Frontmatter**: Content stored in `content/posts/` and `content/projects/` as `.mdx` files with YAML frontmatter.
- **Content Loaders** (`src/lib/content.ts`): gray-matter powered utilities for parsing, filtering, and sorting:
  - `loadPosts()`: Fetch all published blog posts, sorted by date (newest first)
  - `loadPost(slug)`: Fetch single post by slug with full metadata
  - `loadProjects()`: Fetch all projects, sorted by featured status then title
  - `loadProject(slug)`: Fetch single project by slug
- **MDX Compilation** (`src/app/blog/[slug]/page.tsx` and `src/app/projects/[slug]/page.tsx`): Uses `next-mdx-remote/rsc` to compile MDX content at request time with custom component styling via `src/lib/mdx-components.tsx`.
- **Custom MDX Components** (`src/lib/mdx-components.tsx`): Centralized styling for all MDX elements (headings, paragraphs, lists, code blocks, links, tables, blockquotes, images) ensuring consistent design across all content.
- **Frontmatter Schema**:
  - Posts: `title`, `date`, `summary`, `tags`, `status` (published/draft)
  - Projects: `title`, `summary`, `role`, `stack`, `links`, `featured`, `status` (active/archived)
- **Date Formatting** (`src/lib/utils.ts`): `formatDate()` helper ensures consistent UTC-based date rendering across server and client to prevent hydration mismatches.
- Loaders filter drafts automatically and provide TypeScript typing for metadata.

## Project Layout
- `src/app/layout.tsx`: Root layout wrapping all pages with header, footer, and font variables.
- `src/app/page.tsx`: Home page with hero section, featured projects, and recent blog posts (using content loaders).
- `src/app/blog/page.tsx`: Blog index listing all published posts with Card-based UI.
- `src/app/blog/[slug]/page.tsx`: Blog detail page with metadata and MDX body rendering.
- `src/app/projects/page.tsx`: Projects showcase in 2-column grid with featured badges.
- `src/app/projects/[slug]/page.tsx`: Project detail page with links and tech stack.
- `src/app/about/page.tsx`: About page with avatar, bio, and professional information.
- `src/app/uses/page.tsx`: Uses page (tools and software breakdown).
- `src/components/ui/`: shadcn/ui component library (Button, Card, Badge, Avatar, Separator).
- `src/components/`: Shared layout and page components (SiteHeader, SiteFooter, PageContainer, HomeContent).
- `src/lib/content.ts`: Content loading and parsing logic.
- `src/lib/utils.ts`: Helper functions (cn, class composition, formatDate).
- `src/lib/mdx-components.tsx`: Custom styled MDX component definitions for rendering headings, paragraphs, lists, code blocks, links, tables, blockquotes, images, and more.
- `content/posts/` and `content/projects/`: MDX content files with YAML frontmatter metadata.

## Interactive Elements
- **Button Hover Effects**: Scale-up animations (default/secondary variants), color transitions (outline/ghost variants), 200ms smooth transitions.
- **Icon Animations**: Hero CTA buttons feature lucide icons with group-hover transforms (ArrowRight slides right, FileText scales up).
- **Card Interactions**: Subtle shadows and border highlights on hover.

## Developer Workflow
- Run `npm run dev` to launch at `http://localhost:3000` with hot reload.
- `npm run build` and `npm run start` for production builds.
- `npm run lint` for ESLint validation via eslint-config-next.
- **Adding Components**: Use `npx shadcn@latest add <component>` to scaffold new shadcn components into `src/components/ui/`.
- **New Content**: Drop `.mdx` files into `content/posts/` or `content/projects/` with proper frontmatter; loaders will automatically discover and parse them.
- **Dynamic Routes**: Next.js 15+ requires `params` as an async Promise in dynamic routes; remember to await before destructuring.

## Key Architecture Decisions
- **Server Components**: All pages and content loaders run on the server; MDX content is fetched, parsed, and compiled at request time using `next-mdx-remote/rsc`.
- **Content-Driven Rendering**: All blog posts and projects are stored as MDX files in `content/` and dynamically compiled with custom component styling, eliminating the need for hardcoded page files.
- **Centralized Styling**: Custom MDX components defined once in `src/lib/mdx-components.tsx` are reused across all content pages, ensuring consistent design and reducing duplicate styling code.
- **Static Generation**: Use `generateStaticParams()` in detail pages for ISR-compatible static routes.
- **Content-First**: The design system and component library exist to showcase content; layout decisions prioritize readability and navigation flow.
- **Minimal Dependencies**: Rely on Next.js, Tailwind, and shadcn/ui for core functionality; avoid heavy animation or state libraries (use CSS animations via Tailwind instead).

## Dependencies Overview
- **Core**: next 16.0.10, react 19.2.1, react-dom 19.2.1
- **Content**: next-mdx-remote 5.0.0, gray-matter 4.0.3
- **Styling**: tailwindcss 4, @tailwindcss/postcss 4, tw-animate-css 1.4.0
- **Components**: lucide-react 0.561.0, class-variance-authority 0.7.1, clsx 2.1.1, tailwind-merge 3.4.0
- **Radix UI Primitives**: @radix-ui/react-avatar, @radix-ui/react-separator, @radix-ui/react-slot
- **Dev**: TypeScript 5, babel-plugin-react-compiler 1.0.0, eslint 9, eslint-config-next 16.0.10