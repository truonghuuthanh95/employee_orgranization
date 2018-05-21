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
    [RoutePrefix("api/district")]
    public class DistrictsController : ApiController
    {
        IDistrictRepository districtRepository;

        public DistrictsController(IDistrictRepository districtRepository)
        {
            this.districtRepository = districtRepository;
        }
        [Route("getDistrictByPronviceId/{id}")]
        [HttpGet]
        public ResponseResult GetDistrictByPronviceId(int id)
        {
            List<District> districts = districtRepository.GetDistrictByProvinceId(id);
            if (districts == null)
            {
                return new ResponseResult(404, "not found", null);
            }
            return new ResponseResult(200, "success", districts);
        } 
    }
}
