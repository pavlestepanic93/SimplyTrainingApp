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
    public class SportsController : ControllerBase
    {
        private readonly ISportRepository _sportRepo;

        public SportsController(ISportRepository repo)
        {
            _sportRepo = repo;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Sport>> GetValues()
        {
            var sports = _sportRepo.Get();
            return Ok(sports);
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromBody] Sport sport)
        {
            if (sport == null)
            {
                return NotFound("Getting null for sport");
            }

            await _sportRepo.Post(sport);
            return Ok(sport);
        }

        [HttpPut]
        public async Task<ActionResult> Update([FromBody] Sport sport)
        {
            if (sport == null)
            {
                return NotFound("Getting null for sport");
            }

            await _sportRepo.Update(sport);
            return Ok("Updated sport");
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound("Getting null for sport");
            }

            await _sportRepo.Delete(id);
            return Ok("Deleted sport");
        }
    }
}
