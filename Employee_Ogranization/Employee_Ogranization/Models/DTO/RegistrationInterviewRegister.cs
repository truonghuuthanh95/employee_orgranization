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
        public int ManagementUnitId { get; set; }
        public int CreatedBy { get; set; }
    }
}