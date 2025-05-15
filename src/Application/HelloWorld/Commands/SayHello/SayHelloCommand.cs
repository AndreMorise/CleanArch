using Ardalis.Result;
using FastEndpoints;
using CleanArch.Application.Common.Interfaces;

namespace CleanArch.Application.HelloWorld.Commands.SayHello
{
    /// <summary>
    /// Command to create a new HelloWorld message
    /// </summary>
    public record SayHelloCommand(string Message)
        : ICommand<Result<string>>;

    /// <summary>
    /// Handler for the CreateHelloWorldCommand
    /// </summary>
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
}