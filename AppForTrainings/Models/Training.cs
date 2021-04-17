using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace AppForTrainings.Models
{
    public class Training
    {
        [Key]
        public int TrainingID { get; set; }
        [Required]
        public DateTime TimeAndDateOfTraining { get; set; }

        public Coach Coach { get; set; }
        public Member Member { get; set; }
        public Sport Sport { get; set; }
    }
}
