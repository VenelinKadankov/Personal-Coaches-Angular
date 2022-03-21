namespace FitBit.API.ServerApp.Repos;

using FitBit.API.ServerApp.Interfaces.Repos;
using FitBit.API.ServerApp.Models;
using Microsoft.Extensions.Options;

public class MessageRepo : BaseRepo<Message>, IMessageRepo
{
    public MessageRepo(IOptions<FitBitDatabaseSettings> fitBitDatabaseSettings) 
        : base(fitBitDatabaseSettings)
    {
        _fitEntitiesCollection = _fitBitDb.GetCollection<Message>(
            fitBitDatabaseSettings.Value.MessagesCollectionName);
    }
}
