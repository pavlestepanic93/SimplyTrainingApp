using AppForTrainings.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AppForTrainings.Data
{
    public interface IMemberRepository
    {
        ActionResult<IEnumerable<Member>> Get();

        Task Post(Member member);

        Task Update(Member member);

        Task Delete(int? id);
    }
}
