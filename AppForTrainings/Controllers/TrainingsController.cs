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

        public TrainingsController(ITrainingRepository repo)
        {
            _trainingRepo = repo;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Training>> GetValues()
        {
            var trainings = _trainingRepo.Get();
            return Ok(trainings);
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromBody] Training training)
        {
            if (training == null)
            {
                return NotFound("Getting null for training");
            }
            await _trainingRepo.Post(training);
            return Ok("Added training");
        }

        [HttpPut]
        public async Task<ActionResult> Update([FromBody] Training training)
        {
            if (training == null)
            {
                return NotFound("Getting null for training");
            }

            await _trainingRepo.Update(training);
            return Ok("Updated training");
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound("Getting null for training");
            }
            await _trainingRepo.Delete(id);
            return Ok("Deleted training");
        }
    }
}
