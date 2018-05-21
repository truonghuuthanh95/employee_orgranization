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
    [RoutePrefix("api/ward")]
    public class WardsController : ApiController
    {
        IWardRepository wardRepository;

        public WardsController(IWardRepository wardRepository)
        {
            this.wardRepository = wardRepository;
        }

        [Route("getWardByDistrictId/{id}")]
        [HttpGet]
        public ResponseResult GetWardByDistrictId(int id)
        {
            List<Ward> wards = wardRepository.GetWardByDistrictId(id);
            if (wards == null)
            {
                return new ResponseResult(404, "not found", null);
            }
            return new ResponseResult(200, "success", wards);
        }
    }
}
