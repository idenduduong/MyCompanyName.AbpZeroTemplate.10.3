using Abp.Application.Services.Dto;
using System;
using System.Collections.Generic;
using System.Text;

namespace MyCompanyName.AbpZeroTemplate.BDHN.Dtos
{
    public class GetAllCommuneInput : PagedAndSortedResultRequestDto
    {
        public string Filter { get; set; }

        public string CommuneCode { get; set; }

        public string CommuneName { get; set; }

        public string DistrictCode { get; set; }

        public string ProvinceCode { get; set; }

        public string OrganizationUnitDisplayNameFilter { get; set; }
    }
}
