# Website

React frontend for the application.

## Overview

This is the main web client application that provides a user interface for application. It consumes the Sample Package and communicates with the backend API.
  
## Development

- Built with React 18 and TypeScript
- Uses Vite for fast development and production builds
- Uses Vitest for unit testing
- Integrated with the Sample Package for demonstration purposes

## Testing

The project includes unit tests using [Vitest](https://vitest.dev/), a Vite-native testing framework. Test files follow the naming convention `*.test.ts` or `*.test.tsx`.

Current test coverage includes:
- Store management with TanStack Store tests

## Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm build:sample` - Build the Sample Package (`pnpm --filter=sample build`)
- `pnpm format` - Format code with Biome
- `pnpm lint` - Lint code with Biome
- `pnpm test` - Run tests once
- `pnpm test:watch` - Run tests in watch mode 