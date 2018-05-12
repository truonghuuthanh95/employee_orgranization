using Employee_Ogranization.Models.DAO;
using Employee_Ogranization.Models.DTO;
using Employee_Ogranization.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Employee_Ogranization.Repositories.Implements
{
    public class RegistrationInterviewRepository : IRegistrationInterviewRepository
    {
        EmployeeManagementDB _db;

        public RegistrationInterviewRepository(EmployeeManagementDB db)
        {
            _db = db;
        }

        public RegistrationInterview CreateRegistrationInterview(RegistrationInterviewRegister registrationInterviewRegister)
        {
            throw new NotImplementedException();
        }

        public RegistrationInterview GetRegistrationInterviewById(int id)
        {
             RegistrationInterview registrationInterview = _db.RegistrationInterviews.Find(id);
            return registrationInterview;
        }

        public List<RegistrationInterview> GetRegistrationInterviewByIdentidfyCard(string identifyCard)
        {
            List<RegistrationInterview> registrationInterview = _db.RegistrationInterviews.Where(s => s.IdentifyCard == identifyCard).ToList();
            return registrationInterview;
        }

        public int IsvalidToRegistrationInterview(string identifyCard)
        {
            //throw new NotImplementedException();
            return 3;
            //var result = _db.RegistrationInterviews.Where(x => x.IdentifyCard == identifyCard);
            //if (result == null)
            //{
            //    return 0;
            //}
            //else
            //{
            //    var isPassBefore = result.Select(x => x.IsPass);
            //    if (isPassBefore)
            //    {
            //        return 1;
            //    }
            //    else
            //    {
            //        return 2;
            //    }
            //}
            //return 0: mean valid to register interview.
            //1: This candidate is pass interview and now is working
            //2: This candidate has already registed in this year
        }

        public RegistrationInterview UpdateRegistrationInterview(RegistrationInterview registrationInterview)
        {
            throw new NotImplementedException();
        }
    }
}