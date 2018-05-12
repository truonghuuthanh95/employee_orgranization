namespace Employee_Ogranization.Models.DAO
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("RegistrationPrice")]
    public partial class RegistrationPrice
    {
        public int Id { get; set; }

        public int? Value { get; set; }

        public int? ManagementUnitId { get; set; }

        public virtual ManagementUnit ManagementUnit { get; set; }
    }
}
