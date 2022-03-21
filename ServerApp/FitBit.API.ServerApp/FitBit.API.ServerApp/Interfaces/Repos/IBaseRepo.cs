namespace FitBit.API.ServerApp.Interfaces.Repos;

using FitBit.API.ServerApp.Models;

public interface IBaseRepo<T>
    where T : FitBitBaseModel
{
    public Task<List<T>> GetAsync();

    public Task<T?> GetAsync(string id);

    public Task CreateAsync(T newModel);

    public Task UpdateAsync(string id, T updatedModel);

    public Task RemoveAsync(string id);
}
