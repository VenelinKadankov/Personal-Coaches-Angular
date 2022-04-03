namespace FitBit.API.ServerApp.Services;

using FitBit.API.ServerApp.Interfaces;
using FitBit.API.ServerApp.Interfaces.Repos;
using FitBit.API.ServerApp.Models;
using FitBit.API.ServerApp.Models.InputModels;
using FitBit.API.ServerApp.Models.ViewModels;

public class UserService : BaseService<User>, IUserService
{
    private readonly IAuthService _authService;
    private readonly IHashService _hashService;

    public UserService(IUserRepo userRepo, IAuthService authService, IHashService hashService)
        : base(userRepo)
    {
        this._authService = authService ?? throw new ArgumentNullException(nameof(authService));
        this._hashService = hashService ?? throw new ArgumentNullException(nameof(hashService));
    }

    public async Task<bool> CreateUserAsync(UserInputModel model)
    {
        if (model == null || model.Name == null || model.Email == null)
        {
            return false;
        }

        var dbModel = await (this._baseRepo as IUserRepo)?.GetByUsernameAsync(model.Name);

        if (dbModel != null)
        {
            return false;
        }

        var user = new User
        {
            Name = model.Name,
            Password = this._hashService.GetHash(model.Password),
            Email = model.Email,
            Courses = model.Courses,
            Role = (Role)Enum.Parse(typeof(Role), model.Role, true),
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
        user.Role = (Role)Enum.Parse(typeof(Role), model.Role, true);
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

    public async Task<UserViewModel> LoginUserAsync(UserLoginModel model)
    {
        if (model == null || model.UserName == null || model.Password == null)
        {
            return null;
        }

        var user = await (this._baseRepo as IUserRepo)?.GetByUsernameAsync(model.UserName);

        if (user == null)
        {
            return null;
        }

        try
        {
            var passIsValid = this._hashService.CompareHash(_hashService.GetHash(model.Password), user.Password);

            if (!passIsValid)
            {
                return null;
            }
        }
        catch (Exception ex)
        {
            return null;
        };

        this._authService.Authenticate();

        return ToViewModel(user);
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

    public Task<bool> LogoutUserAsync()
    {
        this._authService.Logout();

        return Task.FromResult(true);
    }
}
