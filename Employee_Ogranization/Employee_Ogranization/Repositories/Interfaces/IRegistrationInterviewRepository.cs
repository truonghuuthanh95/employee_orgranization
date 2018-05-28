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
        RegistrationInterview CreateRegistrationInterview(RegistrationInterviewRegister registrationInterviewRegister);
        RegistrationInterview GetRegistrationInterviewById(int id);
        List<RegistrationInterview> GetRegistrationInterviewByIdentidfyCard(string identifyCard);
        RegistrationInterview UpdateRegistrationInterview(RegistrationInterviewDTO registrationInterviewDTO);
        RegistrationInterview GetRegistrationInterviewByIdAndIdentifyCard(int id, string identifyCard);
        RegistrationInterview UpdateRegistrationInterviewApprovedBy(RegistrationInterviewDTO registrationInterviewDTO);
        RegistrationInterview GetRegistrationInterviewByIdWithDetail(int id);
    }
}