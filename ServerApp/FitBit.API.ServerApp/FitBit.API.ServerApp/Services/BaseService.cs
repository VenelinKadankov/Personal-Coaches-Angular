namespace FitBit.API.ServerApp.Services;

using FitBit.API.ServerApp.Interfaces;
using FitBit.API.ServerApp.Interfaces.Repos;
using FitBit.API.ServerApp.Models;

public class BaseService<T> : IBaseService<T>
    where T : FitBitBaseModel
{
   
    protected readonly IBaseRepo<T> _baseRepo;

    protected BaseService(IBaseRepo<T> baseRepo)
    {
        _baseRepo = baseRepo ?? throw new ArgumentNullException(nameof(baseRepo));
    }

    public async Task<List<T>> GetAsync() => await _baseRepo.GetAsync();

    public async Task<T?> GetAsync(string id) => await _baseRepo.GetAsync(id);

    public async Task CreateAsync(T newModel) => await _baseRepo.CreateAsync(newModel);

    public async Task UpdateAsync(string id, T updatedModel) => await _baseRepo.UpdateAsync(id, updatedModel);

    public async Task RemoveAsync(string id) => await _baseRepo.RemoveAsync(id);
}
