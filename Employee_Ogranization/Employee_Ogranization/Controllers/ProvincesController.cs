using Employee_Ogranization.Models.DAO;
using Employee_Ogranization.Models.DTO;
using Employee_Ogranization.Repositories.Implements;
using Employee_Ogranization.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Employee_Ogranization.Controllers
{
    [RoutePrefix("api/province")]
    public class ProvincesController : ApiController
        
    {
        IProvinceRepository provinceRepository;

        public ProvincesController(IProvinceRepository provinceRepository)
        {
            this.provinceRepository = provinceRepository;
        }

        [Route("getProvinceByContryId/{id}")]
        [HttpGet]
        public ResponseResult GetProvinceByContryId(int id)
        {
            List<Province> provinces = provinceRepository.GetProvinceByCountryId(id);
            if (provinces == null)
            {
                return new ResponseResult(404, "not found", null);
            }
            return new ResponseResult(200, "success", provinces);
        }
    }
}
