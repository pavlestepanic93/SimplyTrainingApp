using AppForTrainings.Data;
using AppForTrainings.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AppForTrainings.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TrainingsController : ControllerBase
    {
        private readonly ITrainingRepository _trainingRepo;
        private readonly ICoachRepository _coachRepo;
        private readonly ISportRepository _sportRepo;
        private readonly IMemberRepository _memberRepo;

        public TrainingsController(ITrainingRepository repo, ICoachRepository repoCoach, ISportRepository repoSport, IMemberRepository repoMember)
        {
            _trainingRepo = repo;
            _coachRepo = repoCoach;
            _sportRepo = repoSport;
            _memberRepo = repoMember;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Training>> GetValues()
        {
            var trainings = _trainingRepo.Get();
            if (trainings == null)
            {
                return NotFound("Getting null for trainings");
            }
            return Ok(trainings);
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromBody] Training training)
        {
            if (training == null)
            {
                return NotFound("Getting null for training");
            }

            var tmpCoach = _coachRepo.GetById(training.Coach.CoachID);
            var tmpSport = _sportRepo.GetById(training.Sport.SportID);
            var tmpMember = _memberRepo.GetById(training.Member.MemberID);

            Training trainingTmp = new Training()
            {
                Coach = tmpCoach,
                Sport = tmpSport,
                Member = tmpMember,
                TimeAndDateOfTraining = training.TimeAndDateOfTraining
            };

            if (trainingTmp == null)
            {
                return NotFound("Getting null for trainingTmp");
            }

            await _trainingRepo.Post(trainingTmp);
            return Ok(trainingTmp);
        }

        [HttpPut]
        public async Task<ActionResult> Update([FromBody] Training training)
        {
            if (training == null)
            {
                return NotFound("Getting null for training");
            }

            await _trainingRepo.Update(training);
            return Ok(training);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound("Getting null for training");
            }
            await _trainingRepo.Delete(id);
            return Ok(id);
        }
    }
}
