using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using System.Web.Http.Description;
using Employee_Ogranization.Models.DAO;
using Employee_Ogranization.Models.DTO;
using Employee_Ogranization.Repositories.Interfaces;
using Employee_Ogranization.Service;
using iTextSharp.text;
using iTextSharp.text.pdf;

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
        public ResponseResult IsValidToRegistrationInterview(string identifyCard)
        {
            List<RegistrationInterview> registrationInterviews = registrationInterviewRepository.GetRegistrationInterviewByIdentidfyCard(identifyCard);
            if (registrationInterviews.Any())
            {
                foreach (RegistrationInterview item in registrationInterviews)
                {
                    int year = item.CreatedAt.Value.Year;                   
                    if (item.IsPass == true)
                    {
                        return new ResponseResult(403, "Ứng viên này đã đậu ở kì thi tuyển năm " + item.CreatedAt.Value.Year + ", và đã được phân đơn vị công tác", null);
                    }
                    else if (year == DateTime.Now.Year)
                    {

                        return new ResponseResult(403, "Ứng viên này đã đăng kí trước đó. Mã đăng kí là " + item.Id.ToString(), null);
                    }
                }
            }
            
                return new ResponseResult(200, "valid", null);

        }


        [Route("isValidToUpdateRegistrationInterview/{id}/{identifyCard}")]
        [HttpGet]
        public ResponseResult IsValidToUpdateRegistrationInterview(int id, string identifyCard)
        {
            RegistrationInterview registrationInterview = registrationInterviewRepository.GetRegistrationInterviewByIdAndIdentifyCard(id, identifyCard);

            if (registrationInterview == null)
            {
                return new ResponseResult(403, "Không tìm thấy ứng viên. Vui lòng kiểm tra lại số CMND hoặc mã hồ sơ", null);
            }
            else if (registrationInterview.CreatedAt.Value.Year != DateTime.Now.Year)
            {
                return new ResponseResult(403, "Hết hạn để sửa thông tin ứng tuyển", null);
            }
            return new ResponseResult(200, "success", registrationInterview);
        }
        
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
        [Route("update")]
        [HttpPost]
        public ResponseResult UpdateRegistrationInterview(RegistrationInterviewDTO registrationInterviewDTO)
        {
            if (!ModelState.IsValid)
            {
                return new ResponseResult(403, ModelState.Values.SelectMany(s => s.Errors).Select(s => s.ErrorMessage).ToString(), null);
            }
            RegistrationInterview registrationInterview = registrationInterviewRepository.UpdateRegistrationInterview(registrationInterviewDTO);
            if (registrationInterview == null)
            {
                return new ResponseResult(403, "Something went wrong when update", null);
            }
            return new ResponseResult(200, "success", registrationInterview);

        }
        [Route("exportPDFRegistrationInterview/{id}")]
        [HttpGet]
        public HttpResponseMessage ExportPDFRegistrationInterview(int id)
        {
            string fileName = string.Concat(id+".pdf");
            Document doc = new Document(PageSize.A4);
            var output = new FileStream(HttpContext.Current.Server.MapPath("~/Service/PDF/" + fileName), FileMode.Create);
            var writer = PdfWriter.GetInstance(doc, output);
            writer.Close();
            //doc.Close();
            ExportPDF.GenerateCandidatePDF(id);
            string filePath = HttpContext.Current.Server.MapPath("~/Service/PDF/" + fileName);
            HttpResponseMessage result = null;
            result = Request.CreateResponse(HttpStatusCode.OK);
            result.Content = new StreamContent(new FileStream(filePath, FileMode.Open));
            result.Content.Headers.ContentDisposition = new ContentDispositionHeaderValue("attachment");
            result.Content.Headers.ContentDisposition.FileName = fileName;

            return result;
        }
    }
}