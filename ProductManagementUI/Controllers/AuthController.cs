using IdentityModel.Client;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using ProductManagementDA.Models.Data;
using ProductManagementDA.Models.View;
using System;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;

namespace ProductManagementUI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : Controller
    {
        private readonly SignInManager<IdentityUser> _signInManager;
        private readonly UserManager<IdentityUser> _userManager;
        private readonly IConfiguration _config;
        public AuthController(SignInManager<IdentityUser> signInManager, UserManager<IdentityUser> userManager, IConfiguration config)
        {
            _signInManager = signInManager;
            _userManager = userManager;
            _config = config;
        }

        [HttpPost]
        public async Task<IActionResult> Login(LoginViewModel loginViewModel)
        {
            try
            {
                var result = await _signInManager.PasswordSignInAsync(loginViewModel.Username, loginViewModel.Password, false, false);
                if (result.Succeeded)
                {
                    IdentityUser user = await _userManager.FindByNameAsync(loginViewModel.Username);

                    HttpClient client = new HttpClient();
                    TokenResponse tokenResponse = await GetAccessToken(client).ConfigureAwait(false);
                    LoginResponseView response = new LoginResponseView { AccessToken = tokenResponse.AccessToken, User = user };
                    return Ok(response);
                }
                else if (result.IsLockedOut)
                {
                    return Problem("Account locked out");
                }
                else
                {
                    return Problem("Incorrect credentials entered");
                }
            }
            catch (Exception ex)
            {
                return Problem(ex.InnerException?.Message ?? ex.Message);
            }
        }

        private async Task<TokenResponse> GetAccessToken(HttpClient client)
        {
            var tokenResponse = await client.RequestClientCredentialsTokenAsync(new ClientCredentialsTokenRequest
            {
                Address = _config.GetValue<string>("ApplicationUrl") + _config.GetValue<string>("TokenUrl"),
                ClientId = _config.GetValue<string>("ClientId"),
                ClientSecret = _config.GetValue<string>("ClientSecret"),
                Scope = _config.GetValue<string>("Scope")

            }).ConfigureAwait(false);
            tokenResponse.HttpResponse.EnsureSuccessStatusCode();
            return tokenResponse;
        }
    }
}
