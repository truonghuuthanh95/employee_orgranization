using Employee_Ogranization.Models.DAO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Employee_Ogranization.Repositories.Interfaces
{
    public interface IRegistrationPriceRepository
    {
        RegistrationPrice GetRegistrationPriceByManagementUnitId(int managementUnitId);
        
    }
}