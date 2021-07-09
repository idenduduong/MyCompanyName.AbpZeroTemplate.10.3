using System;
using Abp.Application.Services.Dto;
using System.ComponentModel.DataAnnotations;

namespace MyCompanyName.AbpZeroTemplate.BaseNamespace.Dtos
{
    public class GetBaseEntityForEditOutput
    {
        public CreateOrEditBaseEntityDto BaseEntity { get; set; }

        public string OrganizationUnitDisplayName { get; set; }

    }
}