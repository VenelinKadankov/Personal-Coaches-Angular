namespace FitBit.API.ServerApp.Models;

using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

public abstract class FitBitBaseModel
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }
}
