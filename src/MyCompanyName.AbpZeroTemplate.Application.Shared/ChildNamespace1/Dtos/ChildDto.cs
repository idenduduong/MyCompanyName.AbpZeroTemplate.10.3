using System;
using Abp.Application.Services.Dto;

namespace MyCompanyName.AbpZeroTemplate.ChildNamespace1.Dtos
{
    public class ChildDto : EntityDto
    {
        public string ChildProp1 { get; set; }

        public int? BaseEntityId { get; set; }

        public long? UserId { get; set; }

    }
}