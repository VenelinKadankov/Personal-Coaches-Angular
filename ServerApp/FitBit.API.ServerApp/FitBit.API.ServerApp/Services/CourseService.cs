namespace FitBit.API.ServerApp.Services;

using FitBit.API.ServerApp.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

public class CourseService
{
    private readonly IMongoCollection<Message> _messagessCollection;

    public CourseService(
        IOptions<FitBitDatabaseSettings> fitBitDatabaseSettings)
    {
        var mongoClient = new MongoClient(
            fitBitDatabaseSettings.Value.ConnectionString);

        var mongoDatabase = mongoClient.GetDatabase(
            fitBitDatabaseSettings.Value.DatabaseName);

        _messagessCollection = mongoDatabase.GetCollection<Message>(
            fitBitDatabaseSettings.Value.MessagesCollectionName);
    }

    public async Task<List<Message>> GetAsync() =>
    await _messagessCollection.Find(_ => true).ToListAsync();

    public async Task<Message?> GetAsync(string id) =>
        await _messagessCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

    public async Task CreateAsync(Message newBook) =>
        await _messagessCollection.InsertOneAsync(newBook);

    public async Task UpdateAsync(string id, Message updatedBook) =>
        await _messagessCollection.ReplaceOneAsync(x => x.Id == id, updatedBook);

    public async Task RemoveAsync(string id) =>
        await _messagessCollection.DeleteOneAsync(x => x.Id == id);
}
