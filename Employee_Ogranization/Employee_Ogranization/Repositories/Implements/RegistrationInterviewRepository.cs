using Employee_Ogranization.Models.DAO;
using Employee_Ogranization.Models.DTO;
using Employee_Ogranization.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
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
            RegistrationInterview registrationInterview = new RegistrationInterview();
            CurrentLivingAddress currentLivingAddress = new CurrentLivingAddress();
            currentLivingAddress.WardId = 26740;
            _db.CurrentLivingAddresses.Add(currentLivingAddress);
            HouseHold houseHold = new HouseHold();
            houseHold.WardId = 26740;
            _db.HouseHolds.Add(houseHold);
            _db.SaveChanges();
            registrationInterview.CandidateName = registrationInterviewRegister.CandidateName;
            registrationInterview.IdentifyCard = registrationInterviewRegister.IdentifyCard;
            registrationInterview.Price = registrationInterviewRegister.RegistrationPrice;
            registrationInterview.CreatedAt = DateTime.Now;
            registrationInterview.CreatedAtManagementUnitId = registrationInterviewRegister.ManagementUnitId;
            registrationInterview.CreatedBy = registrationInterviewRegister.CreatedBy;
            registrationInterview.DOB = DateTime.Now.AddDays(1).AddMonths(1);
            registrationInterview.IsMale = true;
            registrationInterview.CurrentLivingAddressId = currentLivingAddress.Id;
            registrationInterview.HouseHoldId = houseHold.Id;
            registrationInterview.GraduatedAtYear = Convert.ToInt16(DateTime.Now.Year);
            registrationInterview.IsNienChe = true;
            registrationInterview.UniversityLocation = 79;
            registrationInterview.TrainningCatergoryId = 1;
            registrationInterview.DegreeClassificationId = 1;
            registrationInterview.HighestLevelEducationId = 1;
            registrationInterview.GraduatedAtSubject = 1;
            registrationInterview.SubjectToInterviewId = 1;
            registrationInterview.InfomationTechnologyDegreeId = 1;
            registrationInterview.ForeignLanguageDegreeId = 1;
            registrationInterview.GraduationClassficationId = 1;
            registrationInterview.SpecializedTranningId = 1;
            registrationInterview.IsHadNghiepVuSupham = true;
            registrationInterview.StatusWorkingInEducationId = 1;
            registrationInterview.SubjectToInterviewId = 1;
            if (registrationInterviewRegister.ManagementUnitId == 26)
            {
                registrationInterview.Aspirations01DistrictId = 760;
                registrationInterview.Aspirations02DistrictId = 769;
                registrationInterview.Aspirations03DistrictId = 770;
                registrationInterview.SchoolDegreeIdExpectedTeach = 5;
            }
            registrationInterview.SchoolDegreeIdExpectedTeach = 2;
            _db.RegistrationInterviews.Add(registrationInterview);
            _db.SaveChanges();
            return GetRegistrationInterviewById(registrationInterview.Id);
        }

        public RegistrationInterview GetRegistrationInterviewById(int id)
        {
            var registrationInterview = _db.RegistrationInterviews
               .Include("CurrentLivingAddress.Ward.District.Province")
               .Include("HouseHold.Ward.District.Province")
               .SingleOrDefault(s => s.Id == id);
               
            return registrationInterview;
        }

        public RegistrationInterview GetRegistrationInterviewByIdAndIdentifyCard(int id, string identifyCard)
        {
            RegistrationInterview registrationInterview = _db.RegistrationInterviews
                .Include("CurrentLivingAddress.Ward.District.Province")
                .Include("HouseHold.Ward.District.Province")
                .SingleOrDefault(s => s.Id == id);
            if (registrationInterview == null || registrationInterview.IdentifyCard.Trim() != identifyCard)
            {
                return null;

            }
            
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

        public RegistrationInterview UpdateRegistrationInterview(RegistrationInterviewDTO registrationInterviewDTO)
        {
            RegistrationInterview registrationInterview = GetRegistrationInterviewById(registrationInterviewDTO.Id);
            
            registrationInterview.CandidateName = registrationInterviewDTO.CandidateName;
            
            registrationInterview.UpdatedAt = DateTime.Now;
            registrationInterview.IdentifyCard = registrationInterviewDTO.IdentifyCard;
            registrationInterview.DOB = registrationInterviewDTO.DOB;
            registrationInterview.PhoneNumber = registrationInterviewDTO.PhoneNumber;
            if (registrationInterviewDTO.Aspirations01DistrictId != null && registrationInterviewDTO.Aspirations02DistrictId != null && registrationInterviewDTO.Aspirations03DistrictId != null)
            {
                registrationInterview.Aspirations01DistrictId = registrationInterviewDTO.Aspirations01DistrictId;
                registrationInterview.Aspirations02DistrictId = registrationInterviewDTO.Aspirations02DistrictId;
                registrationInterview.Aspirations03DistrictId = registrationInterviewDTO.Aspirations03DistrictId;

            }
            registrationInterview.Email = registrationInterviewDTO.Email;
            registrationInterview.ForeignLanguageDegreeId = registrationInterviewDTO.ForeignLanguageDegreeId;
            registrationInterview.ReligionId = registrationInterviewDTO.ReligionId;
            registrationInterview.IsMale = registrationInterviewDTO.IsMale;
            registrationInterview.DegreeClassificationId = registrationInterviewDTO.DegreeClassificationId;
            registrationInterview.GraduatedAtYear = registrationInterviewDTO.GraduatedAtYear;
            registrationInterview.CurrentLivingAddressId = registrationInterviewDTO.CurrentLivingAddressId;
            registrationInterview.HouseHoldId = registrationInterviewDTO.HouseHoldId;
            registrationInterview.GraduatedAtSubject = registrationInterviewDTO.GraduatedAtSubject;
            if (registrationInterviewDTO.SchoolDegreeIdExpectedTeach != null)
            {
                registrationInterview.SchoolDegreeIdExpectedTeach = registrationInterviewDTO.SchoolDegreeIdExpectedTeach;

            }
            else
            {
                registrationInterview.SchoolDegreeIdExpectedTeach = 3;
            }
            registrationInterview.SpecializedTranningId = registrationInterviewDTO.SpecializedTranningId;
            registrationInterview.IsNienChe = registrationInterviewDTO.IsNienChe;
            registrationInterview.GPA = registrationInterviewDTO.GPA;
            if (registrationInterviewDTO.IsNienChe == true)
            {
                registrationInterview.CaptionProjectPoint = registrationInterviewDTO.CaptionProjectPoint;
            }
            registrationInterview.TrainningCatergoryId = registrationInterviewDTO.TrainningCatergoryId;
            registrationInterview.HighestLevelEducationId = registrationInterviewDTO.HighestLevelEducationId;
            _db.Entry(registrationInterview).State = EntityState.Modified;
            try
            {
                _db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                return registrationInterview = null;
            }

            return GetRegistrationInterviewById(registrationInterview.Id);
        }

        public RegistrationInterview UpdateRegistrationInterviewApprovedBy(RegistrationInterviewDTO registrationInterviewDTO)
        {
            RegistrationInterview registrationInterview = GetRegistrationInterviewById(registrationInterviewDTO.Id);
            registrationInterview.IsPass = registrationInterviewDTO.IsPass;
            registrationInterview.ReviewedBy = registrationInterviewDTO.ReviewedBy;
            registrationInterview.DateInterview = DateTime.Now;
            registrationInterview.CandidateName = registrationInterviewDTO.CandidateName;
            registrationInterview.IdentifyCard = registrationInterviewDTO.IdentifyCard;
            registrationInterview.DOB = registrationInterviewDTO.DOB;
            registrationInterview.PhoneNumber = registrationInterviewDTO.PhoneNumber;
            if (registrationInterviewDTO.Aspirations01DistrictId != null && registrationInterviewDTO.Aspirations02DistrictId != null && registrationInterviewDTO.Aspirations03DistrictId != null)
            {
                registrationInterview.Aspirations01DistrictId = registrationInterviewDTO.Aspirations01DistrictId;
                registrationInterview.Aspirations02DistrictId = registrationInterviewDTO.Aspirations02DistrictId;
                registrationInterview.Aspirations03DistrictId = registrationInterviewDTO.Aspirations03DistrictId;

            }
            registrationInterview.Email = registrationInterviewDTO.Email;
            registrationInterview.ForeignLanguageDegreeId = registrationInterviewDTO.ForeignLanguageDegreeId;
            registrationInterview.ReligionId = registrationInterviewDTO.ReligionId;
            registrationInterview.IsMale = registrationInterviewDTO.IsMale;
            registrationInterview.DegreeClassificationId = registrationInterviewDTO.DegreeClassificationId;
            registrationInterview.GraduatedAtYear = registrationInterviewDTO.GraduatedAtYear;
            registrationInterview.CurrentLivingAddressId = registrationInterviewDTO.CurrentLivingAddressId;
            registrationInterview.HouseHoldId = registrationInterviewDTO.HouseHoldId;
            registrationInterview.GraduatedAtSubject = registrationInterviewDTO.GraduatedAtSubject;
            if (registrationInterviewDTO.SchoolDegreeIdExpectedTeach != null)
            {
                registrationInterview.SchoolDegreeIdExpectedTeach = registrationInterviewDTO.SchoolDegreeIdExpectedTeach;

            }
            else
            {
                registrationInterview.SchoolDegreeIdExpectedTeach = 5;
            }
            registrationInterview.SpecializedTranningId = registrationInterviewDTO.SpecializedTranningId;
            registrationInterview.IsNienChe = registrationInterviewDTO.IsNienChe;
            registrationInterview.GPA = registrationInterviewDTO.GPA;
            if (registrationInterviewDTO.IsNienChe == true)
            {
                registrationInterview.CaptionProjectPoint = registrationInterviewDTO.CaptionProjectPoint;
            }
            registrationInterview.TrainningCatergoryId = registrationInterviewDTO.TrainningCatergoryId;
            registrationInterview.HighestLevelEducationId = registrationInterviewDTO.HighestLevelEducationId;
            _db.Entry(registrationInterview).State = EntityState.Modified;
            try
            {
                _db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                return registrationInterview = null;
            }

            return GetRegistrationInterviewById(registrationInterview.Id);
        }
    }
}