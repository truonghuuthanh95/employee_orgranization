using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Employee_Ogranization.Models.DTO
{
    public class ResponseCheckValidIdentifyCard
    {
        public int Status { get; set; }
        public string Message { get; set; }

        public ResponseCheckValidIdentifyCard(int status, string message)
        {
            Status = status;
            Message = message;
        }
    }
}