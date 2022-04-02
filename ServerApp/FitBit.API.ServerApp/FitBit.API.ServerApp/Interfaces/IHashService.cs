namespace FitBit.API.ServerApp.Interfaces;

public interface IHashService
{
    string GetHash(string pass);

    bool CompareHash(string aHash, string bHash);
}
