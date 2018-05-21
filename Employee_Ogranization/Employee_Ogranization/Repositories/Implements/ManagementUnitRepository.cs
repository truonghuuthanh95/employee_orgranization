using Employee_Ogranization.Models.DAO;
using Employee_Ogranization.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Employee_Ogranization.Repositories.Implements
{
    public class ManagementUnitRepository : IManagementUnitRepository
    {
        EmployeeManagementDB _db;

        public ManagementUnitRepository(EmployeeManagementDB db)
        {
            _db = db;
        }

        public ManagementUnit GetManagementById(int id)
        {
            ManagementUnit managementUnit = _db.ManagementUnits.Single(s => s.Id == id);
            return managementUnit;
        }
    }
}