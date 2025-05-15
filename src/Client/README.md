# Client Layer - Template

This project provides a modern React application template with TypeScript and Vite for fast development and optimal performance, designed to work with the CleanArch backend.

## Prerequisites

- **[PNPM](https://pnpm.io/installation)**: This project requires PNPM as the package manager instead of NPM. Follow the installation instructions to set it up on your system.

## Template Status

This template includes a basic structure for the React client application with sample implementations that demonstrate integration with the backend API.

### Current Structure

```
Client/
├── website/           # Main React application
│   ├── public/
│   │   └── assets/
│   ├── src/
│   │   ├── components/
│   │   │   └── HelloWorld/
│   │   │       ├── HelloWorldForm.tsx
│   │   │       ├── HelloWorldPage.tsx
│   │   │       └── HelloWorldSearch.tsx
│   │   ├── hooks/
│   │   │   └── useHelloWorld.ts
│   │   ├── store/
│   │   │   └── helloWorldStore.ts
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
├── packages/          # Shared packages/libraries
│   └── sample/        # Example shared package
│       ├── src/
│       ├── package.json
│       └── tsconfig.json
├── biome.jsonc        # Code formatting and linting config
├── package.json       # Workspace root package.json
├── pnpm-lock.yaml
└── pnpm-workspace.yaml
```

## Features

- [React 18](https://react.dev/) with TypeScript
- [Vite](https://vite.dev/) for fast development and builds
- [Biome](https://biomejs.dev/) for linting and formatting
- [Vitest](https://vitest.dev/) for unit testing
- [pnpm workspace](https://pnpm.io/workspaces) structure for monorepo support
- API integration with backend services
- Shared packages for code reuse

## Monorepo Structure

This template uses pnpm workspaces to manage a monorepo structure:

- `website/`: Main React application that consumes backend API
- `packages/`: Shared libraries that can be used across projects
  - `sample/`: Example shared package demonstrating code reuse

## Recommended Dependencies

These packages are recommended for enhancing your application (included in sample implementations):

### Data Fetching and Caching
- **[@tanstack/react-query](https://tanstack.com/query/latest)**: For efficient data fetching and caching

### Forms
- **[@tanstack/react-form](https://tanstack.com/form/latest)**: For type-safe form state management

### State Management
- **[@tanstack/react-store](https://tanstack.com/store/latest)**: For global state management

### Routing
- **[@tanstack/react-router](https://tanstack.com/router/latest)**: For type-safe client-side routing (not implemented in samples)

## Sample Implementations

### HelloWorld Example

The template includes a working HelloWorld example that demonstrates:

1. **State Management** with [TanStack Store](https://tanstack.com/store/latest):
   - Global state for the HelloWorld feature
   - Type-safe state access and updates
   - Separation of state and actions

2. **API Integration** with [TanStack Query](https://tanstack.com/query/latest):
   - Custom hooks for API requests
   - Loading, error, and success states
   - Data caching and refetching

3. **Form Handling** with [TanStack Form](https://tanstack.com/form/latest):
   - Type-safe form state
   - Validation logic
   - Form submission handling

### Key Files:

- **`store/helloWorldStore.ts`**: Defines state and actions using TanStack Store
- **`hooks/useHelloWorld.ts`**: Custom hooks with TanStack Query for API requests
- **`components/HelloWorld/HelloWorldSearch.tsx`**: Search form using TanStack Form
- **`components/HelloWorld/HelloWorldForm.tsx`**: Edit form using TanStack Form
- **`components/HelloWorld/HelloWorldPage.tsx`**: Main page component with React Query Provider

## Available Scripts

From the root directory:
- `pnpm dev` - Start development server (`pnpm --filter=website dev`)
- `pnpm build` - Build for production (`pnpm --filter=website build`)
- `pnpm build:sample` - Build the Sample Package (`pnpm --filter=sample build`)
- `pnpm format` - Format code with Biome
- `pnpm lint` - Lint code with Biome
- `pnpm test` - Run tests for all packages
- `pnpm test:website` - Run tests for website (`pnpm --filter=website test`)
- `pnpm test:sample` - Run tests for sample package (`pnpm --filter=sample test`)

From the website directory:
- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm test` - Run tests once
- `pnpm test:watch` - Run tests in watch mode

## Development

This project is designed to work seamlessly with the CleanArch backend API. During development:

1. Run both the API and Client projects together
2. API requests from the client will be proxied to the backend
3. Make changes to the client code with hot module replacement enabled

## Configuration

Environment variables for the client application should be prefixed with `VITE_` to be exposed to the client code:

```
# .env
VITE_API_URL=/api
```

## Integrating with the Backend

The client application communicates with the backend API through RESTful endpoints. The sample implementations demonstrate:

1. Making type-safe API requests using [TanStack Query](https://tanstack.com/query/latest)
2. Handling loading, error, and success states
3. Managing global state with [TanStack Store](https://tanstack.com/store/latest)
4. Processing form data with [TanStack Form](https://tanstack.com/form/latest)