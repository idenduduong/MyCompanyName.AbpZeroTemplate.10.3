﻿using Abp.Application.Services.Dto;

namespace MyCompanyName.AbpZeroTemplate.ChildNamespace1.Dtos
{
    public class GetAllForLookupTableInput : PagedAndSortedResultRequestDto
    {
        public string Filter { get; set; }
    }
}