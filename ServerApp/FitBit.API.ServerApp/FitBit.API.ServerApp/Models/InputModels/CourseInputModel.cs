namespace FitBit.API.ServerApp.Models.InputModels;

using System.Text.Json.Serialization;

public class CourseInputModel
{
    [JsonPropertyName("id")]
    public string? Id { get; set; }

    [JsonPropertyName("title")]
    public string? Title { get; set; }

    [JsonPropertyName("content")]
    public string? Content { get; set; }

    [JsonPropertyName("images")]
    public IEnumerable<string>? Images { get; set; }

    [JsonPropertyName("creator")]
    public string? Creator { get; set; }

    [JsonPropertyName("subscribers")]
    public IEnumerable<string>? Subscribers { get; set; }
}
