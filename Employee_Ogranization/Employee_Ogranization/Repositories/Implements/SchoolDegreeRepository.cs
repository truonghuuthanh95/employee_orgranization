using Employee_Ogranization.Models.DAO;
using Employee_Ogranization.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Employee_Ogranization.Repositories.Implements
{
    public class SchoolDegreeRepository : ISchoolDegreeRepository
    {
        EmployeeManagementDB _db;

        public SchoolDegreeRepository(EmployeeManagementDB db)
        {
            _db = db;
        }

        public List<SchoolDegree> GetSchoolDegrees()
        {
            List<SchoolDegree> schoolDegrees = _db.SchoolDegrees.Where(s => s.IsActive == true).ToList();
            return schoolDegrees;
        }
    }
}