using FitBit.API.ServerApp.Interfaces;
using FitBit.API.ServerApp.Interfaces.Repos;
using FitBit.API.ServerApp.Models;
using FitBit.API.ServerApp.Repos;
using FitBit.API.ServerApp.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.Configure<FitBitDatabaseSettings>(
    builder.Configuration.GetSection("FitBitDatabase"));

//builder.Services.AddScoped(typeof(IBaseRepo<>), typeof(BaseRepo<>));
builder.Services.AddScoped(typeof(IUserRepo), typeof(UserRepo));
builder.Services.AddScoped(typeof(IMessageRepo), typeof(MessageRepo));
builder.Services.AddScoped(typeof(ICourseRepo), typeof(CourseRepo));
builder.Services.AddScoped(typeof(IBaseService<>), typeof(BaseService<>));
builder.Services.AddScoped(typeof(IUserService), typeof(UserService));
builder.Services.AddScoped(typeof(ICourseService), typeof(CourseService));
builder.Services.AddScoped(typeof(IMessageService), typeof(MessageService));

// Add services to the container.
builder.Services.AddRazorPages();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapRazorPages();
//app.UseEndpoints(endpoints => 
app.MapControllers();

app.Run();
