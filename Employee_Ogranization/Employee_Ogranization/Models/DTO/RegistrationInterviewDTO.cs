using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Employee_Ogranization.Models.DTO
{
    public class RegistrationInterviewDTO
    {
        public int Id { get; set; }

        [StringLength(50)]
        public string CandidateName { get; set; }

        public TimeSpan? TimeInterview { get; set; }

        [StringLength(15)]
        public string IdentifyCard { get; set; }
       
        public DateTime? DOB { get; set; }

        [StringLength(12)]
        public string PhoneNumber { get; set; }      

        public int? Aspirations01DistrictId { get; set; }

        public int? Aspirations02DistrictId { get; set; }

        public int? Aspirations03DistrictId { get; set; }

        public bool? IsPass { get; set; }

        [StringLength(50)]
        public string Email { get; set; }

        public int? SubjectToInterviewId { get; set; }

        public int? ForeignLanguageDegreeId { get; set; }

        public int? InfomationTechnologyDegreeId { get; set; }

        public int? ReligionId { get; set; }

        public bool? IsMale { get; set; }

        public int? DegreeClassificationId { get; set; }

        public short? GraduatedAtYear { get; set; }

        public int? CreatedBy { get; set; }

        public int? CurrentLivingAddressId { get; set; }

        public int? HouseHoldId { get; set; }

       
        public int GraduatedAtSubject { get; set; }

        public int? SchoolDegreeIdExpectedTeach { get; set; }

        public int? Price { get; set; }

        public int? SpecializedTranningId { get; set; }

        public bool? IsNienChe { get; set; }

        public double? GPA { get; set; }

        public double? CaptionProjectPoint { get; set; }

        public int? TrainningCatergoryId { get; set; }

        public int? HighestLevelEducationId { get; set; }
        public int? ReviewedBy { get; set; }
    }
}