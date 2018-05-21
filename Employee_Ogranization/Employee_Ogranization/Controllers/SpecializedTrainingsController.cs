using Employee_Ogranization.Models.DAO;
using Employee_Ogranization.Models.DTO;
using Employee_Ogranization.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Employee_Ogranization.Controllers
{
    [RoutePrefix("api/specializedTraining")]
    public class SpecializedTrainingsController : ApiController
    {

        ISpecializedTrainingRepository specializedTrainingRepository;

        public SpecializedTrainingsController(ISpecializedTrainingRepository specializedTrainingRepository)
        {
            this.specializedTrainingRepository = specializedTrainingRepository;
        }
        [Route("getAllSpecializedTraining")]
        [HttpGet]
        public ResponseResult GetAllSpecializedTraining()
        {
            List<SpecializedTraining> specializedTrainings = specializedTrainingRepository.GetSpecializedTrainings();
            if (specializedTrainings == null)
            {
                return new ResponseResult(404, "not found", null);
            }
            return new ResponseResult(200, "success", specializedTrainings);
        }
    }
}
