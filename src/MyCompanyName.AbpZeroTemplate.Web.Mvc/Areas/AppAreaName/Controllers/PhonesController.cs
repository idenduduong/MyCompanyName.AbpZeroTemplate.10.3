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

namespace MyCompanyName.AbpZeroTemplate.Web.Areas.AppAreaName.Controllers
{
    [Area("AppAreaName")]
    [AbpMvcAuthorize(AppPermissions.Pages_Phones)]
    public class PhonesController : AbpZeroTemplateControllerBase
    {
        private readonly IPhonesAppService _phonesAppService;

        public PhonesController(IPhonesAppService phonesAppService)
        {
            _phonesAppService = phonesAppService;
        }

        public ActionResult Index()
        {
            var model = new PhonesViewModel
            {
                FilterText = ""
            };

            return View(model);
        }

        [AbpMvcAuthorize(AppPermissions.Pages_Phones_Create, AppPermissions.Pages_Phones_Edit)]
        public async Task<PartialViewResult> CreateOrEditModal(int? id)
        {
            GetPhoneForEditOutput getPhoneForEditOutput;

            if (id.HasValue)
            {
                getPhoneForEditOutput = await _phonesAppService.GetPhoneForEdit(new EntityDto { Id = (int)id });
            }
            else
            {
                getPhoneForEditOutput = new GetPhoneForEditOutput
                {
                    Phone = new CreateOrEditPhoneDto()
                };
            }

            var viewModel = new CreateOrEditPhoneModalViewModel()
            {
                Phone = getPhoneForEditOutput.Phone,
            };

            return PartialView("_CreateOrEditModal", viewModel);
        }

        public async Task<PartialViewResult> ViewPhoneModal(int id)
        {
            var getPhoneForViewDto = await _phonesAppService.GetPhoneForView(id);

            var model = new PhoneViewModel()
            {
                Phone = getPhoneForViewDto.Phone
            };

            return PartialView("_ViewPhoneModal", model);
        }

    }
}