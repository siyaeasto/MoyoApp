using IdentityServer4.Models;
using System.Collections.Generic;

namespace ProductManagementUI.IdentityConfiguration
{
    public class Scopes
    {
        public static IEnumerable<ApiScope> GetApiScopes()
        {
            return new[]
            {
            new ApiScope("productsApi.read", "Read Access to Products API"),
            new ApiScope("productsApi.write", "Write Access to Products API"),
        };
        }
    }
}
