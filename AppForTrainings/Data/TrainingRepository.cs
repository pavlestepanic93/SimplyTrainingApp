using AppForTrainings.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AppForTrainings.Data
{
    public class TrainingRepository : ITrainingRepository
    {
        private TrainingCampContext _trainingContext;

        public TrainingRepository(TrainingCampContext trainingContext)
        {
            _trainingContext = trainingContext;
        }

        public ActionResult<IEnumerable<Training>> Get()
        {
            var trainings = _trainingContext.Trainings.ToList();
            return trainings;
        }

        public async Task Post(Training training)
        {
            if (training == null)
            {
                throw new ArgumentNullException(nameof(training));
            }

            await _trainingContext.Trainings.AddAsync(training);
            await _trainingContext.SaveChangesAsync();
        }

        public async Task Update(Training training)
        {
            if (training == null)
            {
                throw new ArgumentNullException(nameof(training));
            }

            Training trainingInDb = _trainingContext.Trainings.FirstOrDefault(t => t.TrainingID == training.TrainingID);

            if (trainingInDb == null)
            {
                throw new ArgumentNullException(nameof(trainingInDb));
            }

            trainingInDb.TimeAndDateOfTraining = training.TimeAndDateOfTraining;
            trainingInDb.Coach = training.Coach;
            trainingInDb.Member = training.Member;
            trainingInDb.Sport = training.Sport;

            _trainingContext.Attach(trainingInDb).State = EntityState.Modified;
            await _trainingContext.SaveChangesAsync();
        }

        public async Task Delete(int? id)
        {
            if (id == null)
            {
                throw new ArgumentNullException(nameof(id));
            }

            Training training = _trainingContext.Trainings.FirstOrDefault(t => t.TrainingID == id);

            if (training == null)
            {
                throw new ArgumentNullException(nameof(training));
            }

            _trainingContext.Trainings.Remove(training);
            await _trainingContext.SaveChangesAsync();
        }
    }
}
