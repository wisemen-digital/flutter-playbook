# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a VitePress documentation site for "The Flutter Playbook" - Wisemen's comprehensive guide for building Flutter applications. It documents architecture patterns, testing strategies, tools, and collaboration practices used across Wisemen's Flutter projects.

## Development Commands

- `pnpm run dev` - Start development server
- `pnpm run docs:build` - Build documentation site
- `pnpm run docs:preview` - Preview built documentation
- `pnpm run lint` - Run ESLint on all files (auto-fixes issues)

**Package Manager**: This project uses `pnpm` (v10.8.0). Always use `pnpm` instead of npm or yarn.

## Project Structure

```
├── .vitepress/          # VitePress configuration and theme
│   ├── config.ts        # Site configuration, navigation, sidebar
│   └── theme/           # Custom theme files
└── src/                 # Documentation content (markdown files)
    ├── architecture/    # Architecture documentation (layers, source, database, etc.)
    ├── testing/         # Testing documentation (unit, e2e, integration)
    ├── index.md         # Homepage
    └── *.md             # Other top-level docs (tools, packages, team, etc.)
```

## Content Architecture

The playbook documents a layered Flutter architecture with clear separation of concerns:

1. **Database Layer** - Data persistence with DAOs, tables, and models
2. **Network Layer** - API clients, DTOs, and services
3. **Repository Layer** - Data source abstraction
4. **Feature Layer** - Business logic, controllers, managers, screens, widgets

Two project structure approaches are documented:
- **Folder structure**: All layers in main `lib/` directory
- **Package structure**: Database/network/repository as separate packages in `packages/` directory

## Documentation Guidelines

When editing documentation:

- Keep PRs focused and small - split by logical sections or features
- Avoid commented code blocks (doc comments for clarity are fine)
- Use relative imports for same-feature references, absolute paths otherwise
- Follow the existing sidebar structure in `.vitepress/config.ts`
- Images go in `src/public/`

## Deployment

Documentation is automatically deployed to GitHub Pages when changes are pushed to the `main` branch via GitHub Actions workflow (`.github/workflows/publish-docs.yml`).
