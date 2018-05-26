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
            string[] arrListStr = registrationInterviewRegister.CandidateName.Split(' ');//tách trong chuỗi str trên khi gặp ký tự ' '
            

            registrationInterview.CandidateFirstName = arrListStr[arrListStr.Length - 1].Trim();
            string candidateLastName= "";
            for (int i = 0; i < arrListStr.Length - 1; i++)
            {
                candidateLastName = candidateLastName + arrListStr[i] + " ";
            }
            registrationInterview.CandidateLastName = candidateLastName.Trim();
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
            
            registrationInterview.SubjectToInterviewId = 1;
            registrationInterview.InfomationTechnologyDegreeId = 1;
            registrationInterview.ForeignLanguageDegreeId = 1;
            registrationInterview.GraduationClassficationId = 1;
            registrationInterview.SpecializedTranningId = 1;
            registrationInterview.IsHadNghiepVuSupham = false;
            registrationInterview.StatusWorkingInEducationId = 1;
            
            if (registrationInterviewRegister.ManagementUnitId == 26)
            {
                registrationInterview.Aspirations01DistrictId = 760;
                registrationInterview.Aspirations02DistrictId = 769;
                registrationInterview.Aspirations03DistrictId = 770;
                registrationInterview.SchoolDegreeIdExpectedTeach = 5;
            }
            else
            {
                registrationInterview.SchoolDegreeIdExpectedTeach = 2;
            }
            
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

        public RegistrationInterview GetRegistrationInterviewByIdWithDetail(int id)
        {
            RegistrationInterview registrationInterview = _db.RegistrationInterviews.Include("CurrentLivingAddress.Ward.District.Province")
                .Include("HouseHold.Ward.District.Province")
                .Include("DegreeClassification")
                .Include("District")
                .Include("District1")
                .Include("District2")
                .Include("District2")
                .Include("ForeignLanguageCertification")
                .Include("GraduationClassfication")
                .Include("HighestLevelEducation")
                .Include("InfomationTechnologyDegree")
                .Include("ManagementUnit")
                .Include("SchoolDegree")
                .Include("SpecializedTraining")
                .Include("StatusWorikingInEducation")
                .Include("Subject.PositionInterview")
                .Include("TrainningCategory")
                
                .SingleOrDefault(s => s.Id == id);
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
            
            registrationInterview.CandidateFirstName = registrationInterviewDTO.CandidateFirstName;
            registrationInterview.CandidateLastName = registrationInterviewDTO.CandidateLastName;
            registrationInterview.UpdatedAt = DateTime.Now;
            registrationInterview.DOB = registrationInterviewDTO.DOB;
            registrationInterview.PhoneNumber = registrationInterviewDTO.PhoneNumber;
            registrationInterview.SubjectToInterviewId = registrationInterview.SubjectToInterviewId;
            if (registrationInterviewDTO.CreatedAtManagementUnitId == 26)
            {
                registrationInterview.Aspirations01DistrictId = registrationInterviewDTO.Aspirations01DistrictId;
                registrationInterview.Aspirations02DistrictId = registrationInterviewDTO.Aspirations02DistrictId;
                registrationInterview.Aspirations03DistrictId = registrationInterviewDTO.Aspirations03DistrictId;
                registrationInterview.SchoolDegreeIdExpectedTeach = 5;
            }
            else
            {
                registrationInterview.SchoolDegreeIdExpectedTeach = registrationInterviewDTO.SchoolDegreeIdExpectedTeach;
            }
            
            registrationInterview.Email = registrationInterviewDTO.Email;
            registrationInterview.ForeignLanguageDegreeId = registrationInterviewDTO.ForeignLanguageDegreeId;
            
            registrationInterview.IsMale = registrationInterviewDTO.IsMale;
            registrationInterview.DegreeClassificationId = registrationInterviewDTO.DegreeClassificationId;
            registrationInterview.GraduatedAtYear = registrationInterviewDTO.GraduatedAtYear;
            
      
            CurrentLivingAddress currentLivingAddress = _db.CurrentLivingAddresses.Where(s => s.Id == registrationInterview.CurrentLivingAddressId).SingleOrDefault();
            currentLivingAddress.WardId = registrationInterviewDTO.CurrentLivingAddressId;
            currentLivingAddress.HouseNumber = registrationInterviewDTO.CurrentLivingAddressHouseNumber;
            HouseHold houseHold = _db.HouseHolds.Where(s => s.Id == registrationInterview.HouseHoldId).SingleOrDefault();
            houseHold.WardId = registrationInterviewDTO.HouseHoldId;
            houseHold.HouseNumber = registrationInterviewDTO.HouseHoldHouseNumber;

            registrationInterview.StatusWorkingInEducationId = registrationInterviewDTO.StatusWorkingInEducationId;
            registrationInterview.GraduationClassficationId = registrationInterviewDTO.GraduationClassficationId;
            registrationInterview.SpecializedTranningId = registrationInterviewDTO.SpecializedTranningId;
            registrationInterview.IsNienChe = registrationInterviewDTO.IsNienChe;
            registrationInterview.GPA = registrationInterviewDTO.GPA;
            if (registrationInterviewDTO.IsNienChe == true)
            {
                registrationInterview.CaptionProjectPoint = registrationInterviewDTO.CaptionProjectPoint;
            }
            registrationInterview.TrainningCatergoryId = registrationInterviewDTO.TrainningCatergoryId;
            registrationInterview.HighestLevelEducationId = registrationInterviewDTO.HighestLevelEducationId;
            if (registrationInterviewDTO.TrainningCatergoryId == 1 || registrationInterviewDTO.TrainningCatergoryId == 3 || registrationInterviewDTO.TrainningCatergoryId == 5)
            {
                registrationInterview.IsHadNghiepVuSupham = true;
            }
            registrationInterview.InfomationTechnologyDegreeId = registrationInterviewDTO.InfomationTechnologyDegreeId;
            registrationInterview.GraduationClassficationId = registrationInterview.GraduationClassficationId;
            
            registrationInterview.NamVaoNghanh = registrationInterviewDTO.NamVaoNghanh;
            registrationInterview.MaNgach = registrationInterviewDTO.MaNgach;
            registrationInterview.MocNangLuongLansau = registrationInterviewDTO.MocNangLuongLansau;
            registrationInterview.HeSoLuong = registrationInterviewDTO.HeSoLuong;
            _db.Entry(registrationInterview).State = EntityState.Modified;
            _db.Entry(currentLivingAddress).State = EntityState.Modified;
            _db.Entry(houseHold).State = EntityState.Modified;
            try
            {
                _db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                return registrationInterview = null;
            }

            return GetRegistrationInterviewByIdWithDetail(registrationInterview.Id);
        }

        public RegistrationInterview UpdateRegistrationInterviewApprovedBy(RegistrationInterviewDTO registrationInterviewDTO)
        {
            RegistrationInterview registrationInterview = GetRegistrationInterviewById(registrationInterviewDTO.Id);
            registrationInterview.IsPass = registrationInterviewDTO.IsPass;
            registrationInterview.ReviewedBy = registrationInterviewDTO.ReviewedBy;
            registrationInterview.DateInterview = DateTime.Now;
            registrationInterview.CandidateFirstName = registrationInterviewDTO.CandidateFirstName;
            registrationInterview.CandidateLastName = registrationInterviewDTO.CandidateLastName;
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
         
            registrationInterview.IsMale = registrationInterviewDTO.IsMale;
            registrationInterview.DegreeClassificationId = registrationInterviewDTO.DegreeClassificationId;
            registrationInterview.GraduatedAtYear = registrationInterviewDTO.GraduatedAtYear;
            registrationInterview.CurrentLivingAddressId = registrationInterviewDTO.CurrentLivingAddressId;
            registrationInterview.HouseHoldId = registrationInterviewDTO.HouseHoldId;
            
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