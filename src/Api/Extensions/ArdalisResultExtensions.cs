using Ardalis.Result;
using FastEndpoints;
using FluentValidation.Results;

namespace CleanArch.Api.Extensions
{
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
                // Sends a given response dto or any object that can be serialized as JSON down to the requesting client.
                case ResultStatus.Ok:
                    await endpoint.HttpContext.Response.SendAsync(mapper(result));
                    break;

                // Sends a 400 error response with the current list of validation errors describing the validation failures.
                case ResultStatus.Invalid:
                    var failures = result.ValidationErrors.Select(e => new ValidationFailure(e.Identifier, e.ErrorMessage)).ToList();
                    failures.ForEach(f => endpoint.ValidationFailures.Add(f));
                    await endpoint.HttpContext.Response.SendErrorsAsync(endpoint.ValidationFailures);
                    break;

                // Sends a 404 not found response.
                case ResultStatus.NotFound:
                    await endpoint.HttpContext.Response.SendNotFoundAsync();
                    break;

                // Sends a 401 unauthorized response.
                case ResultStatus.Unauthorized:
                    await endpoint.HttpContext.Response.SendUnauthorizedAsync();
                    break;

                // Sends a 403 forbidden response.
                case ResultStatus.Forbidden:
                    await endpoint.HttpContext.Response.SendForbiddenAsync();
                    break;

                // Sends a 409 conflict response.
                case ResultStatus.Conflict:
                    await endpoint.HttpContext.Response.SendAsync("The request could not be carried out because of a conflict on the server.", 409);
                    break;

                // Sends a 500 internal server error response.
                default:
                    await endpoint.HttpContext.Response.SendAsync("An unexpected error occurred.", 500);
                    break;
            }
        }

        // Convenience method for Result<T> that automatically extracts the Value
        public static async Task SendResponse<T>(
            this IEndpoint endpoint,
            Result<T> result)
        {
            await endpoint.SendResponse(result, r => r.Value);
        }
    }
}
