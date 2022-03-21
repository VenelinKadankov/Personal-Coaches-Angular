namespace FitBit.API.ServerApp.Repos;

using FitBit.API.ServerApp.Interfaces.Repos;
using FitBit.API.ServerApp.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

public class BaseRepo<T> : IBaseRepo<T>
    where T : FitBitBaseModel
{
    protected IMongoCollection<T> _fitEntitiesCollection = null!;
    protected readonly IMongoDatabase _fitBitDb;

    public BaseRepo(
        IOptions<FitBitDatabaseSettings> fitBitDatabaseSettings)
    {
        if (fitBitDatabaseSettings is null)
            throw new ArgumentNullException(nameof(fitBitDatabaseSettings));

        var mongoClient = new MongoClient(
            fitBitDatabaseSettings.Value.ConnectionString);

        _fitBitDb = mongoClient.GetDatabase(
            fitBitDatabaseSettings.Value.DatabaseName);
    }

    public async Task<List<T>> GetAsync() =>
    await _fitEntitiesCollection.Find(_ => true).ToListAsync();

    public async Task<T?> GetAsync(string id) =>
        await _fitEntitiesCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

    public async Task CreateAsync(T newEntity) =>
        await _fitEntitiesCollection.InsertOneAsync(newEntity);

    public async Task UpdateAsync(string id, T updatedEntity) =>
        await _fitEntitiesCollection.ReplaceOneAsync(x => x.Id == id, updatedEntity);

    public async Task RemoveAsync(string id) =>
        await _fitEntitiesCollection.DeleteOneAsync(x => x.Id == id);
}
