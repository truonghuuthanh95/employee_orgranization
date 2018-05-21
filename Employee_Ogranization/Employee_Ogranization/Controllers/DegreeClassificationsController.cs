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
    [RoutePrefix("api/degreeClassfication")]
    public class DegreeClassificationsController : ApiController
    {
        IDegreeClassificationRepository degreeClassificationRepository;


        public DegreeClassificationsController(IDegreeClassificationRepository degreeClassificationRepository)
        {
            this.degreeClassificationRepository = degreeClassificationRepository;
        }
        [Route("getAllDegreeClassfication")]
        [HttpGet]
        public ResponseResult GetAllDegreeClassfication()
        {
            List<DegreeClassification> degreeClassifications = degreeClassificationRepository.GetDegreeClassifications();
            if (degreeClassifications == null)
            {
                return new ResponseResult(404, "not found", null);
            }
            return new ResponseResult(200, "success", degreeClassifications);
        }
    }
}
