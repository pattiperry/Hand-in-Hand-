using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Hand_in_Hand.Models
{
    public class Organization
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public string FirebaseUserId { get; set; }
        public string OrganizationName { get; set; }
        public string Url { get; set; }
        public string Location { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string ContactPerson { get; set; }


    }
}
