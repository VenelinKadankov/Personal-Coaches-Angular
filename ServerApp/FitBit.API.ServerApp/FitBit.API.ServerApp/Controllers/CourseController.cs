namespace FitBit.API.ServerApp.Controllers;

using Microsoft.AspNetCore.Mvc;

using FitBit.API.ServerApp.Interfaces;
using FitBit.API.ServerApp.Models.InputModels;
using FitBit.API.ServerApp.Attributes;
using Microsoft.AspNetCore.Authorization;

[ApiController]
[Route("api/[controller]")]
public class CourseController : ControllerBase
{
    private readonly ICourseService _courseService;
    public CourseController(ICourseService courseService)
    {
        _courseService = courseService ?? throw new ArgumentNullException(nameof(courseService));
    }

    [HttpGet("[action]")] // GET - "api/course/chosencourse?id=....."
    public async Task<IActionResult> ChosenCourse([FromQuery]string id)
    {
        var course = await _courseService.GetSingleCourseAsync(id);

        if (course == null)
        {
            return BadRequest();
        }

        return Ok(course);
    }

    [HttpGet("[action]")]
    public async Task<IActionResult> All() // GET - "api/course/all"
    {
        var courses = await _courseService.GetAllCoursesAsync();

        if (courses == null)
        {
            return BadRequest();
        }

        return Ok(courses);
    }

    [Authorize]
    [HttpGet("[action]")]
    [NeedsUserId]
    public async Task<IActionResult> MyCourses() // GET - "api/course/myCourses"
    {
        var id = this.HttpContext.Request.Headers["uid"];

        var courses = await _courseService.GetMyCoursesAsync(id);

        if (courses == null)
        {
            return BadRequest();
        }

        return Ok(courses);
    }

    [Authorize]
    [HttpPost("[action]")]
    [NeedsUserId]
    public async Task<IActionResult> Create([FromBody] CourseInputModel model)
    {
        var result = await _courseService.CreateCourseAsync(model);

        if (result == false)
        {
            return BadRequest();
        }

        return Ok(result);
    }

    [Authorize]
    [HttpPut("[action]")]
    [NeedsUserId]
    public async Task<IActionResult> Edit([FromBody] CourseInputModel model)
    {
        var id = this.HttpContext.Request.Headers["uid"];

        var result = await _courseService.EditCourseAsync(id, model);

        if (result == false)
        {
            return BadRequest();
        }

        return Ok(result);
    }

    [Authorize]
    [HttpDelete("[action]")]
    [NeedsUserId]
    public async Task<IActionResult> Delete()
    {
        var id = this.HttpContext.Request.Headers["uid"];

        var result = await _courseService.DeleteCourseAsync(id);

        if (result == false)
        {
            return BadRequest();
        }

        return Ok(result);
    }
}
