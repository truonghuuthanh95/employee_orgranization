using Employee_Ogranization.App_Start;
using Employee_Ogranization.Repositories.Implements;
using Employee_Ogranization.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using System.Web.Http.Cors;
using Unity;
using Unity.Lifetime;

namespace Employee_Ogranization
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            //Dependence Injection
            var container = new UnityContainer();
            container.RegisterType<IRegistrationPriceRepository, RegistrationPriceRepository>(new HierarchicalLifetimeManager());
            container.RegisterType<IRegistrationInterviewRepository, RegistrationInterviewRepository>(new HierarchicalLifetimeManager());
            container.RegisterType<IManagementUnitRepository, ManagementUnitRepository>(new HierarchicalLifetimeManager());
            container.RegisterType<IDistrictRepository, DistrictRepository>(new HierarchicalLifetimeManager());
            container.RegisterType<IProvinceRepository, ProvinceRepository>(new HierarchicalLifetimeManager());
            container.RegisterType<IWardRepository, WardRepository>(new HierarchicalLifetimeManager());
            container.RegisterType<ISubjectRepository, SubjectRepository>(new HierarchicalLifetimeManager());
            container.RegisterType<IDegreeClassificationRepository, DegreeClassificationRepository>(new HierarchicalLifetimeManager());
            container.RegisterType<ISpecializedTrainingRepository, SpecializedTrainingRepository>(new HierarchicalLifetimeManager());
            container.RegisterType<ITrainningCategoryRepository, TrainningCategoryRepository>(new HierarchicalLifetimeManager());
            container.RegisterType<IForeignLanguageRepository, ForeignLanguageRepository>(new HierarchicalLifetimeManager());
            container.RegisterType<IInformationTechnologyDegree, InformationTechnologyDegreeRepository>(new HierarchicalLifetimeManager());
            container.RegisterType<IHighestLevelEducationRepository, HighestLevelEducationRepository>(new HierarchicalLifetimeManager());
            container.RegisterType<IGraduationClassficationRepository, GraduationClassficationRepository>(new HierarchicalLifetimeManager());
            container.RegisterType<IStatusWorikingInEducationRepository, StatusWorikingInEducationRepository>(new HierarchicalLifetimeManager());
            container.RegisterType<ISchoolDegreeRepository, SchoolDegreeRepository>(new HierarchicalLifetimeManager());
            config.DependencyResolver = new UnityResolver(container);           
          
            
            // Web API configuration and services
            //var cors = new EnableCorsAttribute("http://localhost:3000", "*", "*");
            // Web API configuration and services
            //config.EnableCors(cors);
            //config.UseCros
            // Web API routes
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
        }
    }
}
