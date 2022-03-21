namespace FitBit.API.ServerApp.Services;

using FitBit.API.ServerApp.Interfaces;
using FitBit.API.ServerApp.Interfaces.Repos;
using FitBit.API.ServerApp.Models;
using FitBit.API.ServerApp.Models.InputModels;
using FitBit.API.ServerApp.Models.ViewModels;

public class MessageService : BaseService<Message>, IMessageService
{
    private readonly IUserService _userService;

    public MessageService(IMessageRepo messagesRepo, IUserService userService)
        : base(messagesRepo)
    {
        _userService = userService ?? throw new ArgumentNullException(nameof(userService));
    }

    public async Task<bool> CreateMessageAsync(MessageInputModel model)
    {
        var users = await _userService.GetAsync();

        if(users == null || model == null || model.Content == null)
        {
            return false;
        }

        var senderId = users.FirstOrDefault(x => x.Name == model.SenderName)?.Id;
        var recerpId = users.FirstOrDefault(x => x.Name == model.RecepientName)?.Id;

        if(senderId == null || recerpId == null)
        {
            return false;
        }

        var message = new Message
        {
            Content = model.Content,
            SenderId = senderId,
            RecepientId = recerpId,
        };

        await CreateAsync(message);

        return true;
    }

    public async Task<bool> DeleteMessageAsync(string id)
    {
        if (id == null)
        {
            return false;
        }

        await RemoveAsync(id);

        return true;
    }

    public async Task<bool> EditMessageAsync(string id, MessageInputModel model)
    {
        if (id == null || model == null || model.Content == null)
        {
            return false;
        }

        var message = await GetAsync(id);

        if (message == null)
        {
            return false;
        }

        message.Content = model.Content;

        await UpdateAsync(id, message);

        return true;
    }

    public async Task<List<MessageViewModel>> GetAllMessagesAsync()
    {
        var messages = await GetAsync();

        if (messages == null)
        {
            return null;
        }

        var result = new List<MessageViewModel>();

        foreach (var message in messages)
        {
            result.Add(ToViewModel(message));
        }

        return result;
    }

    public async Task<MessageViewModel> GetSingleMessageAsync(string id)
    {
        var message = await GetAsync(id);

        if (message == null)
        {
            return null;
        }

        var result = ToViewModel(message);
        return result;
    }

    private MessageViewModel ToViewModel(Message message)
        => new()
        {
            Content = message.Content
        };
}
