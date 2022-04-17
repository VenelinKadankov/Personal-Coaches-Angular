namespace FitBit.API.ServerApp.Models.InputModels;

public class UserInputModel
{
    public string Name { get; set; } = null!;

    public string Password { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string Tel { get; set; } = null!;

    public string ProfileImg { get; set; } = null!;

    public bool IsAdmin { get; set; }

    public string Role { get; set; } = null!;

    public IEnumerable<string> Courses { get; set; } = new List<string>();
}
