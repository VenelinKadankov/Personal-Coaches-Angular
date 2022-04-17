using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

using FitBit.API.ServerApp.Interfaces;
using FitBit.API.ServerApp.Interfaces.Repos;
using FitBit.API.ServerApp.Middlewares;
using FitBit.API.ServerApp.Models;
using FitBit.API.ServerApp.Repos;
using FitBit.API.ServerApp.Services;
using Microsoft.AspNetCore.Authentication.Cookies;

var builder = WebApplication.CreateBuilder(args);

builder.Services.Configure<FitBitDatabaseSettings>(
    builder.Configuration.GetSection("FitBitDatabase"));

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      policy =>
                      {
                          policy.WithOrigins("http://localhost:4200")
                           .AllowAnyHeader();
                          //.AllowAnyMethod();
                      });
});

builder.Services.AddScoped(typeof(IUserRepo), typeof(UserRepo));
builder.Services.AddScoped(typeof(IMessageRepo), typeof(MessageRepo));
builder.Services.AddScoped(typeof(ICourseRepo), typeof(CourseRepo));
builder.Services.AddScoped(typeof(IBaseService<>), typeof(BaseService<>));
builder.Services.AddScoped(typeof(IUserService), typeof(UserService));
builder.Services.AddScoped(typeof(ICourseService), typeof(CourseService));
builder.Services.AddScoped(typeof(IMessageService), typeof(MessageService));
builder.Services.AddSingleton(typeof(IAuthService), typeof(AuthService));
builder.Services.AddSingleton(typeof(IHashService), typeof(HashService));
builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
    .AddCookie(options =>
    {
        options.ExpireTimeSpan = TimeSpan.FromMinutes(60);
        options.SlidingExpiration = true;
        options.AccessDeniedPath = "/Forbidden/";
    });

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options =>
{
    options.RequireHttpsMetadata = false;
    options.SaveToken = true;
    options.TokenValidationParameters = new TokenValidationParameters()
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidAudience = builder.Configuration["Jwt:Audience"],
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
    };
});

// Add services to the container.
builder.Services.AddRazorPages()
    .AddJsonOptions(
        options => options.JsonSerializerOptions.PropertyNamingPolicy = null);

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

var cookiePolicyOptions = new CookiePolicyOptions
{
    MinimumSameSitePolicy = SameSiteMode.Strict, // fix that
};

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseCors(MyAllowSpecificOrigins);
app.UseAuthentication();
app.UseAuthorization();
app.UseCookiePolicy(cookiePolicyOptions);

app.MapRazorPages();
app.MapControllers();
app.UseMiddleware(typeof(AuthMiddleware));

app.Run();
