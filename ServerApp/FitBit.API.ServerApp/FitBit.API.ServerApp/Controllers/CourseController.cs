namespace FitBit.API.ServerApp.Controllers;

using Microsoft.AspNetCore.Mvc;
using FitBit.API.ServerApp.Interfaces;
using FitBit.API.ServerApp.Models.InputModels;
using System.Text.Json;

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

    [HttpPost("[action]")]
    public async Task<IActionResult> Create([FromBody] CourseInputModel model)
    {
        var result = await _courseService.CreateCourseAsync(model);

        if (result == false)
        {
            return BadRequest();
        }

        return Ok(result);
    }

    [HttpPut("[action]")] // old - {id:length(24)}
    public async Task<IActionResult> Edit([FromQuery] string id, [FromBody] CourseInputModel model)
    {
        var result = await _courseService.EditCourseAsync(id, model);

        if (result == false)
        {
            return BadRequest();
        }

        return Ok(result);
    }

    [HttpDelete("[action]")]  // old - {id:length(24)}
    public async Task<IActionResult> Delete([FromQuery] string id)
    {
        var result = await _courseService.DeleteCourseAsync(id);

        if (result == false)
        {
            return BadRequest();
        }

        return Ok(result);
    }
}
