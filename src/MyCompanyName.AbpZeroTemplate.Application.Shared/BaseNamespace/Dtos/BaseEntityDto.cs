using System;
using Abp.Application.Services.Dto;

namespace MyCompanyName.AbpZeroTemplate.BaseNamespace.Dtos
{
    public class BaseEntityDto : EntityDto
    {
        public string BaseProp1 { get; set; }

        public long? OrganizationUnitId { get; set; }

    }
}