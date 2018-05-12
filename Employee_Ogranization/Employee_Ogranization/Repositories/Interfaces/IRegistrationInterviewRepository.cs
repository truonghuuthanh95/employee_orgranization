using Employee_Ogranization.Models.DAO;
using Employee_Ogranization.Models.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Employee_Ogranization.Repositories.Interfaces
{
    public interface IRegistrationInterviewRepository
    {
        int IsvalidToRegistrationInterview(String identifyCard);
        RegistrationInterview CreateRegistrationInterview(RegistrationInterviewRegister registrationInterviewRegister);
        RegistrationInterview GetRegistrationInterviewById(int id);
        List<RegistrationInterview> GetRegistrationInterviewByIdentidfyCard(string identifyCard);
        RegistrationInterview UpdateRegistrationInterview(RegistrationInterview registrationInterview);
        RegistrationInterview GetRegistrationInterviewByIdAndIdentifyCard(int id, string identifyCard);

    }
}