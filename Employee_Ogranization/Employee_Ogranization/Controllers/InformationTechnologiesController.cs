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
    [RoutePrefix("api/informationTechnology")]
    public class InformationTechnologiesController : ApiController
    {
        IInformationTechnologyDegree informationTechnologyDegree;

        public InformationTechnologiesController(IInformationTechnologyDegree informationTechnologyDegree)
        {
            this.informationTechnologyDegree = informationTechnologyDegree;
        }
        [Route("getAllInfomationTechnology")]
        [HttpGet]
        public ResponseResult GetAllInfomationTechnology()
        {
            List<InfomationTechnologyDegree> infomationTechnologyDegrees = informationTechnologyDegree.GetAllInfomationTechnologyDegree();
            if (infomationTechnologyDegrees == null)
            {
                return new ResponseResult(404, "not found", null);
            }
            return new ResponseResult(200, "success", infomationTechnologyDegrees);
        }
    }
}
