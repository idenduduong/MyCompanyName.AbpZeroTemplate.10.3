using Abp.Application.Services.Dto;
using System;
using System.ComponentModel.DataAnnotations;

namespace MyCompanyName.AbpZeroTemplate.Persons.Dtos
{
    public class EditPersonInput : EntityDto
    {
        public string Name { get; set; }

        public string Surname { get; set; }

        public string EmailAddress { get; set; }
    }
}