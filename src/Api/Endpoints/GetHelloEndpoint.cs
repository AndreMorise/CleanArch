using FastEndpoints;
using CleanArch.Api.Extensions;
using CleanArch.Application.Common.Interfaces;
using Microsoft.AspNetCore.Http;
using Ardalis.Result;

namespace CleanArch.Api.Endpoints
{
    public class GetHelloRequest
    {
        public string Name { get; set; } = string.Empty;
    }

    public sealed class GetHelloEndpoint
        : Endpoint<GetHelloRequest, string>
    {
        private readonly IHelloWorldService _helloWorldService;

        public GetHelloEndpoint(IHelloWorldService helloWorldService)
        {
            _helloWorldService = helloWorldService;
        }

        public override void Configure()
        {
            Get("/hello");
            AllowAnonymous();
            Description(b => b.Produces<string>(200));
            Summary(s => {
                s.Summary = "Get a greeting message";
                s.Description = "Returns a personalized greeting based on the provided name";
                s.ExampleRequest = new GetHelloRequest { Name = "John" };
            });
        }

        public override async Task HandleAsync(
            GetHelloRequest request,
            CancellationToken cancellationToken)
        {
            var result = await _helloWorldService.GetGreetingAsync(request.Name, cancellationToken);
            await this.SendResponse(result, r => r.Value);
        }
    }
} 