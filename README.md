# CleanArch Template

A template project for building web applications integrating a React frontend with ASP.NET Core backend, designed using Clean Architecture principles.

## Project Structure

This template follows Clean Architecture principles with the following layers:

- `src/Domain/` - Core business entities and rules (has no dependencies)
- `src/Application/` - Business logic and use cases (depends only on Domain)
- `src/Infrastructure/` - External concerns like persistence, I/O (depends on Application)
- `src/Api/` - ASP.NET Core backend API exposing functionality to clients
- `src/Client/` - React TypeScript client application using Vite

## Template Purpose

This project serves as a starting point for building applications with Clean Architecture. While the structure is in place, many components remain to be implemented according to your specific requirements. The template provides:

- Basic project structure following Clean Architecture
- Sample Hello World implementation spanning all layers
- Integration between .NET backend and React frontend
- Modern tooling for both backend and frontend development

## Clean Architecture Benefits

- **Independent of Frameworks**: The architecture doesn't depend on the existence of some library or framework
- **Testable**: Business rules can be tested without UI, database, web server, or any external element
- **Independent of UI**: The UI can change without changing the rest of the system
- **Independent of Database**: Business rules are not bound to a specific database
- **Independent of any external agency**: Business rules don't know anything about outside world interfaces

## Getting Started

Each project contains its own README.md file with specific instructions for that layer:

- [Domain Layer](/src/Domain/README.md)
- [Application Layer](/src/Application/README.md)
- [Infrastructure Layer](/src/Infrastructure/README.md)
- [API Layer](/src/Api/README.md)
- [Client Application](/src/Client/README.md)

## Next Steps

To start using this template for your own project:

1. Clone or fork the repository
2. Rename namespaces and solution files as needed
3. Implement your own domain entities and business logic
4. Add infrastructure implementations for your specific requirements
5. Extend the API with your own controllers and endpoints
6. Develop the client application to fit your UI needs