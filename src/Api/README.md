# API Layer - Template

The API layer is the entry point to the application, providing HTTP endpoints for clients to interact with the system. This template provides a basic structure for your API layer.

## Purpose

The API layer:

- Exposes the application's functionality to clients
- Handles HTTP requests and responses
- Manages API versioning, documentation, and security
- Routes requests to the appropriate Application layer handlers
- Provides integration with the SPA client

## Template Status

This template includes a basic API structure with a sample HelloWorld endpoint. You will need to implement additional endpoints according to your specific requirements.

### Included Examples

- **Sample Endpoint**: SayHelloEndpoint.cs demonstrating FastEndpoints usage and Ardalis.Result integration
- **Program.cs**: Application startup and configuration
- **Swagger Documentation**: Interactive API documentation setup

### Suggested Structure

```
Api/
├── Endpoints/
│   └── SayHelloEndpoint.cs
├── Extensions/
│   └── ArdalisResultExtensions.cs
├── Program.cs
├── GlobalUsings.cs
├── appsettings.json
├── appsettings.Development.json
└── Properties/
    └── launchSettings.json
```

## Features

- **.NET 8.0 Web API**: Modern ASP.NET Core features
- **Swagger/OpenAPI**: Interactive API documentation
- **SPA Proxy**: Integration with the React client application
- **FastEndpoints**: Vertical slice architecture with REPR pattern (Request-Endpoint-Response)
- **Clean Architecture**: Integration with Application and Infrastructure layers
- **Ardalis.Result Integration**: Custom extension methods for handling Result objects with appropriate HTTP responses

## Required Dependencies

These NuGet packages are expected to be used but might not be installed yet:

- **FastEndpoints**: For implementing vertical slice architecture
- **Ardalis.Result**: For standardized operation results
- **FluentValidation**: For validation of requests

## Key Responsibilities

- Translating HTTP requests to Application layer commands
- Returning appropriate HTTP responses with proper status codes
- Managing API versioning
- Handling authentication and authorization
- Providing comprehensive API documentation
- Implementing API-specific error handling
- Validating input data before passing to the Application layer

## Global Usings

Create a `GlobalUsings.cs` file to include common imports across all endpoint files:

```csharp
global using FastEndpoints;
global using Ardalis.Result;
global using FluentValidation;
global using CleanArch.Api.Extensions;
```

## Result Integration

Create extensions for handling Ardalis.Result with FastEndpoints:

```csharp
public static class ArdalisResultExtensions
{
    public static async Task SendResponse<TResult, TResponse>(
        this IEndpoint endpoint, 
        TResult result, 
        Func<TResult, TResponse> mapper) 
        where TResult : Ardalis.Result.IResult
    {
        switch (result.Status)
        {
            case ResultStatus.Ok:
                await endpoint.HttpContext.Response.SendAsync(mapper(result));
                break;

            case ResultStatus.Invalid:
                var failures = result.ValidationErrors.Select(e => 
                    new ValidationFailure(e.Identifier, e.ErrorMessage)).ToList();
                failures.ForEach(f => endpoint.ValidationFailures.Add(f));
                await endpoint.HttpContext.Response.SendErrorsAsync(endpoint.ValidationFailures);
                break;

            // Additional status cases here...
        }
    }
}
```

## Example Endpoint

Here's an example of what a FastEndpoints endpoint might look like with Ardalis.Result integration:

```csharp
public sealed class SayHelloEndpoint
    : Endpoint<SayHelloCommand, string>
{
    public override void Configure()
    {
        Post("/hello");
        AllowAnonymous();
        Description(b => b.Produces<string>(201));
    }

    public override async Task HandleAsync(
        SayHelloCommand req,
        CancellationToken ct)
    {
        // Execute the command and send the response
        var result = await req.ExecuteAsync(ct);
        await this.SendResponse(result, r => r.Value);
    }
}
```

## Development

This project is built with ASP.NET Core 8.0. You can use Visual Studio or the .NET CLI to build and run the application.

### Using Visual Studio

1. Open the solution file in Visual Studio
2. To run the server:
   - Set `Api` as the startup project
   - Press F5 to build and run the application
3. To run both server and client:
   - Right-click on the solution in Solution Explorer
   - Select "Configure Startup Projects..."
   - Select "Multiple startup projects" 
   - Set both `Api` and the `Client` project to "Start"
   - Press F5 to build and run both applications

### Using .NET CLI

```
# Build the project
dotnet build

# Run the project
dotnet run --project Api

# Watch for changes during development
dotnet watch --project Api
```

## Configuration

The application uses standard ASP.NET Core configuration patterns with appsettings.json and environment-specific settings.

## API Documentation

When running in development mode, Swagger documentation is available at `/swagger`.