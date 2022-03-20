namespace FitBit.API.ServerApp.Models;

public class FitBitDatabaseSettings
{
    public string ConnectionString { get; set; } = null!;

    public string DatabaseName { get; set; } = null!;

    public string UsersCollectionName { get; set; } = null!;

    public string MessagesCollectionName { get; set; } = null!;

    public string CoursesCollectionName { get; set; } = null!;
}
