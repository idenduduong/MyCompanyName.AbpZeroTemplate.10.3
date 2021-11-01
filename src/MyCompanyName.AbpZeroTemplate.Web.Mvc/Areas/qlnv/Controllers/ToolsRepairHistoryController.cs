using Abp.Application.Services.Dto;
using Abp.AspNetCore.Mvc.Authorization;
using Microsoft.AspNetCore.Mvc;
using MyCompanyName.AbpZeroTemplate.Authorization;
using MyCompanyName.AbpZeroTemplate.BDHN;
using MyCompanyName.AbpZeroTemplate.BDHN.Dtos;
using MyCompanyName.AbpZeroTemplate.Web.Areas.qlnv.Models;

using MyCompanyName.AbpZeroTemplate.Web.Controllers;

using System;
using System.Linq;
using System.Threading.Tasks;

namespace MyCompanyName.AbpZeroTemplate.Web.Areas.qlnv.Controllers
{
    [Area("qlnv")]
    public class ToolsRepairHistoryController : AbpZeroTemplateControllerBase
    {
        private readonly IToolsRepairHistory _toolRepairAppService;

        public ToolsRepairHistoryController(IToolsRepairHistory toolRepairAppService)
        {
            _toolRepairAppService = toolRepairAppService;
        }

        public IActionResult Index()
        {
            return View();
        }
    }
}