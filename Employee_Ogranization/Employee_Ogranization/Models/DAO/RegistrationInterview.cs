namespace Employee_Ogranization.Models.DAO
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("RegistrationInterview")]
    public partial class RegistrationInterview
    {
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int Id { get; set; }

        [StringLength(50)]
        public string CandidateName { get; set; }

        public DateTime? DateInterview { get; set; }

        public DateTime? CreatedAt { get; set; }

        public DateTime? UpdatedAt { get; set; }

        public TimeSpan? TimeInterview { get; set; }

        [StringLength(15)]
        public string IdentifyCard { get; set; }

        [Column(TypeName = "date")]
        public DateTime? DOB { get; set; }

        [StringLength(12)]
        public string PhoneNumber { get; set; }

        public int? CreatedAtManagementUnitId { get; set; }

        public int? Aspirations01DistrictId { get; set; }

        public int? Aspirations02DistrictId { get; set; }

        public int? Aspirations03DistrictId { get; set; }

        public bool? IsPass { get; set; }

        [StringLength(10)]
        public string Email { get; set; }

        public int? SubjectToInterviewId { get; set; }

        public int? ForeignLanguageDegreeId { get; set; }

        public int? InfomationTechnologyDegreeId { get; set; }

        public int? ReligionId { get; set; }

        public bool? IsMale { get; set; }

        public virtual District District { get; set; }

        public virtual District District1 { get; set; }

        public virtual District District2 { get; set; }

        public virtual ForeignLanguageCertification ForeignLanguageCertification { get; set; }

        public virtual InfomationTechnologyDegree InfomationTechnologyDegree { get; set; }

        public virtual ManagementUnit ManagementUnit { get; set; }

        public virtual ReligionCategory ReligionCategory { get; set; }

        public virtual Subject Subject { get; set; }
    }
}
