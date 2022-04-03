namespace FitBit.API.ServerApp.Repos;

using FitBit.API.ServerApp.Interfaces.Repos;
using FitBit.API.ServerApp.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

public class UserRepo : BaseRepo<User>, IUserRepo
{
    public UserRepo(IOptions<FitBitDatabaseSettings> fitBitDatabaseSettings) 
        : base(fitBitDatabaseSettings)
    {
        _fitEntitiesCollection = _fitBitDb.GetCollection<User>(
            fitBitDatabaseSettings.Value.UsersCollectionName);
    }

    public async Task<User> GetByUsernameAsync(string userName) =>
    await _fitEntitiesCollection.Find(x => x.Name == userName).FirstOrDefaultAsync();
}
