namespace FitBit.API.ServerApp.Interfaces;

using FitBit.API.ServerApp.Models;
using FitBit.API.ServerApp.Models.InputModels;
using FitBit.API.ServerApp.Models.ViewModels;

public interface ICourseService : IBaseService<Course>
{
    public Task<List<CourseViewModel>> GetAllCoursesAsync();

    public Task<CourseViewModel> GetSingleCourseAsync(string id);

    public Task<bool> CreateCourseAsync(CourseInputModel message);

    public Task<bool> EditCourseAsync(string id, CourseInputModel message);

    public Task<bool> DeleteCourseAsync(string id);
}
