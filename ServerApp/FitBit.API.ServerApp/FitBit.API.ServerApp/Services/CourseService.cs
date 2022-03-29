namespace FitBit.API.ServerApp.Services;

using FitBit.API.ServerApp.Interfaces;
using FitBit.API.ServerApp.Interfaces.Repos;
using FitBit.API.ServerApp.Models;
using FitBit.API.ServerApp.Models.InputModels;
using FitBit.API.ServerApp.Models.ViewModels;

public class CourseService : BaseService<Course>, ICourseService
{
    public CourseService(ICourseRepo courseRepo)
        : base(courseRepo)
    {
    }

    public async Task<bool> CreateCourseAsync(CourseInputModel model)
    {
        if (model == null || model.Content == null || model.Title == null || model.Images == null)
        {
            return false;
        }

        var course = new Course
        {
            Content = model.Content,
            Title = model.Title,
            Images = model.Images
        };

        await CreateAsync(course);

        return true;
    }

    public async Task<bool> DeleteCourseAsync(string id)
    {
        if (id == null)
        {
            return false;
        }

        await RemoveAsync(id);

        return true;
    }

    public async Task<bool> EditCourseAsync(string id, CourseInputModel model)
    {
        if (id == null || model == null || model.Content == null || model.Title == null || model.Images == null)
        {
            return false;
        }

        var course = await GetAsync(id);

        if (course == null)
        {
            return false;
        }

        course.Content = model.Content;
        course.Title = model.Title;
        course.Images = model.Images;
       // course.Subscribers = model.su TODO: change the input model

        await UpdateAsync(id, course);

        return true;
    }

    public async Task<List<CourseViewModel>> GetAllCoursesAsync()
    {
        var courses = await GetAsync();

        if (courses == null)
        {
            return null;
        }

        var result = new List<CourseViewModel>();

        foreach (var course in courses)
        {
            result.Add(ToViewModel(course));
        }

        return result;
    }

    public async Task<CourseViewModel> GetSingleCourseAsync(string id)
    {
        var course = await GetAsync(id);

        if (course == null)
        {
            return null;
        }

        var result = ToViewModel(course);
        return result;
    }

    private CourseViewModel ToViewModel(Course course)
        => new()
        {
            Id = course.Id,
            Content = course.Content,
            Title = course.Title,
            Images = course.Images.ToList(),
            CreatedBy = course.CreatedBy,
            Subscribers = course.Subscribers.ToList(),
        };
}
