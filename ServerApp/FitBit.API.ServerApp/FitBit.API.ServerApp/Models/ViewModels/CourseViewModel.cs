namespace FitBit.API.ServerApp.Models.ViewModels;

public class CourseViewModel
{
    public string? Title { get; set; }

    public string? Content { get; set; }

    public List<string>? Images { get; set; }

    public string CreatedBy { get; set; } = null!;

    public List<string> Subscribers { get; set; } = null!;
}
