
using Microsoft.AspNetCore.Identity;

namespace ProductManagementDA.Models.View
{
    public class LoginResponseView
    {
        public string AccessToken { get; set; }
        public IdentityUser User { get; set; }
    }
}
