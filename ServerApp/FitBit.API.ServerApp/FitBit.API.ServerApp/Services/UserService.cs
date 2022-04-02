namespace FitBit.API.ServerApp.Services;

using FitBit.API.ServerApp.Interfaces;
using FitBit.API.ServerApp.Interfaces.Repos;
using FitBit.API.ServerApp.Models;
using FitBit.API.ServerApp.Models.InputModels;
using FitBit.API.ServerApp.Models.ViewModels;

public class UserService : BaseService<User>, IUserService
{
    private readonly IAuthService _authService;
    public UserService(IUserRepo userRepo, IAuthService authService) 
        : base(userRepo)
    {
        this._authService = authService;
    }

    public async Task<bool> CreateUserAsync(UserInputModel model)
    {
        if (model == null || model.Name == null || model.Email == null)
        {
            return false;
        }

        var user = new User
        {
            Name = model.Name,
            Email = model.Email,
            Courses = model.Courses,
            Role = model.Role,
            IsAdmin = model.IsAdmin,
        };

        await CreateAsync(user);

        return true;
    }

    public async Task<bool> DeleteUserAsync(string id)
    {
        if (id == null)
        {
            return false;
        }

        await RemoveAsync(id);

        return true;
    }

    public async Task<bool> EditUserAsync(string id, UserInputModel model)
    {
        if (id == null || model == null || model.Name == null || model.Email == null)
        {
            return false;
        }

        var user = await GetAsync(id);

        if (user == null)
        {
            return false;
        }

        user.IsAdmin = model.IsAdmin;
        user.Role = model.Role;
        user.Courses = model.Courses;
        user.Name = model.Name;
        user.Email = model.Email;

        await UpdateAsync(id, user);

        return true;
    }

    public async Task<List<UserViewModel>> GetAllUsersAsync()
    {
        var users = await GetAsync();

        if (users == null)
        {
            return null;
        }

        var result = new List<UserViewModel>();

        foreach (var user in users)
        {
            result.Add(ToViewModel(user));
        }

        return result;
    }

    public async Task<UserViewModel> GetSingleUserAsync(string id)
    {
        var user = await GetAsync(id);

        if (user == null)
        {
            return null;
        }

        var result = ToViewModel(user);
        return result;
    }

    public Task<bool> LoginUserAsync(UserLoginModel model)
    {
        this._authService.Authenticate();

        return Task.FromResult(true);
    }

    private static UserViewModel ToViewModel(User message)
        => new()
        {
            Name = message.Name,
            Email = message.Email,
            IsAdmin = message.IsAdmin,
            Role = message.Role.ToString(),
            Courses = message.Courses,
        };
}
