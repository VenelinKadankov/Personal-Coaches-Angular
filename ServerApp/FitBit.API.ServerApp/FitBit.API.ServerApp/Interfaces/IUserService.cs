namespace FitBit.API.ServerApp.Interfaces;

using FitBit.API.ServerApp.Models;
using FitBit.API.ServerApp.Models.InputModels;
using FitBit.API.ServerApp.Models.ViewModels;

public interface IUserService : IBaseService<User>
{
    public Task<List<UserViewModel>> GetAllUserViewModelsAsync();

    public Task<List<UserViewModel>> GetAllCoachessAsync();

    public Task<string> CreateTokenAsync(string userName, string password);

    public Task<UserViewModel> GetSingleUserAsync(string id);

    public Task<UserViewModel> GetCurrentUserAsync();

    public Task<bool> CreateUserAsync(UserInputModel message);

    public Task<UserTokenModel> LoginUserAsync(UserLoginModel model);

    public Task<bool> LogoutUserAsync();

    public Task<bool> EditUserAsync(string id, UserEditModel message);

    public Task<bool> DeleteUserAsync(string id);
}
