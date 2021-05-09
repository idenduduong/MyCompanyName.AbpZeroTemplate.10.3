using System;
using Abp.Application.Services.Dto;

namespace MyCompanyName.AbpZeroTemplate.Phones.Dtos
{
    public class PhoneDto : EntityDto
    {
        public int PhoneId { get; set; }

        public bool isDelete { get; set; }

        public string Name { get; set; }

        public string Mobile { get; set; }

    }
}