namespace FitBit.API.ServerApp.Models;

using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

public enum Role
{
    Admin = 0,
    Coach = 1,
    User = 2,
}

public class User : FitBitBaseModel
{
    [BsonElement("name")]
    public string Name { get; set; } = null!;

    [BsonElement("password")]
    public string Password { get; set; } = null!;

    [BsonElement("email")]
    public string Email { get; set; } = null!;

    [BsonElement("tel")]
    public string Telephone { get; set; } = null!;

    [BsonElement("profileImg")]
    public string ProfileImg { get; set; } = null!;

    [BsonElement("adm")]
    public bool IsAdmin { get; set; }

    [BsonElement("role")]
    public Role Role { get; set; }

    [BsonElement("courses")]
    public IEnumerable<string> Courses { get; set; } = new List<string>();
}
