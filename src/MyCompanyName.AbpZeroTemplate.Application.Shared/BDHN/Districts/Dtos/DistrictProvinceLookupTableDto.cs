﻿using System;
using System.Collections.Generic;
using System.Text;

namespace MyCompanyName.AbpZeroTemplate.BDHN.Dtos
{
    public class DistrictProvinceLookupTableDto
    {
        public string Code { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public string RegionCode { get; set; }

        public Guid Id { get; set; }
    }
}