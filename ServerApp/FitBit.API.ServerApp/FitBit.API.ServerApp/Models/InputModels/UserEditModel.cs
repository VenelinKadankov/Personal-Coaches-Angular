namespace FitBit.API.ServerApp.Models.InputModels;

using System.Text.Json.Serialization;

public class UserEditModel
{
    [JsonPropertyName("id")]
    public string? Id { get; set; } = null;

    [JsonPropertyName("name")]
    public string? Name { get; set; } = null;

    [JsonPropertyName("email")]
    public string? Email { get; set; } = null;

    [JsonPropertyName("tel")]
    public string? Tel { get; set; } = null;

    [JsonPropertyName("profileImg")]
    public string? ProfileImg { get; set; } = null;
}
