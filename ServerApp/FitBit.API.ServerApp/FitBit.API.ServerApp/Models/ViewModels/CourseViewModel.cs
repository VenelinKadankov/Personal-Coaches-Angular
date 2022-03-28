namespace FitBit.API.ServerApp.Models.ViewModels;

using System.Text.Json.Serialization;

public class CourseViewModel
{
    [JsonPropertyName("title")]
    public string? Title { get; set; }

    [JsonPropertyName("content")]
    public string? Content { get; set; }

    [JsonPropertyName("images")]
    public List<string>? Images { get; set; }

    [JsonPropertyName("createdBy")]
    public string CreatedBy { get; set; } = null!;

    [JsonPropertyName("subscribers")]
    public List<string> Subscribers { get; set; } = null!;
}
