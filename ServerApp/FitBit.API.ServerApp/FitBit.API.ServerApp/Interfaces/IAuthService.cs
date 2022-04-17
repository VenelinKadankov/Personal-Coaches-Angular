namespace FitBit.API.ServerApp.Interfaces;

public interface IAuthService
{
    bool IsAuthenticated { get; }

    string Email { get; }

    bool Authenticate(string email);

    bool Logout();
}
