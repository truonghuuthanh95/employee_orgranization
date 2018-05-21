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
    [RoutePrefix("api/schoolDegree")]
    public class SchoolDegreesController : ApiController
    {
        ISchoolDegreeRepository schoolDegreeRepository;

        public SchoolDegreesController(ISchoolDegreeRepository schoolDegreeRepository)
        {
            this.schoolDegreeRepository = schoolDegreeRepository;
        }
        [Route("getSchoolDegreeForManagementUnit")]
        [HttpGet]
        public ResponseResult GetSchoolDegreeForManagementUnit()
        {
            List<SchoolDegree> schoolDegrees = schoolDegreeRepository.GetSchoolDegrees();
            if (schoolDegrees == null)
            {
                return new ResponseResult(404, "not found", null);

            }
            return new ResponseResult(200, "success", schoolDegrees);
        }
    }
}
