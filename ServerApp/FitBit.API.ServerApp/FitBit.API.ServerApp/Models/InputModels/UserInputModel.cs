﻿namespace FitBit.API.ServerApp.Models.InputModels;

public class UserInputModel
{
    public string Name { get; set; } = null!;

    public string Email { get; set; } = null!;

    public bool IsAdmin { get; set; }

    public Role Role { get; set; }

    public IEnumerable<string> Courses { get; set; } = new List<string>();
}
