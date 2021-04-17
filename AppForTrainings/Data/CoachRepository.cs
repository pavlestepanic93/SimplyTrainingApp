using AppForTrainings.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AppForTrainings.Data
{
    public class CoachRepository : ICoachRepository
    {
        private TrainingCampContext _trainingContext;

        public CoachRepository(TrainingCampContext trainingContext)
        {
            _trainingContext = trainingContext;
        }

        public ActionResult<IEnumerable<Coach>> Get()
        {
            var coaches = _trainingContext.Coaches.ToList();
            return coaches;
        }

        public async Task Post(Coach coach)
        {
            if (coach == null)
            {
                throw new ArgumentNullException(nameof(coach));
            }

            await _trainingContext.Coaches.AddAsync(coach);
            await _trainingContext.SaveChangesAsync();
        }

        public async Task Update(Coach coach)
        {
            if(coach == null)
            {
                throw new ArgumentNullException(nameof(coach));
            }

            Coach coachInDb = _trainingContext.Coaches.FirstOrDefault(c => c.CoachID == coach.CoachID);

            if(coachInDb == null)
            {
                throw new ArgumentNullException(nameof(coachInDb));
            }

            coachInDb.FullName = coach.FullName;
            coachInDb.PhoneNumber = coach.PhoneNumber;
            coachInDb.Email = coach.Email;
            coachInDb.Experience = coach.Experience;
            coachInDb.Trainings = coach.Trainings;

            _trainingContext.Attach(coachInDb).State = EntityState.Modified;
            await _trainingContext.SaveChangesAsync();
        }

        public async Task Delete(int? id)
        {
            if(id == null)
            {
                throw new ArgumentNullException(nameof(id));
            }

            Coach coach = _trainingContext.Coaches.FirstOrDefault(c => c.CoachID == id);

            if(coach == null)
            {
                throw new ArgumentNullException(nameof(coach));
            }

            _trainingContext.Coaches.Remove(coach);
            await _trainingContext.SaveChangesAsync();
        }
    }
}
