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
    [RoutePrefix("api/statusWorikingInEducation")]
    public class StatusWorikingInEducationsController : ApiController
    {
        IStatusWorikingInEducationRepository statusWorikingInEducationRepository;

        public StatusWorikingInEducationsController(IStatusWorikingInEducationRepository statusWorikingInEducationRepository)
        {
            this.statusWorikingInEducationRepository = statusWorikingInEducationRepository;
        }

        [Route("getAllStatusWorikingInEducation")]
        [HttpGet]
        public ResponseResult GetAllStatusWorikingInEducation()
        {
            List<StatusWorikingInEducation> statusWorikingInEducations = statusWorikingInEducationRepository.GetStatusWorikingInEducations();
            if (statusWorikingInEducationRepository == null)
            {
                return new ResponseResult(404, "not found", null);
            }
            return new ResponseResult(200, "success", statusWorikingInEducations);
        }
    }
}
