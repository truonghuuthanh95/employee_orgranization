using Employee_Ogranization.Models.DAO;
using Employee_Ogranization.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Employee_Ogranization.Repositories.Implements
{
    public class GraduationClassficationRepository : IGraduationClassficationRepository
    {
        EmployeeManagementDB _db;

        public GraduationClassficationRepository(EmployeeManagementDB db)
        {
            _db = db;
        }

        public List<GraduationClassfication> GetGraduationClassfications()
        {
            List<GraduationClassfication> graduationClassfications = _db.GraduationClassfications.Where(s => s.IsActive == true).ToList();
            return graduationClassfications;
        }
    }
}