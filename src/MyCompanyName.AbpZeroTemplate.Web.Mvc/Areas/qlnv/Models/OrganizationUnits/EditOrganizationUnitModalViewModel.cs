﻿using Abp.AutoMapper;
using Abp.Organizations;

namespace MyCompanyName.AbpZeroTemplate.Web.Areas.qlnv.Models.OrganizationUnits
{
    [AutoMapFrom(typeof(OrganizationUnit))]
    public class EditOrganizationUnitModalViewModel
    {
        public long? Id { get; set; }

        public string DisplayName { get; set; }
    }
}