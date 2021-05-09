using System;
using Abp.Application.Services.Dto;
using System.ComponentModel.DataAnnotations;

namespace MyCompanyName.AbpZeroTemplate.Phones.Dtos
{
    public class GetPhoneForEditOutput
    {
        public CreateOrEditPhoneDto Phone { get; set; }

    }
}