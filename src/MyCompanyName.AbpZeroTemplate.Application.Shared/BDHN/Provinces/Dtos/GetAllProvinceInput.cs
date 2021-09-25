using Abp.Application.Services.Dto;
using System;
using System.Collections.Generic;
using System.Text;

namespace MyCompanyName.AbpZeroTemplate.BDHN.Dtos
{
    public class GetAllProvinceInput : PagedAndSortedResultRequestDto
    {
        public string Filter { get; set; }

        public string ProvinceCode { get; set; }

        public string ProvinceName { get; set; }

        public string Description { get; set; }

        public string RegionCode { get; set; }

        public string OrganizationUnitDisplayNameFilter { get; set; }
    }
}
