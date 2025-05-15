# Sample Package

Sample package for integration in web applications.

## Overview

This is a sample package demonstrating how to structure and build a basic library. It can be used as a starting point for your own projects.

## Usage

```ts
import { Sample } from 'sample';

const sample = new Sample();
// Use sample methods
```

## Testing

This package includes unit tests using [Vitest](https://vitest.dev/), a Vite-native testing framework. Tests are located in the `src` directory alongside the source files with the naming convention `*.test.ts`.

## Available Scripts

- `pnpm build` - Build the package
- `pnpm format` - Format code with Biome
- `pnpm lint` - Lint code with Biome
- `pnpm test` - Run tests once
- `pnpm test:watch` - Run tests in watch mode 