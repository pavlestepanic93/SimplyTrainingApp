using AppForTrainings.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AppForTrainings.Data
{
    public interface ISportRepository
    {
        ActionResult<IEnumerable<Sport>> Get();

        Sport GetById(int? id);

        Task Post(Sport sport);

        Task Update(Sport sport);

        Task Delete(int? id);
    }
}
