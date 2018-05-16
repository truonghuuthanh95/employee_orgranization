using Employee_Ogranization.Models.DAO;
using Employee_Ogranization.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Employee_Ogranization.Repositories.Implements
{
    public class AccountRepository : IAccountRepository
    {
        EmployeeManagementDB _db;

        public AccountRepository(EmployeeManagementDB db)
        {
            _db = db;
        }

        public Account GetAccountByUsernameAndPassword(string username, string password)
        {
            Account account = _db.Accounts.Include("Role").Include("Profile").Include("ManagementUnit").Where(s => s.Username == username).Where(s => s.Password == password).SingleOrDefault();
            return account;
        }
    }
}