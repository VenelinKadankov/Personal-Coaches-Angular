namespace FitBit.API.ServerApp.Models.InputModels;

using System.Text.Json.Serialization;

public class UserLoginModel
{
    [JsonPropertyName("userName")]
    public string? UserName { get; set; } = null;

    [JsonPropertyName("password")]
    public string? Password { get; set; } = null;
}
