using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace AppForTrainings.Models
{
    public class Sport
    {
        [Key]
        public int SportID { get; set; }
        [Required]
        public string SportsName { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        public string Difficult { get; set; }
        [Required]
        public string MonthlyMembershipFee { get; set; }

        public ICollection<Training> Trainings { get; set; }
    }
}
