using Employee_Ogranization.Models.DAO;
using Employee_Ogranization.Repositories.Implements;
using Employee_Ogranization.Service;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.OAuth;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;

namespace Employee_Ogranization.Provier
{
    public class OAuthAppProvider : OAuthAuthorizationServerProvider
    {
        

        

        public override Task GrantResourceOwnerCredentials(OAuthGrantResourceOwnerCredentialsContext context)
        {
            
            return Task.Factory.StartNew(() =>
            {
                var username = context.UserName;
                var password = context.Password;
                AccountRepository accountRepository = new AccountRepository(new EmployeeManagementDB());
                Account account = accountRepository.GetAccountByUsernameAndPassword(username, password);
                if (account != null && account.IsActive == true)
                {
                    var claims = new List<Claim>()
                    {
                        new Claim(ClaimTypes.Name, account.Username),
                        new Claim("AccountId", account.Id.ToString()),
                        new Claim("RoleId", account.RoleId.ToString()),
                        
                    };
                    
                    ClaimsIdentity oAutIdentity = new ClaimsIdentity(claims, Startup.OAuthOptions.AuthenticationType);
                    context.Validated(new AuthenticationTicket(oAutIdentity, new AuthenticationProperties(new Dictionary<string, string>
                    {
                        {"AccountId", account.Id.ToString()},
                        {"RoleId", account.RoleId.ToString()},
                        { "RoleName", account.Role.Name},
                        { "Name", account.Profile.FirstName},
                        { "ManagementUnitId", account.ManagementUnitId.ToString()},
                        { "MananagementUnitName", account.ManagementUnit.Name}
                    })));
                }
                else
                {
                    if (account != null && account.IsActive == false)
                    {
                        context.SetError("invalid_grant", "Tài khoản hiện đang bị khóa");
                    }
                    else
                    {
                        context.SetError("invalid_grant", "Sai tên truy cập hoặc mật khẩu");
                    }
                }
            });
        }

        public override Task ValidateClientAuthentication(OAuthValidateClientAuthenticationContext context)
        {
            if (context.ClientId == null)
            {
                context.Validated();
            }
            return Task.FromResult<object>(null);
        }
        public override Task TokenEndpoint(OAuthTokenEndpointContext context)
        {
            foreach (KeyValuePair<string, string> property in context.Properties.Dictionary)
            {
                //removed .issued and .expires parameter
                if (!property.Key.StartsWith("."))
                    context.AdditionalResponseParameters.Add(property.Key, property.Value);
            }

            return Task.FromResult<object>(null);
        }
    }
}