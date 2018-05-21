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
using Employee_Ogranization.Repositories.Implements;
using Employee_Ogranization.Repositories.Interfaces;

namespace Employee_Ogranization.Controllers
{
    [RoutePrefix("api/subject")]
    public class SubjectsController : ApiController
    {
        ISubjectRepository subjectRepository;

        public SubjectsController(ISubjectRepository subjectRepository)
        {
            this.subjectRepository = subjectRepository;
        }
        [Route("getAllSubject")]
        [HttpGet]
        public ResponseResult GetAllSubject()
        {
            List<Subject> subjects = subjectRepository.GetSubjects();
            if (subjects == null)
            {
                return new ResponseResult(404, "not found", null);
            }
            return new ResponseResult(200, "success", subjects);
        }
    }
}