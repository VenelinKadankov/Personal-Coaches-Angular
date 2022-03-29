namespace FitBit.API.ServerApp.Controllers;

using Microsoft.AspNetCore.Mvc;
using FitBit.API.ServerApp.Interfaces;
using FitBit.API.ServerApp.Models.InputModels;

[ApiController]
[Route("api/[controller]")]
public class MessageController : ControllerBase
{
    private readonly IMessageService _messageService;

    public MessageController(IMessageService messageService)
    {
        _messageService = messageService ?? throw new ArgumentNullException(nameof(messageService));
    }

    [HttpGet("[action]")]
    public async Task<IActionResult> All()
    {
        var messages = await _messageService.GetAllMessagesAsync();

        if (messages == null)
        {
            return BadRequest();
        }

        return Ok(messages);
    }

    [HttpGet("[action]")] // old - {id:length(24)}
    public async Task<IActionResult> Message([FromQuery] string id)
    {
        var message = await _messageService.GetSingleMessageAsync(id);

        if (message == null)
        {
            return BadRequest();
        }

        return Ok(message);
    }

    [HttpPost("[action]")]
    public async Task<IActionResult> Create([FromBody] MessageInputModel model)
    {
        var result = await _messageService.CreateMessageAsync(model);

        if (result == false)
        {
            return BadRequest();
        }

        return Ok(result);
    }

    [HttpPut("[action]")] // old - {id:length(24)}
    public async Task<IActionResult> Edit([FromQuery] string id, [FromBody]MessageInputModel model)
    {
        var result = await _messageService.EditMessageAsync(id, model);

        if (result == false)
        {
            return BadRequest();
        }

        return Ok(result);
    }

    [HttpDelete("[action]")]  // old - {id:length(24)}
    public async Task<IActionResult> Delete([FromQuery] string id)
    {
        var result = await _messageService.DeleteMessageAsync(id);

        if (result == false)
        {
            return BadRequest();
        }

        return Ok(result);
    }
}
