using Ardalis.Result;
using CleanArch.Application.Common.Interfaces;
using Microsoft.Extensions.Logging;

namespace CleanArch.Infrastructure.Services
{
    /// <summary>
    /// Implementation of the HelloWorldService interface.
    /// This is an example service that would be registered in the dependency injection container.
    /// </summary>
    public class HelloWorldService : IHelloWorldService
    {
        private readonly ILogger<HelloWorldService> _logger;

        public HelloWorldService(ILogger<HelloWorldService> logger)
        {
            _logger = logger;
        }

        /// <inheritdoc />
        public Task<Result<string>> GetGreetingAsync(string name, CancellationToken cancellationToken = default)
        {
            _logger.LogInformation("Generating greeting for {Name}", name);

            try
            {
                if (string.IsNullOrWhiteSpace(name))
                {
                    return Task.FromResult(Result<string>.Invalid(
                        new ValidationError
                        {
                            Identifier = nameof(name),
                            ErrorMessage = "Name cannot be empty"
                        }));
                }

                var greeting = $"Hello, {name}! Welcome to CleanArch.";
                return Task.FromResult(Result<string>.Success(greeting));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error generating greeting for {Name}", name);
                return Task.FromResult(Result<string>.Error($"An error occurred: {ex.Message}"));
            }
        }

        /// <inheritdoc />
        public Task<Result> SaveGreetingAsync(string message, CancellationToken ct = default)
        {
            _logger.LogInformation("Saving greeting: {Message}", message);

            try
            {
                if (string.IsNullOrWhiteSpace(message))
                {
                    return Task.FromResult(Result.Invalid(
                        new ValidationError
                        {
                            Identifier = nameof(message),
                            ErrorMessage = "Message cannot be empty"
                        }));
                }

                // In a real implementation, this would persist the message to a database
                // This is a placeholder for demonstration purposes
                _logger.LogInformation("Successfully saved greeting: {Message}", message);
                
                return Task.FromResult(Result.Success());
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error saving greeting: {Message}", message);
                return Task.FromResult(Result.Error($"An error occurred: {ex.Message}"));
            }
        }
    }
}