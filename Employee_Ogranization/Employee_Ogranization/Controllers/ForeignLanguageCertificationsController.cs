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
    [RoutePrefix("api/foreignLanguageCertification")]
    public class ForeignLanguageCertificationsController : ApiController
    {
        IForeignLanguageRepository foreignLanguageRepository;

        public ForeignLanguageCertificationsController(IForeignLanguageRepository foreignLanguageRepository)
        {
            this.foreignLanguageRepository = foreignLanguageRepository;
        }

        [Route("getAllForeignLanguageCertification")]
        [HttpGet]
        public ResponseResult GetAllForeignLanguageCertification()
        {
            List<ForeignLanguageCertification> foreignLanguageCertifications = foreignLanguageRepository.GetAllForeignLanguageCertification();
            if (foreignLanguageCertifications == null)
            {
                return new ResponseResult(404, "not found", null);
            }
            return new ResponseResult(200, "success", foreignLanguageCertifications);
        }

    }
}
