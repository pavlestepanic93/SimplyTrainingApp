using AppForTrainings.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AppForTrainings.Data
{
    public class SportRepository : ISportRepository
    {

        private TrainingCampContext _trainingContext;

        public SportRepository(TrainingCampContext trainingContext)
        {
            _trainingContext = trainingContext;
        }

        public ActionResult<IEnumerable<Sport>> Get()
        {
            var sports = _trainingContext.Sports.ToList();
            return sports;
        }

        public async Task Post(Sport sport)
        {
            if (sport == null)
            {
                throw new ArgumentNullException(nameof(sport));
            }

            await _trainingContext.Sports.AddAsync(sport);
            await _trainingContext.SaveChangesAsync();
        }

        public async Task Update(Sport sport)
        {
            if (sport == null)
            {
                throw new ArgumentNullException(nameof(sport));
            }

            Sport sportInDb = _trainingContext.Sports.FirstOrDefault(s => s.SportID == sport.SportID);

            if (sportInDb == null)
            {
                throw new ArgumentNullException(nameof(sportInDb));
            }

            sportInDb.SportsName = sport.SportsName;
            sportInDb.Description = sport.Description;
            sportInDb.Difficult = sport.Difficult;
            sportInDb.MonthlyMembershipFee = sport.MonthlyMembershipFee;
            sportInDb.Trainings = sport.Trainings;

            _trainingContext.Attach(sportInDb).State = EntityState.Modified;
            await _trainingContext.SaveChangesAsync();
        }

        public async Task Delete(int? id)
        {
            if (id == null)
            {
                throw new ArgumentNullException(nameof(id));
            }

            Sport sport = _trainingContext.Sports.FirstOrDefault(s => s.SportID == id);

            if (sport == null)
            {
                throw new ArgumentNullException(nameof(sport));
            }

            _trainingContext.Sports.Remove(sport);
            await _trainingContext.SaveChangesAsync();
        }
    }
}
