﻿using Abp.AutoMapper;
using MyCompanyName.AbpZeroTemplate.Localization.Dto;

namespace MyCompanyName.AbpZeroTemplate.Web.Areas.qlnv.Models.Languages
{
    [AutoMapFrom(typeof(GetLanguageForEditOutput))]
    public class CreateOrEditLanguageModalViewModel : GetLanguageForEditOutput
    {
        public bool IsEditMode => Language.Id.HasValue;
    }
}