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
    public class ToolsTransferHistoryController : AbpZeroTemplateControllerBase
    {
        private readonly IToolsTransferHistory _tooltransferHistoryAppService;

        public ToolsTransferHistoryController(IToolsTransferHistory toolsTransferAppService)
        {
            _tooltransferHistoryAppService = toolsTransferAppService;
        }

        public IActionResult Index()
        {
            return View();
        }
    }
}
