namespace FitBit.API.ServerApp.Repos;

using FitBit.API.ServerApp.Interfaces.Repos;
using FitBit.API.ServerApp.Models;
using Microsoft.Extensions.Options;

public class UserRepo : BaseRepo<User>, IUserRepo
{
    public UserRepo(IOptions<FitBitDatabaseSettings> fitBitDatabaseSettings) 
        : base(fitBitDatabaseSettings)
    {
        _fitEntitiesCollection = _fitBitDb.GetCollection<User>(
            fitBitDatabaseSettings.Value.UsersCollectionName);
    }
}
