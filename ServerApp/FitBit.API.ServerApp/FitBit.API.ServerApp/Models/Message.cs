namespace FitBit.API.ServerApp.Models;

using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

public class Message : FitBitBaseModel
{
    [BsonElement("content")]
    public string Content { get; set; } = null!;

    [BsonElement("sendid")]
    public string SenderId { get; set; } = null!;

    [BsonElement("recid")]
    public string RecepientId { get; set; } = null!;
}

