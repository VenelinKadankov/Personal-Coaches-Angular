namespace FitBit.API.ServerApp.Models.ViewModels;

using System.Text.Json.Serialization;

public class UserTokenModel
{
    [JsonPropertyName("user")]
    public UserViewModel User { get; set; }

    [JsonPropertyName("token")]
    public string Token { get; set; }
}
