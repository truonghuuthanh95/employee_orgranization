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
using Employee_Ogranization.Models.DTO;
using Employee_Ogranization.Repositories.Interfaces;

namespace Employee_Ogranization.Controllers
{
    [RoutePrefix("api/registrationInterview")]
    public class RegistrationInterviewsController : ApiController
    {
        IRegistrationInterviewRepository registrationInterviewRepository;

        public RegistrationInterviewsController(IRegistrationInterviewRepository registrationInterviewRepository)
        {
            this.registrationInterviewRepository = registrationInterviewRepository;
        }

        [Route("isValidToRegistrationInterview/{identifyCard}")]
        [HttpGet]
        public ResponseCheckValidIdentifyCard IsValidToRegistrationInterview(string identifyCard)
        {
            List<RegistrationInterview> registrationInterviews = registrationInterviewRepository.GetRegistrationInterviewByIdentidfyCard(identifyCard);
            if (registrationInterviews.Any())
            {
                foreach (RegistrationInterview item in registrationInterviews)
                {
                    int year = item.CreatedAt.Value.Year;                   
                    if (item.IsPass == true)
                    {
                        return new ResponseCheckValidIdentifyCard(3, "invalid");
                    }
                    else if (year == DateTime.Now.Year)
                    {

                        return new ResponseCheckValidIdentifyCard(2, item.Id.ToString());
                    }
                }
            }
            
                return new ResponseCheckValidIdentifyCard(1, "valid");

        }
        // GET: api/RegistrationInterviews/5
        //[ResponseType(typeof(RegistrationInterview))]
        //public IHttpActionResult GetRegistrationInterview(int id)
        //{
        //    RegistrationInterview registrationInterview = db.RegistrationInterviews.Find(id);
        //    if (registrationInterview == null)
        //    {
        //        return NotFound();
        //    }

        //    return Ok(registrationInterview);
        //}

        // PUT: api/RegistrationInterviews/5
        //[ResponseType(typeof(void))]
        //public IHttpActionResult PutRegistrationInterview(int id, RegistrationInterview registrationInterview)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }

        //    if (id != registrationInterview.Id)
        //    {
        //        return BadRequest();
        //    }

        //    db.Entry(registrationInterview).State = EntityState.Modified;

        //    try
        //    {
        //        db.SaveChanges();
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //        if (!RegistrationInterviewExists(id))
        //        {
        //            return NotFound();
        //        }
        //        else
        //        {
        //            throw;
        //        }
        //    }

        //    return StatusCode(HttpStatusCode.NoContent);
        //}

        //POST: api/RegistrationInterviews
        [Route("create")]
        [HttpPost]
        public ResponseResult PostRegistrationInterview(RegistrationInterviewRegister registrationInterviewRegister)
        {

            if (!ModelState.IsValid)
            {
                return new ResponseResult(403, ModelState.Values.SelectMany(s => s.Errors).Select(s => s.ErrorMessage).ToString(), null);
            }

            RegistrationInterview registrationInterview  = registrationInterviewRepository.CreateRegistrationInterview(registrationInterviewRegister);

            return new ResponseResult(201, "created", registrationInterview);
            
        }

    }
}