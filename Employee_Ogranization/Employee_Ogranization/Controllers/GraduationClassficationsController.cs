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
    [RoutePrefix("api/graduationClassfication")]
    public class GraduationClassficationsController : ApiController
    {
        IGraduationClassficationRepository graduationClassficationRepository;

        public GraduationClassficationsController(IGraduationClassficationRepository graduationClassficationRepository)
        {
            this.graduationClassficationRepository = graduationClassficationRepository;
        }

        [Route("GetAllGraduationClassfication")]
        [HttpGet]
        public ResponseResult GetAllGraduationClassfication()
        {
            List<GraduationClassfication> graduationClassfications = graduationClassficationRepository.GetGraduationClassfications();
            if (graduationClassfications == null)
            {
                return new ResponseResult(404, "not found", null);
            }
            return new ResponseResult(200, "success", graduationClassfications);
        }
    }
}
