# Application Layer - Template

The Application layer implements business use cases by orchestrating the domain objects. This template provides a starting structure for your application layer.

## Purpose

The Application layer:

- Coordinates domain objects to implement business use cases
- Defines the jobs the software is supposed to do
- Directs the domain layer to solve business problems
- Maintains independence from external concerns

## Template Status

This template includes the basic structure for the Application layer along with sample interfaces and commands. You will need to implement your specific use cases and business logic.

### Included Examples

- **Sample Interfaces**: `IHelloWorldService` showcasing the Ardalis.Result pattern
- **Sample Command**: `SayHelloCommand` demonstrating FastEndpoints command pattern
- **Structure**: Organized by feature folders with Commands/Queries

### Suggested Structure

```
Application/
├── Common/
│   ├── Behaviors/
│   │   ├── ValidationBehavior.cs
│   │   └── LoggingBehavior.cs
│   ├── Exceptions/
│   │   └── ApplicationException.cs
│   ├── Interfaces/
│   │   └── IHelloWorldService.cs
│   ├── Mappings/
│   │   └── MappingProfile.cs
│   └── Models/
│       └── HelloWorldDto.cs
└── HelloWorld/
    ├── Commands/
    │   └── SayHello/
    │       ├── SayHelloCommand.cs
    │       └── SayHelloValidator.cs
    └── Queries/
        └── GetHello/
            ├── GetHelloQuery.cs
            └── GetHelloValidator.cs
```

## Key Characteristics

- Depends only on the Domain layer
- Contains no business rules (those belong in the Domain)
- Implements CQRS pattern with Commands and Queries
- Provides abstractions for infrastructure concerns (persistence, messaging, etc.)
- Is thin and focused on orchestration rather than implementation details

## Required Dependencies

These NuGet packages are expected to be used but might not be installed yet:

- **FastEndpoints**: For implementing the REPR pattern (Request-Endpoint-Response)
- **Ardalis.Result**: For standardized operation results
- **FluentValidation**: For validation of commands and queries
- **AutoMapper**: For object mapping between layers (optional)

## Typical Contents

- **Commands/Queries**: Implements Command Query Responsibility Segregation (CQRS)
  - Commands: Modifying operations that change state
  - Queries: Read-only operations that return data
- **DTOs (Data Transfer Objects)**: Objects for transferring data between layers
- **Validators**: Validation logic for commands and queries
- **Interfaces**: Abstractions for infrastructure services
- **Mapping Profiles**: AutoMapper profiles for object mapping

## Common Patterns Used

- **CQRS (Command Query Responsibility Segregation)**: Separating read and write operations
- **Command Pattern**: Self-contained commands with execution logic
- **Dependency Injection**: Inverting control for infrastructure dependencies
- **Validation**: Input validation using FluentValidation
- **Exception Handling**: Consistent exception handling mechanisms

## Example Command

Here's an example of how a command is structured:

```csharp
// Command definition using FastEndpoints and Ardalis.Result
public record SayHelloCommand(string Message)
    : ICommand<Result<string>>;

// Handler implementation
public class SayHelloCommandHandler
    : ICommandHandler<SayHelloCommand, Result<string>>
{
    private readonly IHelloWorldService _helloWorldService;

    public SayHelloCommandHandler(IHelloWorldService helloWorldService)
    {
        _helloWorldService = helloWorldService;
    }

    public async Task<Result<string>> ExecuteAsync(
        SayHelloCommand command,
        CancellationToken cancellationToken)
    {
        var result = await _helloWorldService.SaveGreetingAsync(command.Message, cancellationToken);
        
        if (result.IsSuccess)
            return Result<string>.Success($"Created: {command.Message}");
            
        return Result<string>.Invalid([.. result.ValidationErrors]);
    }
}
```

## Guidelines

- Keep this layer focused on orchestrating the domain layer
- Use CQRS pattern to separate read and write operations
- Use dependency injection for resolving services
- Keep command and query handlers small and focused
- Return DTOs rather than domain entities from queries
- Validate commands and queries before execution
- Use Ardalis.Result for consistent result handling