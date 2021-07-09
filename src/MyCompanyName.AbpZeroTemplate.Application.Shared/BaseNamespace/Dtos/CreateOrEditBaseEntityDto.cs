using System;
using Abp.Application.Services.Dto;
using System.ComponentModel.DataAnnotations;

namespace MyCompanyName.AbpZeroTemplate.BaseNamespace.Dtos
{
    public class CreateOrEditBaseEntityDto : EntityDto<int?>
    {

        public string BaseProp1 { get; set; }

        public long? OrganizationUnitId { get; set; }

    }
}