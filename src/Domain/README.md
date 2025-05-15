# Domain Layer - Template

The Domain layer is the core of the Clean Architecture template. This layer will contain your enterprise-wide business rules and entities once implemented.

## Purpose

The Domain layer defines the business model for your application, which should include:

- Entities
- Value Objects
- Enumerations
- Domain Exceptions
- Domain Events
- Domain Services
- Interfaces that define repositories (to be implemented in Infrastructure)

## Template Status

This template provides the basic structure for the Domain layer, but requires implementation of your specific domain models and business rules. Example components that should be added:

### Suggested Structure

```
Domain/
├── Common/
│   ├── BaseEntity.cs
│   ├── ValueObject.cs
│   ├── Enumeration.cs
│   └── DomainEvent.cs
├── Entities/
│   └── HelloWorld.cs  (example entity)
├── Exceptions/
│   └── DomainException.cs
├── Events/
│   └── HelloWorldCreatedEvent.cs (example event)
├── ValueObjects/
│   └── HelloWorldId.cs (example value object)
└── Interfaces/
    └── IRepository.cs (example repository interface)
```

## Key Characteristics

- Has no dependencies on other project layers
- Contains the core business rules and entities
- Doesn't depend on any external frameworks or libraries 
- Pure C# code with no infrastructure concerns
- All domain logic should be encapsulated here
- Defines interfaces that will be implemented by the Infrastructure layer

## Typical Contents

- **Entities**: Business objects representing things in your business domain
- **Value Objects**: Immutable objects that are identified by their properties rather than an identity
- **Enumerations**: Strongly typed enums for domain concepts
- **Exceptions**: Domain-specific exceptions
- **Events**: Domain events that can be raised and handled
- **Services**: Domain services that operate on multiple entities or contain complex business logic
- **Repository Interfaces**: Contracts for data access (implemented in Infrastructure)

## Guidelines

- Keep this layer focused on business rules and domain logic
- Avoid dependencies on frameworks, UI, databases, or external systems
- Use rich domain models with behavior, not just data structures
- Implement domain-driven design patterns where appropriate
- Keep entities and value objects immutable where possible
- Ensure this layer is thoroughly unit tested

## Example Implementation

Here's an example of what a simple entity might look like:

```csharp
namespace CleanArch.Domain.Entities
{
    public class HelloWorld : BaseEntity
    {
        public string Message { get; private set; }
        public DateTime CreatedAt { get; private set; }

        private HelloWorld() { } // For ORM

        public HelloWorld(string message)
        {
            if (string.IsNullOrWhiteSpace(message))
                throw new ArgumentException("Message cannot be empty", nameof(message));

            Message = message;
            CreatedAt = DateTime.UtcNow;
        }

        public void UpdateMessage(string newMessage)
        {
            if (string.IsNullOrWhiteSpace(newMessage))
                throw new ArgumentException("Message cannot be empty", nameof(newMessage));

            Message = newMessage;
        }
    }
}
```