using Employee_Ogranization.Models.DAO;
using Employee_Ogranization.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Employee_Ogranization.Repositories.Implements
{
    public class SubjectRepository : ISubjectRepository
    {
        EmployeeManagementDB _db;

        public SubjectRepository(EmployeeManagementDB db)
        {
            _db = db;
        }

        public List<Subject> GetSubjects()
        {
            List<Subject> subjects = _db.Subjects.Where(s => s.IsActive == true).ToList();
            return subjects;
        }
    }
}