using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace AppForTrainings.Models
{
    public class Coach
    {
        [Key]
        public int CoachID { get; set; }
        [Required]
        public string FullName { get; set; }
        [Required]
        public string PhoneNumber { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public string Experience { get; set; }

        public ICollection<Training> Trainings { get; set; }
    }
}
