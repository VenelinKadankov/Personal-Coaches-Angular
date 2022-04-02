namespace FitBit.API.ServerApp.Models.ViewModels;

using System.Text.Json.Serialization;

public class UserViewModel
{

    [JsonPropertyName("name")]
    public string Name { get; set; } = null!;

    [JsonPropertyName("email")]
    public string Email { get; set; } = null!;

    [JsonPropertyName("isAdmin")]
    public bool IsAdmin { get; set; }

    [JsonPropertyName("role")]
    public string Role { get; set; } = null!;

    [JsonPropertyName("courses")]
    public IEnumerable<string> Courses { get; set; } = new List<string>();
}
