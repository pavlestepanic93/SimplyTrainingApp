using AppForTrainings.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AppForTrainings.Data
{
    public class MemberRepository : IMemberRepository
    {
        private TrainingCampContext _trainingContext;

        public MemberRepository(TrainingCampContext trainingContext)
        {
            _trainingContext = trainingContext;
        }

        public ActionResult<IEnumerable<Member>> Get()
        {
            var members = _trainingContext.Members
                            .Include(t => t.Trainings)
                            .ToList();
            return members;
        }

        public async Task Post(Member member)
        {
            if (member == null)
            {
                throw new ArgumentNullException(nameof(member));
            }

            await _trainingContext.Members.AddAsync(member);
            await _trainingContext.SaveChangesAsync();
        }

        public async Task Update(Member member)
        {
            if (member == null)
            {
                throw new ArgumentNullException(nameof(member));
            }

            Member memberInDb = _trainingContext.Members.FirstOrDefault(m => m.MemberID == member.MemberID);

            if (memberInDb == null)
            {
                throw new ArgumentNullException(nameof(memberInDb));
            }

            memberInDb.MemberID = member.MemberID;
            memberInDb.FullName = member.FullName;
            memberInDb.PhoneNumber = member.PhoneNumber;
            memberInDb.Email = member.Email;
            memberInDb.MembershipType = member.MembershipType;
            memberInDb.Trainings = member.Trainings;

            _trainingContext.Attach(memberInDb).State = EntityState.Modified;
            await _trainingContext.SaveChangesAsync();
        }

        public async Task Delete(int? id)
        {
            if (id == null)
            {
                throw new ArgumentNullException(nameof(id));
            }

            Member member = _trainingContext.Members.FirstOrDefault(m => m.MemberID == id);

            if (member == null)
            {
                throw new ArgumentNullException(nameof(member));
            }

            _trainingContext.Members.Remove(member);
            await _trainingContext.SaveChangesAsync();
        }

        public Member GetById(int? id)
        {
            if (id == null)
            {
                throw new ArgumentNullException(nameof(id));
            }

            Member member = _trainingContext.Members.FirstOrDefault(m => m.MemberID == id);

            if (member == null)
            {
                throw new ArgumentNullException(nameof(member));
            }

            return member;
        }
    }
}
