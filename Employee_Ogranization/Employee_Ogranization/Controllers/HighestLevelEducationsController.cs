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
    [RoutePrefix("api/highestLevelEducation")]
    public class HighestLevelEducationsController : ApiController
    {
        IHighestLevelEducationRepository highestLevelEducationRepository;

        public HighestLevelEducationsController(IHighestLevelEducationRepository highestLevelEducationRepository)
        {
            this.highestLevelEducationRepository = highestLevelEducationRepository;
        }
        [Route("getAllHighestLevelEducation")]
        [HttpGet]
        public ResponseResult GetAllHighestLevelEducation()
        {
            List<HighestLevelEducation> highestLevelEducations = highestLevelEducationRepository.GetHighestLevelEducations();
            if (highestLevelEducations == null)
            {
                return new ResponseResult(404, "not found", null);
            }
            return new ResponseResult(200, "success", highestLevelEducations);
        }
    }
}
