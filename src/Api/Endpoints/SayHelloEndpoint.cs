using FastEndpoints;
using CleanArch.Api.Extensions;
using CleanArch.Application.HelloWorld.Commands.SayHello;

namespace CleanArch.Api.Endpoints
{
    public sealed class SayHelloEndpoint
        : Endpoint<SayHelloCommand, string>
    {
        public override void Configure()
        {
            // Only handle POST requests (for creating)
            Post("/hello");
            AllowAnonymous();
            Description(b => b.Produces<string>(201));
        }

        public override async Task HandleAsync(
            SayHelloCommand request,
            CancellationToken cancellationToken)
        {
            // Execute the command and send the response
            var result = await request.ExecuteAsync(cancellationToken);
            await this.SendResponse(result, r => r.Value);
        }
    }
}
