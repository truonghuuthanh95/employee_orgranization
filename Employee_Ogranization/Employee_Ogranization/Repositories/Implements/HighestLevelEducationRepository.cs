using Employee_Ogranization.Models.DAO;
using Employee_Ogranization.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Employee_Ogranization.Repositories.Implements
{
    public class HighestLevelEducationRepository : IHighestLevelEducationRepository
    {
        EmployeeManagementDB _db;

        public HighestLevelEducationRepository(EmployeeManagementDB db)
        {
            _db = db;
        }

        public List<HighestLevelEducation> GetHighestLevelEducations()
        {
            List<HighestLevelEducation> highestLevelEducations = _db.HighestLevelEducations.ToList();
            return highestLevelEducations;
        }
    }
}