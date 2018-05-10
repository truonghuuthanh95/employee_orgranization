namespace Employee_Ogranization.Models.DAO
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("EducationCategory")]
    public partial class EducationCategory
    {
        public int Id { get; set; }

        [StringLength(100)]
        public string Name { get; set; }
    }
}
