namespace FitBit.API.ServerApp.Controllers;

using Microsoft.AspNetCore.Mvc;

using FitBit.API.ServerApp.Interfaces;
using FitBit.API.ServerApp.Models.InputModels;
using System.Text.Json;

[ApiController]
[Route("api/token")]
public class JwtTokenController : ControllerBase
{
    private readonly IUserService _userService;

    public JwtTokenController(IUserService userService)
    {
        _userService = userService ?? throw new ArgumentNullException(nameof(userService));
    }

    [HttpPost]
    public async Task<IActionResult> Post([FromBody] UserLoginModel _userData)
    {
        if (_userData != null && _userData.Email != null && _userData.Password != null)
        {
            var token = await _userService.CreateTokenAsync(_userData.Email, _userData.Password);

            if (token != null)
            {
                return Ok(JsonSerializer.Serialize(token));
            }
            else
            {
                return BadRequest("Invalid credentials");
            }
        }

        return BadRequest();
    }
}
