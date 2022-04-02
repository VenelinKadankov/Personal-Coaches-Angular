namespace FitBit.API.ServerApp.Interfaces;

public interface IAuthService
{
    bool IsAuthenticated { get; }

    bool Authenticate();
}
