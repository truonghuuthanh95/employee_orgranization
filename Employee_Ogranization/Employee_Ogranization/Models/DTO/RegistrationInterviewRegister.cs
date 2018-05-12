using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Employee_Ogranization.Models.DTO
{
    public class RegistrationInterviewRegister
    {
        public string IdentifyCard { get; set; }
        public int RegistrationPrice { get; set; }
        public string CandidateName { get; set; }

        public RegistrationInterviewRegister(string identifyCard, int registrationPrice, string candidateName)
        {
            IdentifyCard = identifyCard;
            RegistrationPrice = registrationPrice;
            CandidateName = candidateName;
        }
    }
}