using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using Employee_Ogranization.Models.DAO;
using Employee_Ogranization.Repositories.Interfaces;

namespace Employee_Ogranization.Controllers
{
    [RoutePrefix("api/price")]
    public class RegistrationPricesController : ApiController
    {
        IRegistrationPriceRepository registrationPriceRepository;

        public RegistrationPricesController(IRegistrationPriceRepository registrationPriceRepository)
        {
            this.registrationPriceRepository = registrationPriceRepository;
        }

        
        // GET: api/RegistrationPrices/5
        [Route("getRegistrationPriceByManagemenentUnitId/{id}")]
        [HttpGet]
        [ResponseType(typeof(RegistrationPrice))]
        public IHttpActionResult GetRegistrationPriceByManagementUnitId(int id)
        {
            RegistrationPrice registrationPrice = registrationPriceRepository.GetRegistrationPriceByManagementUnitId(id);
            if (registrationPrice == null)
            {
                return NotFound();
            }

            return Ok(registrationPrice);
        }
        
    }
}