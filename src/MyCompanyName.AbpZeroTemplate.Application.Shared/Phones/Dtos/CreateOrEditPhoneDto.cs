using System;
using Abp.Application.Services.Dto;
using System.ComponentModel.DataAnnotations;

namespace MyCompanyName.AbpZeroTemplate.Phones.Dtos
{
    public class CreateOrEditPhoneDto : EntityDto<int?>
    {

        public int PhoneId { get; set; }

        public bool isDelete { get; set; }

        [Required]
        [StringLength(PhoneConsts.MaxNameLength, MinimumLength = PhoneConsts.MinNameLength)]
        public string Name { get; set; }

        [Required]
        [StringLength(PhoneConsts.MaxMobileLength, MinimumLength = PhoneConsts.MinMobileLength)]
        public string Mobile { get; set; }

    }
}