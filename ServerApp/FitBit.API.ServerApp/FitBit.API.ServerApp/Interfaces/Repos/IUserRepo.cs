namespace FitBit.API.ServerApp.Interfaces.Repos;

using FitBit.API.ServerApp.Models;

public interface IUserRepo : IBaseRepo<User>
{
    public Task<User> GetByEmailAsync(string email);
}
