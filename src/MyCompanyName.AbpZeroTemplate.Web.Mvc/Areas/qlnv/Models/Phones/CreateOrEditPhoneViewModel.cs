﻿using MyCompanyName.AbpZeroTemplate.Phones.Dtos;

using Abp.Extensions;

namespace MyCompanyName.AbpZeroTemplate.Web.Areas.qlnv.Models.Phones
{
    public class CreateOrEditPhoneModalViewModel
    {
        public CreateOrEditPhoneDto Phone { get; set; }

        public bool IsEditMode => Phone.Id.HasValue;
    }
}