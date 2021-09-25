using System;
using System.Collections.Generic;
using System.Text;

namespace MyCompanyName.AbpZeroTemplate.BDHN.Dtos
{
    public class CommuneDistrictLookupTableDto
    {
        public string Code { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public string ProvinceCode { get; set; }

        public Guid Id { get; set; }
    }
}
