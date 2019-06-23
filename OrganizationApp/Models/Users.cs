using System;
using System.Collections.Generic;

namespace OrganizationApp.Models
{
    public partial class Users
    {
        public int UserId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string UserStatus { get; set; }
        public string Email { get; set; }
        public string UserRole { get; set; }
        public int? OrganizationId { get; set; }

        public virtual Organizations Organization { get; set; }
    }
}
