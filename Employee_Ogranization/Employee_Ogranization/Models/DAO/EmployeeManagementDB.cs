namespace Employee_Ogranization.Models.DAO
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;

    public partial class EmployeeManagementDB : DbContext
    {
        public EmployeeManagementDB()
            : base("name=EmployeeManagementDB")
        {
            this.Configuration.LazyLoadingEnabled = false;
        }

        public virtual DbSet<Account> Accounts { get; set; }
        public virtual DbSet<Country> Countries { get; set; }
        public virtual DbSet<CurrentLivingAddress> CurrentLivingAddresses { get; set; }
        public virtual DbSet<DegreeClassification> DegreeClassifications { get; set; }
        public virtual DbSet<District> Districts { get; set; }
        public virtual DbSet<EducationCategory> EducationCategories { get; set; }
        public virtual DbSet<ForeignLanguageCertification> ForeignLanguageCertifications { get; set; }
        public virtual DbSet<GraduationCategory> GraduationCategories { get; set; }
        public virtual DbSet<HouseHold> HouseHolds { get; set; }
        public virtual DbSet<InfomationTechnologyDegree> InfomationTechnologyDegrees { get; set; }
        public virtual DbSet<ManagementUnit> ManagementUnits { get; set; }
        public virtual DbSet<Profile> Profiles { get; set; }
        public virtual DbSet<Province> Provinces { get; set; }
        public virtual DbSet<RegistrationInterview> RegistrationInterviews { get; set; }
        public virtual DbSet<RegistrationPrice> RegistrationPrices { get; set; }
        public virtual DbSet<ReligionCategory> ReligionCategories { get; set; }
        public virtual DbSet<Role> Roles { get; set; }
        public virtual DbSet<SalaryDegree> SalaryDegrees { get; set; }
        public virtual DbSet<School> Schools { get; set; }
        public virtual DbSet<SchoolDegree> SchoolDegrees { get; set; }
        public virtual DbSet<Subject> Subjects { get; set; }
        public virtual DbSet<TrainningCategory> TrainningCategories { get; set; }
        public virtual DbSet<Ward> Wards { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Account>()
                .Property(e => e.Password)
                .IsUnicode(false);

            modelBuilder.Entity<Account>()
                .Property(e => e.Code)
                .IsFixedLength();

            modelBuilder.Entity<Account>()
                .HasOptional(e => e.Profile)
                .WithRequired(e => e.Account);

            modelBuilder.Entity<Account>()
                .HasMany(e => e.RegistrationInterviews)
                .WithOptional(e => e.Account)
                .HasForeignKey(e => e.CreatedBy);

            modelBuilder.Entity<District>()
                .HasMany(e => e.RegistrationInterviews)
                .WithOptional(e => e.District)
                .HasForeignKey(e => e.Aspirations01DistrictId);

            modelBuilder.Entity<District>()
                .HasMany(e => e.RegistrationInterviews1)
                .WithOptional(e => e.District1)
                .HasForeignKey(e => e.Aspirations02DistrictId);

            modelBuilder.Entity<District>()
                .HasMany(e => e.RegistrationInterviews2)
                .WithOptional(e => e.District2)
                .HasForeignKey(e => e.Aspirations03DistrictId);

            modelBuilder.Entity<District>()
                .HasMany(e => e.Wards)
                .WithRequired(e => e.District)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<ForeignLanguageCertification>()
                .HasMany(e => e.RegistrationInterviews)
                .WithOptional(e => e.ForeignLanguageCertification)
                .HasForeignKey(e => e.ForeignLanguageDegreeId);

            modelBuilder.Entity<InfomationTechnologyDegree>()
                .Property(e => e.Name)
                .IsFixedLength();

            modelBuilder.Entity<ManagementUnit>()
                .HasMany(e => e.RegistrationInterviews)
                .WithOptional(e => e.ManagementUnit)
                .HasForeignKey(e => e.CreatedAtManagementUnitId);

            modelBuilder.Entity<Province>()
                .HasMany(e => e.Districts)
                .WithRequired(e => e.Province)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<RegistrationInterview>()
                .Property(e => e.IdentifyCard)
                .IsFixedLength();

            modelBuilder.Entity<RegistrationInterview>()
                .Property(e => e.PhoneNumber)
                .IsFixedLength()
                .IsUnicode(false);

            modelBuilder.Entity<ReligionCategory>()
                .HasMany(e => e.RegistrationInterviews)
                .WithOptional(e => e.ReligionCategory)
                .HasForeignKey(e => e.ReligionId);

            modelBuilder.Entity<SchoolDegree>()
                .HasMany(e => e.RegistrationInterviews)
                .WithOptional(e => e.SchoolDegree)
                .HasForeignKey(e => e.SchoolDegreeIdExpectedTeach);

            modelBuilder.Entity<Subject>()
                .Property(e => e.Code)
                .IsFixedLength()
                .IsUnicode(false);

            modelBuilder.Entity<Subject>()
                .HasMany(e => e.RegistrationInterviews)
                .WithOptional(e => e.Subject)
                .HasForeignKey(e => e.SubjectToInterviewId);
        }
    }
}
