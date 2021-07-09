using Abp.Application.Services.Dto;
using System;

namespace MyCompanyName.AbpZeroTemplate.BaseNamespace.Dtos
{
    public class GetAllBaseEntitiesForExcelInput
    {
        public string Filter { get; set; }

        public string BaseProp1Filter { get; set; }

        public string OrganizationUnitDisplayNameFilter { get; set; }

    }
}