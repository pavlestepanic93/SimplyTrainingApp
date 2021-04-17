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
    public class MembersController : ControllerBase
    {
        private readonly IMemberRepository _memberRepo;

        public MembersController(IMemberRepository repo)
        {
            _memberRepo = repo;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Member>> GetValues()
        {
            var members = _memberRepo.Get();
            return Ok(members);
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromBody] Member member)
        {
            if (member == null)
            {
                return NotFound("Getting null for member");
            }
            await _memberRepo.Post(member);
            return Ok("Added member");
        }

        [HttpPut]
        public async Task<ActionResult> Update([FromBody] Member member)
        {
            if (member == null)
            {
                return NotFound("Getting null for member");
            }

            await _memberRepo.Update(member);
            return Ok("Updated member");
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound("Getting null for member");
            }
            await _memberRepo.Delete(id);
            return Ok("Deleted member");
        }
    }
}
