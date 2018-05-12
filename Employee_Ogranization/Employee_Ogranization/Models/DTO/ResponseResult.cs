using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Employee_Ogranization.Models.DTO
{
    public class ResponseResult
    {
        public int Status { get; set; }
        public string Message { get; set; }
        public object Results { get; set; }

        public ResponseResult(int status, string message, object results)
        {
            Status = status;
            Message = message;
            Results = results;
        }
    }


}