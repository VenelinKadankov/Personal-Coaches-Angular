namespace FitBit.API.ServerApp.Interfaces;

using FitBit.API.ServerApp.Models;
using FitBit.API.ServerApp.Models.InputModels;
using FitBit.API.ServerApp.Models.ViewModels;

public interface IMessageService : IBaseService<Message>
{
    public Task<List<MessageViewModel>> GetAllMessagesAsync();

    public Task<MessageViewModel> GetSingleMessageAsync(string id);

    public Task<bool> CreateMessageAsync(MessageInputModel message);

    public Task<bool> EditMessageAsync(string id, MessageInputModel message);

    public Task<bool> DeleteMessageAsync(string id);
}

