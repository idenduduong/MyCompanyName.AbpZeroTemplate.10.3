using MyCompanyName.AbpZeroTemplate;

using System;
using Abp.Application.Services.Dto;
using System.ComponentModel.DataAnnotations;

namespace MyCompanyName.AbpZeroTemplate.Products.Dtos
{
    public class CreateOrEditProductDto : EntityDto<int?>
    {

        [Required]
        [StringLength(ProductConsts.MaxNameLength, MinimumLength = ProductConsts.MinNameLength)]
        public string Name { get; set; }

        public ProductType Type { get; set; }

        public long? UserId { get; set; }

    }
}