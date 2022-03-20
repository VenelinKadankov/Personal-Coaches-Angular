namespace FitBit.API.ServerApp.Models;

using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

public class Course
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }

    [BsonElement("title")]
    public string Title { get; set; } = null!;

    [BsonElement("content")]
    public string Content { get; set; } = null!;

    [BsonElement("imgs")]
    public IEnumerable<string> Images { get; set; } = null!;
}
