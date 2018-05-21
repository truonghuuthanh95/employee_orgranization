using Employee_Ogranization.Models.DAO;
using Employee_Ogranization.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Employee_Ogranization.Repositories.Implements
{
    public class DistrictRepository : IDistrictRepository
    {
        EmployeeManagementDB _db;

        public DistrictRepository(EmployeeManagementDB db)
        {
            _db = db;
        }

        public List<District> GetDistrictByProvinceId(int id)
        {
            List<District> districts = _db.Districts.Where(s => s.ProvinceId == id).OrderBy(s => s.Name).ToList();
            return districts;
        }
    }
}