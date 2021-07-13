using Abp.Application.Services.Dto;
using System;
using System.ComponentModel.DataAnnotations;

namespace MyCompanyName.AbpZeroTemplate.Persons.Dtos
{
    public class CreatePersonInput
    {
        [Required]
        [MaxLength(PersonConsts.MaxNameLength)]
        public string Name { get; set; }

        [Required]
        [MaxLength(PersonConsts.MaxSurnameLength)]
        public string Surname { get; set; }

        [EmailAddress]
        [MaxLength(PersonConsts.MaxEmailAddressLength)]
        public string EmailAddress { get; set; }
    }
}