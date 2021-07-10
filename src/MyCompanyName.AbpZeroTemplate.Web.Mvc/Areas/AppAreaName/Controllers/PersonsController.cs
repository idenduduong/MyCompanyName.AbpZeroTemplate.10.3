using System;
using System.Threading.Tasks;
using Abp.AspNetCore.Mvc.Authorization;
using Microsoft.AspNetCore.Mvc;
using MyCompanyName.AbpZeroTemplate.Web.Areas.AppAreaName.Models.Phones;
using MyCompanyName.AbpZeroTemplate.Web.Controllers;
using MyCompanyName.AbpZeroTemplate.Authorization;
using MyCompanyName.AbpZeroTemplate.Phones;
using MyCompanyName.AbpZeroTemplate.Phones.Dtos;
using Abp.Application.Services.Dto;
using Abp.Extensions;
using Abp.Web.Models;
using MyCompanyName.AbpZeroTemplate.Persons;
using MyCompanyName.AbpZeroTemplate.Persons.Dtos;
using DevExtreme.AspNet.Data;
using DevExtreme.AspNet.Mvc;

namespace MyCompanyName.AbpZeroTemplate.Web.Areas.AppAreaName.Controllers
{
    [Area("AppAreaName")]
    [AbpMvcAuthorize(AppPermissions.Pages_Phones)]
    public class PersonsController : AbpZeroTemplateControllerBase
    {
        private readonly IPersonsAppService _personAppService;

        public PersonsController(IPersonsAppService personAppService)
        {
            _personAppService = personAppService;
        }

        public ActionResult Index()
        {
            return View();
        }

        [WrapResult(false, false)]
        public object LoadPeople(GetPeopleInput input, DataSourceLoadOptions loadOptions)
        {
            var output = _personAppService.GetPeople(input);
            return DataSourceLoader.Load(output.Items, loadOptions);
        }
    }
}