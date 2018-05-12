using Employee_Ogranization.Models.DAO;
using Employee_Ogranization.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Employee_Ogranization.Repositories.Implements
{
    public class RegistrationPriceRepository : IRegistrationPriceRepository
    {

        EmployeeManagementDB _db;

        public RegistrationPriceRepository(EmployeeManagementDB db)
        {
            _db = db;
        }

        public RegistrationPrice GetRegistrationPriceByManagementUnitId(int managementUnitId)
        {
            RegistrationPrice registrationPrice = _db.RegistrationPrices.Single(s => s.ManagementUnitId == managementUnitId);
            return registrationPrice;
        }
    }
}