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
    [RoutePrefix("api/managementUnit")]
    public class ManagementUnitsController : ApiController
    {
        IManagementUnitRepository managementUnitRepository;

        public ManagementUnitsController(IManagementUnitRepository managementUnitRepository)
        {
            this.managementUnitRepository = managementUnitRepository;
        }

        // GET: ManagementUnits
        [Route("getManagementUnitById/{id}")]
        [HttpGet]
        public ResponseResult GetManagementUnitById(int id)
        {
            ManagementUnit managementUnit = managementUnitRepository.GetManagementById(id);
            if (managementUnit == null)
            {
                return new ResponseResult(404, "not found", null);
            }
            return new ResponseResult(200, "success", managementUnit);
        }
    }
}
