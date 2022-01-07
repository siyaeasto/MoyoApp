using Microsoft.AspNetCore.Identity;

namespace ProductManagementDA.Models.Data
{
    public class AppUser : IdentityUser
    {
        public string Name { get; set; }
    }
}
