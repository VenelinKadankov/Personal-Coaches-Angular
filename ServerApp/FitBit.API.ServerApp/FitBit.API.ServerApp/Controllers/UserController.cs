namespace FitBit.API.ServerApp.Controllers;

using Microsoft.AspNetCore.Mvc;
using FitBit.API.ServerApp.Interfaces;
using FitBit.API.ServerApp.Models.InputModels;
using FitBit.API.ServerApp.Attributes;

[ApiController]
[Route("api/[controller]")]
public class UserController : ControllerBase
{
    private readonly IUserService _userService;
    public UserController(IUserService userService)
    {
        _userService = userService ?? throw new ArgumentNullException(nameof(userService));
    }

    [HttpGet("[action]")]
    [NeedsUserId]
    public async Task<IActionResult> All()
    {
        var users = await _userService.GetAllUsersAsync();

        if (users == null)
        {
            return BadRequest();
        }

        return Ok(users);
    }

    [HttpGet("[action]")] // old - {id:length(24)}, TODO- take id from header, not from query
    [NeedsUserId] 
    public async Task<IActionResult> CurrentUser([FromQuery] string id)
    {
        var user = await _userService.GetSingleUserAsync(id);

        if (user == null)
        {
            return BadRequest();
        }

        return Ok(user);
    }

    [HttpPost("[action]")]
    public async Task<IActionResult> Login([FromBody] UserLoginModel model)
    {
        var result = await _userService.LoginUserAsync(model);

        if (result == null)
        {
            return BadRequest();
        }

        return Ok(result);
    }

    [HttpPost("[action]")]
    [NeedsUserId]
    public async Task<IActionResult> Logout()
    {
        this.HttpContext.Request.Headers.TryGetValue("uid", out var userId);  // TODO: Dont need that

        var result = await _userService.LogoutUserAsync();

        if (result == false)
        {
            return BadRequest();
        }

        return Ok(result);
    }

    [HttpPost("[action]")]
    public async Task<IActionResult> Register([FromBody] UserInputModel model)
    {
        var result = await _userService.CreateUserAsync(model);

        if (result == false)
        {
            return BadRequest();
        }

        return Ok(result);
    }

    [HttpPut("[action]")]   // old - {id:length(24)}
    [NeedsUserId]
    public async Task<IActionResult> Edit([FromQuery] string id, [FromBody] UserInputModel model)
    {
        var result = await _userService.EditUserAsync(id, model);

        if (result == false)
        {
            return BadRequest();
        }

        return Ok(result);
    }

    [HttpDelete("[action]")]   // old - {id:length(24)}
    [NeedsUserId]
    public async Task<IActionResult> Delete([FromQuery] string id)
    {
        var result = await _userService.DeleteUserAsync(id);

        if (result == false)
        {
            return BadRequest();
        }

        return Ok(result);
    }
}
