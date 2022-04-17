namespace FitBit.API.ServerApp.Services;

using FitBit.API.ServerApp.Interfaces;

public class AuthService : IAuthService
{
    public bool IsAuthenticated { get; private set; }

    public string Email { get; private set; }

    public bool Authenticate(string email)
    {
        if (string.IsNullOrEmpty(email))
        {
            return false;
        }

        this.Email = email;
        this.IsAuthenticated = true;

        return true;
    }

    public bool Logout()
    {
        this.Email = null;
        this.IsAuthenticated = false;

        return true;
    }
}
