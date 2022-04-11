namespace FitBit.API.ServerApp.Services;

using System.Text;
using System.Security.Cryptography;

using FitBit.API.ServerApp.Interfaces;

public class HashService : IHashService
{
    public bool CompareHash(string aHash, string bHash)
        => aHash.Equals(bHash);

    public string GetHash(string pass)
    {
        var passBytes = Encoding.UTF8.GetBytes(pass);
        var sb = new StringBuilder();

        using (SHA256 mySHA256 = SHA256.Create())
        {
            byte[] hashValue = mySHA256.ComputeHash(passBytes);

            foreach (Byte b in hashValue)
                sb.Append(b.ToString("x2"));
        

            var hashedPass = sb.ToString();

            return hashedPass;
        }
    }
}
