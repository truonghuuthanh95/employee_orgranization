using Employee_Ogranization.Models.DAO;
using Employee_Ogranization.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Employee_Ogranization.Repositories.Implements
{
    public class RegistrationInterviewRepository : IRegistrationInterviewRepository
    {
        EmployeeManagement _db;

        public RegistrationInterviewRepository(EmployeeManagement db)
        {
            _db = db;
        }

        public RegistrationInterview CreateRegistrationInterview(string candidateName, string identifyCard, int registrationPrice)
        {
            
            _db.RegistrationInterviews.Add()
        }

        public int IsvalidToRegistrationInterview(string identifyCard)
        {

            var result = _db.RegistrationInterviews.Where(x => x.IdentifyCard == identifyCard);
            if (result == null)
            {
                return 0;
            }
            else
            {
                var isPassBefore = result.Select(x => x.IsPass);
                if (isPassBefore)
                {
                    return 1;
                }
                else
                {
                    return 2;
            }
        }
            //return 0: mean valid to register interview.
                   //1: This candidate is pass interview and now is working
                   //2: This candidate has already registed in this year 
    }
}