using AppForTrainings.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AppForTrainings.Data
{
    public interface ICoachRepository
    {
        ActionResult<IEnumerable<Coach>> Get();

        Task Post(Coach coach);

        Task Update(Coach coach);

        Task Delete(int? id);
    }
}
