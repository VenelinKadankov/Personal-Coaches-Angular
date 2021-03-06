namespace FitBit.API.ServerApp.Services;

using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

using FitBit.API.ServerApp.Interfaces;
using FitBit.API.ServerApp.Interfaces.Repos;
using FitBit.API.ServerApp.Models;
using FitBit.API.ServerApp.Models.InputModels;
using FitBit.API.ServerApp.Models.ViewModels;

public class UserService : BaseService<User>, IUserService
{
    private readonly IAuthService _authService;
    private readonly IHashService _hashService;
    public IConfiguration _configuration;

    public UserService(IUserRepo userRepo, IAuthService authService, IHashService hashService, IConfiguration config)
        : base(userRepo)
    {
        _authService = authService ?? throw new ArgumentNullException(nameof(authService));
        _hashService = hashService ?? throw new ArgumentNullException(nameof(hashService));
        _configuration = config ?? throw new ArgumentNullException(nameof(config));
    }

    public async Task<bool> CreateUserAsync(UserInputModel model)
    {
        if (model == null || model.Name == null || model.Email == null)
        {
            return false;
        }

        var dbModel = await (this._baseRepo as IUserRepo)?.GetByEmailAsync(model.Email);

        if (dbModel != null)
        {
            return false;
        }

        var user = new User
        {
            Name = model.Name,
            Password = this._hashService.GetHash(model.Password),
            Email = model.Email,
            Telephone = model.Tel,
            ProfileImg = model.ProfileImg,
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

    public async Task<bool> EditUserAsync(string id, UserEditModel model)
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

        user.Telephone = model.Tel;
        user.ProfileImg = model.ProfileImg;
        user.Name = model.Name;
        user.Email = model.Email;

        await UpdateAsync(id, user);

        return true;
    }

    public async Task<List<UserViewModel>> GetAllUserViewModelsAsync()
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

    public async Task<UserTokenModel> LoginUserAsync(UserLoginModel model)
    {
        if (model == null || model.Email == null || model.Password == null)
        {
            return null;
        }

        var user = await (this._baseRepo as IUserRepo)?.GetByEmailAsync(model.Email);

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

        this._authService.Authenticate(model.Email);

        var result = new UserTokenModel 
        { 
            User = ToViewModel(user), 
            Token = await CreateTokenAsync(model.Email, model.Password) 
        };

        return result;
    }

    public Task<bool> LogoutUserAsync()
    {
        this._authService.Logout();

        return Task.FromResult(true);
    }

    public async Task<string> CreateTokenAsync(string email, string password)
    {
        var user = await GetUserAsync(email, password);

        if (user != null)
        {
            var claims = new[] {
                        new Claim(JwtRegisteredClaimNames.Sub, _configuration["Jwt:Subject"]),
                        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                        new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString()),
                        new Claim("UserId", user.Id!),
                        new Claim("DisplayName", user.Name),
                        new Claim("UserName", user.Name),
                        new Claim("Email", user.Email)
                    };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken(
                _configuration["Jwt:Issuer"],
                _configuration["Jwt:Audience"],
                claims,
                expires: DateTime.UtcNow.AddMinutes(60),
                signingCredentials: signIn);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        return null;
    }

    private async Task<User> GetUserAsync(string email, string password)
    {
        var allUsers = await GetAsync();

        return allUsers.FirstOrDefault(u => u.Email == email && u.Password == _hashService.GetHash(password));
    }

    public async Task<UserViewModel> GetCurrentUserAsync()
    {
        var allUsers = await GetAsync();
        var currentUser = allUsers.FirstOrDefault(u => u.Email == this._authService.Email);

        if(currentUser == null)
        {
            return null;
        }

        return ToViewModel(currentUser);
    }

    private static UserViewModel ToViewModel(User user)
        => new()
        {
            Id = user.Id!,
            Name = user.Name,
            Email = user.Email,
            Telephone = user.Telephone,
            ProfileImg = user.ProfileImg,
            IsAdmin = user.IsAdmin,
            Role = user.Role.ToString(),
            Courses = user.Courses,
        };

    public async Task<List<UserViewModel>> GetAllCoachessAsync()
    {
        var users = await GetAsync();

        if (users == null)
        {
            return null;
        }

        var coaches = users.Where(u => u.Role.ToString() == "Coach");

        if(coaches == null)
        {
            return null;
        }

        var result = new List<UserViewModel>();

        foreach (var coach in coaches)
        {
            result.Add(ToViewModel(coach));
        }

        return result;
    }
}
