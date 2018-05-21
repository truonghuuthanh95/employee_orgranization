using Employee_Ogranization.Models.DAO;
using Employee_Ogranization.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Employee_Ogranization.Repositories.Implements
{
    public class StatusWorikingInEducationRepository : IStatusWorikingInEducationRepository
    {
        EmployeeManagementDB _db;

        public StatusWorikingInEducationRepository(EmployeeManagementDB db)
        {
            _db = db;
        }

        public List<StatusWorikingInEducation> GetStatusWorikingInEducations()
        {
            List<StatusWorikingInEducation> statusWorikingInEducations = _db.StatusWorikingInEducations.Where(s => s.IsActive == true).ToList();
            return statusWorikingInEducations;
        }
    }
}