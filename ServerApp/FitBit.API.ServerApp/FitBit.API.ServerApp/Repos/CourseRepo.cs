namespace FitBit.API.ServerApp.Repos;

using FitBit.API.ServerApp.Interfaces.Repos;
using FitBit.API.ServerApp.Models;
using Microsoft.Extensions.Options;

public class CourseRepo : BaseRepo<Course>, ICourseRepo
{
    public CourseRepo(IOptions<FitBitDatabaseSettings> fitBitDatabaseSettings) 
        : base(fitBitDatabaseSettings)
    {
        _fitEntitiesCollection = _fitBitDb.GetCollection<Course>(
            fitBitDatabaseSettings.Value.CoursesCollectionName);
    }
}
