using System;
using Abp.Application.Services.Dto;
using System.ComponentModel.DataAnnotations;

namespace MyCompanyName.AbpZeroTemplate.ChildNamespace1.Dtos
{
    public class GetChildForEditOutput
    {
        public CreateOrEditChildDto Child { get; set; }

        public string BaseEntityBaseProp1 { get; set; }

        public string UserName { get; set; }

    }
}