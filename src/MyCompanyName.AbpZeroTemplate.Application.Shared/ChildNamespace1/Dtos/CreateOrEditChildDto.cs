using System;
using Abp.Application.Services.Dto;
using System.ComponentModel.DataAnnotations;

namespace MyCompanyName.AbpZeroTemplate.ChildNamespace1.Dtos
{
    public class CreateOrEditChildDto : EntityDto<int?>
    {

        public string ChildProp1 { get; set; }

        public int? BaseEntityId { get; set; }

        public long? UserId { get; set; }

    }
}