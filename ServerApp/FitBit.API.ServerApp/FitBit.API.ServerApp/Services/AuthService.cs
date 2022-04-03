namespace FitBit.API.ServerApp.Services;

using FitBit.API.ServerApp.Interfaces;

public class AuthService : IAuthService
{
    public bool IsAuthenticated { get; private set; }

    public bool Authenticate()
    {
        this.IsAuthenticated = true;

        return true;
    }

    public bool Logout()
    {
        this.IsAuthenticated = false;

        return true;
    }
}
