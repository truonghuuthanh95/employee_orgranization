namespace Employee_Ogranization.Models.DAO
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Account")]
    public partial class Account
    {
        public int Id { get; set; }

        [StringLength(50)]
        public string Username { get; set; }

        [StringLength(50)]
        public string Password { get; set; }

        public int? RoleId { get; set; }

        public bool? IsActive { get; set; }

        public int? ManagementUnitId { get; set; }

        [StringLength(10)]
        public string Code { get; set; }

        public virtual ManagementUnit ManagementUnit { get; set; }

        public virtual Role Role { get; set; }

        public virtual Profile Profile { get; set; }
    }
}
