namespace FitBit.API.ServerApp.Models.InputModels;

using System.Text.Json.Serialization;

public class UserInputModel
{
    [JsonPropertyName("name")]
    public string Name { get; set; } = null!;

    [JsonPropertyName("password")]
    public string Password { get; set; } = null!;

    [JsonPropertyName("email")]
    public string Email { get; set; } = null!;

    [JsonPropertyName("tel")]
    public string Tel { get; set; } = null!;

    [JsonPropertyName("profileImg")]
    public string ProfileImg { get; set; } = null!;

    [JsonPropertyName("isAdmin")]
    public bool IsAdmin { get; set; }

    [JsonPropertyName("role")]
    public string Role { get; set; } = null!;

    [JsonPropertyName("courses")]
    public IEnumerable<string> Courses { get; set; } = new List<string>();
}
