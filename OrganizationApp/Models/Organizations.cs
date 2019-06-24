using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace OrganizationApp.Models
{
    public partial class Organizations
    {
        public Organizations()
        {
            Users = new HashSet<Users>();
        }
        [Key]
        public int OrganizationId { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Zip { get; set; }

        public virtual ICollection<Users> Users { get; set; }
    }
}
