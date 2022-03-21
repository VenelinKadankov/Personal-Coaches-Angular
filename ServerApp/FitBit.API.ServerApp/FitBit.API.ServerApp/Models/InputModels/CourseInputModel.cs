namespace FitBit.API.ServerApp.Models.InputModels;

public class CourseInputModel
{
    public string? Title { get; set; }

    public string? Content { get; set; }

    public IEnumerable<string>? Images { get; set; }
}
