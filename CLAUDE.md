# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 application called "Big Banana" - an AI image editor landing page built with React 18, TypeScript, and Tailwind CSS. The project uses shadcn/ui components and follows modern React patterns.

## Development Commands

- `npm run dev` - Start development server (Next.js dev server)
- `npm run build` - Build production application
- `npm run start` - Start production server
- `npm run lint` - Run ESLint for code quality checks

## Architecture & Structure

### Core Framework
- **Next.js 15** with App Router (app directory structure)
- **React 19** with TypeScript for type safety
- **Tailwind CSS v4** for styling
- **shadcn/ui** component library (New York style)

### Key Directories
- `app/` - Next.js App Router pages and layouts
- `components/` - React components (both page sections and UI components)
- `components/ui/` - shadcn/ui components (buttons, cards, forms, etc.)
- `hooks/` - Custom React hooks (toast, mobile detection)
- `lib/` - Utility functions (cn helper for class merging)
- `public/` - Static assets and images

### Path Aliases
The project uses these path aliases defined in tsconfig.json:
- `@/*` - Root directory (./)
- `@/components` - Components directory
- `@/lib` - Lib directory
- `@/hooks` - Hooks directory
- `@/utils` - Utils (lib/utils.ts)

### Component Architecture
The application follows a component-based architecture:

**Main Page Structure** (app/page.tsx):
- Header - Navigation and branding
- Hero - Landing hero section
- Features - Feature highlights
- Editor - AI image editor interface (main functionality)
- Showcase - Image gallery/showcase
- Testimonials - User testimonials
- FAQ - Frequently asked questions
- Footer - Site footer

**UI Components**: Complete shadcn/ui component library including buttons, cards, forms, dialogs, etc.

### Key Features
- AI image editing interface with file upload and text prompts
- Responsive design with mobile-first approach
- Dark/light theme support via next-themes
- Form handling with react-hook-form and zod validation
- Toast notifications with sonner

### Build Configuration
- TypeScript errors are ignored during build (`ignoreBuildErrors: true`)
- Image optimization is disabled (`unoptimized: true`)
- Uses PostCSS with Tailwind CSS v4

### Styling
- Tailwind CSS with custom configuration
- CSS variables for theme support
- shadcn/ui component styling system
- Responsive design patterns

## Development Notes

- The project uses pnpm as package manager (pnpm-lock.yaml present)
- All images are stored in the public directory
- The editor component handles file uploads and prompt-based image generation
- The application is a marketing/landing page for an AI image editing tool