namespace FitBit.API.ServerApp.Services;

using System.Text;
using System.Security.Cryptography;
using FitBit.API.ServerApp.Interfaces;

public class HashService : IHashService
{
    public bool CompareHash(string aHash, string bHash)
        => this.GetHash(aHash).Equals(this.GetHash(bHash));

    public string GetHash(string pass)
    {
        var passBytes = Encoding.UTF8.GetBytes(pass);

        using (SHA256 mySHA256 = SHA256.Create())
        {
            byte[] hashValue = mySHA256.ComputeHash(passBytes);

            var hashedPass = hashValue.ToString();

            return hashedPass;
        }
    }
}
