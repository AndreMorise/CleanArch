using System.Threading;
using System.Threading.Tasks;
using Ardalis.Result;

namespace CleanArch.Application.Common.Interfaces
{
    /// <summary>
    /// Service interface for HelloWorld operations.
    /// This is an example interface to be implemented in the Infrastructure layer.
    /// </summary>
    public interface IHelloWorldService
    {
        /// <summary>
        /// Gets a greeting message
        /// </summary>
        /// <param name="name">Name to greet</param>
        /// <param name="cancellationToken">Cancellation token</param>
        /// <returns>Result containing greeting message</returns>
        Task<Result<string>> GetGreetingAsync(string name, CancellationToken cancellationToken = default);
        
        /// <summary>
        /// Saves a greeting message
        /// </summary>
        /// <param name="message">Message to save</param>
        /// <param name="cancellationToken">Cancellation token</param>
        /// <returns>Result indicating success or failure with error details</returns>
        Task<Result> SaveGreetingAsync(string message, CancellationToken cancellationToken = default);
    }
}