﻿using Employee_Ogranization.Models.DAO;
using Employee_Ogranization.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Employee_Ogranization.Repositories.Implements
{
    public class InformationTechnologyDegreeRepository : IInformationTechnologyDegree
    {
        EmployeeManagementDB _db;

        public InformationTechnologyDegreeRepository(EmployeeManagementDB db)
        {
            _db = db;
        }

        public List<InfomationTechnologyDegree> GetAllInfomationTechnologyDegree()
        {
            List<InfomationTechnologyDegree> informationTechnologyDegrees = _db.InfomationTechnologyDegrees.Where(s => s.IsActive == true).ToList();
            return informationTechnologyDegrees;
        }
    }
}