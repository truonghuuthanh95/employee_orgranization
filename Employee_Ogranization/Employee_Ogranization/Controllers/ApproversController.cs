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
    [RoutePrefix("api/approver")]
    public class ApproversController : ApiController
    {
        IRegistrationInterviewRepository registrationInterviewRepository;

        public ApproversController(IRegistrationInterviewRepository registrationInterviewRepository)
        {
            this.registrationInterviewRepository = registrationInterviewRepository;
        }

        [Route("isValidToApprovedRegistrationInterview/{id}")]
        [HttpGet]
        public ResponseResult IsValidToUpdateRegistrationInterview(int id)
        {
            RegistrationInterview registrationInterview = registrationInterviewRepository.GetRegistrationInterviewById(id);

            if (registrationInterview == null)
            {
                return new ResponseResult(403, "Không tìm thấy ứng viên. Vui lòng kiểm tra lại mã hồ sơ", null);
            }
            else if (registrationInterview.CreatedAt.Value.Year != DateTime.Now.Year)
            {
                return new ResponseResult(403, "Hết hạn để sửa thông tin ứng tuyển", null);
            }
            return new ResponseResult(200, "success", registrationInterview);
        }
    }
}
