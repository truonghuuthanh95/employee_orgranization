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
    [RoutePrefix("api/trainningCatergory")]
    public class TrainningCategoriesController : ApiController
    {
        ITrainningCategoryRepository trainningCategoryRepository;

        public TrainningCategoriesController(ITrainningCategoryRepository trainningCategoryRepository)
        {
            this.trainningCategoryRepository = trainningCategoryRepository;
        }

        [Route("getAllTrainningCatergory")]
        [HttpGet]
        public ResponseResult GetAllTrainningCatergory()
        {
            List<TrainningCategory> trainningCategories = trainningCategoryRepository.GetTrainningCategories();
            if (trainningCategories == null)
            {
                return new ResponseResult(404, "not found", null);
            }
            return new ResponseResult(200, "success", trainningCategories);
        }

    }
}
