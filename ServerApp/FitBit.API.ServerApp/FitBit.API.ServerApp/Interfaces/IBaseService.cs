namespace FitBit.API.ServerApp.Interfaces;

using FitBit.API.ServerApp.Models;

public interface IBaseService<T>
    where T : FitBitBaseModel
{
    public Task<List<T>> GetAsync();

    public Task<T?> GetAsync(string id);

    public Task CreateAsync(T newEntity);

    public Task UpdateAsync(string id, T updatedEntity);

    public Task RemoveAsync(string id);
}
