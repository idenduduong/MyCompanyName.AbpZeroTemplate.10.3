using System;
using System.Threading.Tasks;
using Abp.AspNetCore.Mvc.Authorization;
using Microsoft.AspNetCore.Mvc;
using MyCompanyName.AbpZeroTemplate.Web.Areas.qlnv.Models.Phones;
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
using Newtonsoft.Json;

using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Caching.Memory;

//using DevExtreme.NETCore.Demos.Models;
//using DevExtreme.NETCore.Demos.Models.DataGrid;
using DevExtreme.NETCore.Demos.Models.SampleData;

namespace MyCompanyName.AbpZeroTemplate.Web.Areas.qlnv.Controllers
{
    [Area("qlnv")]
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

        [HttpGet]
        [WrapResult(false, false)]
        public object LoadPeople(GetPeopleInput input, DataSourceLoadOptions loadOptions)
        {
            var output = _personAppService.GetPeople(input);
            return DataSourceLoader.Load(output.Items, loadOptions);
        }

        [HttpPost]
        [WrapResult(false, false)]
        public async Task<IActionResult> CreatePerson(string values)
        {
            var input = new CreatePersonInput();
            JsonConvert.PopulateObject(values, input);

            if (!TryValidateModel(input))
                return NotFound();//BadRequest(ModelState.GetFullErrorMessage());

            await _personAppService.CreatePerson(input);
            return Ok();
        }

        [HttpDelete]
        [WrapResult(false, false)]
        public async Task DeletePerson(int key)
        {
            await _personAppService.DeletePerson(new EntityDto(key));
        }

        [HttpPut]
        [WrapResult(false, false)]
        public async Task UpdatePerson(int key, string values)
        {
            var editPersonInput = new EditPersonInput { Id = key };
            JsonConvert.PopulateObject(values, editPersonInput);

            await _personAppService.EditPerson(editPersonInput);
        }
    }
}