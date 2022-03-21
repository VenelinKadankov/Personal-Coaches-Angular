namespace FitBit.API.ServerApp.Models.ViewModels;

public class CourseViewModel
{
    public string? Title { get; set; }

    public string? Content { get; set; }

    public IEnumerable<string>? Images { get; set; }
}
