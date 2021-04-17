using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AppForTrainings.Models
{
    public class TrainingCampContext : DbContext
    {
        public TrainingCampContext(DbContextOptions options) : base(options)
        {
        }
        public DbSet<Coach> Coaches { get; set; }
        public DbSet<Member> Members { get; set; }
        public DbSet<Sport> Sports { get; set; }
        public DbSet<Training> Trainings { get; set; }
    }
}
