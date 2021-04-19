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
    public class CoachesController : ControllerBase
    {
        private readonly ICoachRepository _coachRepo;

        public CoachesController(ICoachRepository repo)
        {
            _coachRepo = repo;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Coach>> GetValues()
        {
            var coaches = _coachRepo.Get();
            return Ok(coaches);
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromBody] Coach coach)
        {
            if (coach == null)
            {
                return NotFound("Getting null for coach");
            }

            await _coachRepo.Post(coach);
            return Ok(coach);
        }

        [HttpPut]
        public async Task<ActionResult> Update([FromBody] Coach coach)
        {
            if (coach == null)
            {
                return NotFound("Getting null for coach");
            }

            await _coachRepo.Update(coach);
            return Ok(coach);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound("Getting null for coach");
            }

            await _coachRepo.Delete(id);
            return Ok(id);
        }
    }
}
