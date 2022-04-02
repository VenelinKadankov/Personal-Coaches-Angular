namespace FitBit.API.ServerApp.Middlewares;

using JetBrains.Annotations;
using FitBit.API.ServerApp.Attributes;
using FitBit.API.ServerApp.Interfaces;

public class AuthMiddleware
{
    [NotNull]
    private readonly RequestDelegate _next;

    private readonly IAuthService _authService;

    public AuthMiddleware([NotNull] RequestDelegate next, IAuthService authService)
    {
        this._next = next ?? throw new ArgumentNullException(nameof(next));
        this._authService = authService ?? throw new ArgumentNullException(nameof(authService));
    }

    [UsedImplicitly]
    public async Task InvokeAsync(HttpContext httpContext)
    {
        var success = this.ProcessAuth(httpContext);
        if (success)
        {
            await this._next(httpContext);
        }
    }

    private bool ProcessAuth(HttpContext context)
    {
        if (ShouldHaveHeaderId(context) == false)
        {
            return true;
        }

        if (GetHeaderId(context) == false)
        {
            context.Response.StatusCode = 400;
            return false;
        }

        if (_authService.IsAuthenticated == false)
        {
            context.Response.StatusCode = 401;
            return false;
        }


        return true;
    }

    private static bool GetHeaderId(HttpContext context)
    {
        var headers = (context?.Request?.Headers);

        if (headers != null)
        {
            var userId = string.Empty;

            var containsHeaderId = headers.TryGetValue("uid", out var headerValue);

            if (containsHeaderId)
            {
                userId = headerValue.ToString();
            }

            return string.IsNullOrWhiteSpace(userId) == false;
        }

        return false;
    }

    private static bool ShouldHaveHeaderId(HttpContext context)
    {
        var attributes = context?.GetEndpoint()?.Metadata?.GetOrderedMetadata<NeedsUserIdAttribute>();

        if (attributes != null)
        {
            return attributes.Any();
        }

        return false;
    }
}
