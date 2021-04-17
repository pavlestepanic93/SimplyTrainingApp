using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace AppForTrainings.Models
{
    public class Member
    {
        [Key]
        public int MemberID { get; set; }
        [Required]
        public string FullName { get; set; }
        [Required]
        public string PhoneNumber { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public string MembershipType { get; set; }
        public ICollection<Training> Trainings { get; set; }
    }
}
