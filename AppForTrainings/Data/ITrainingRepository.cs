using AppForTrainings.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AppForTrainings.Data
{
    public interface ITrainingRepository
    {
        ActionResult<IEnumerable<Training>> Get();

        Training GetById(int? id);

        Task Post(Training training);

        Task Update(Training training);

        Task Delete(int? id);
    }
}
