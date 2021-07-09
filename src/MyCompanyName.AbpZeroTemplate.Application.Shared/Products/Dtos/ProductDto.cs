using MyCompanyName.AbpZeroTemplate;

using System;
using Abp.Application.Services.Dto;

namespace MyCompanyName.AbpZeroTemplate.Products.Dtos
{
    public class ProductDto : EntityDto
    {
        public string Name { get; set; }

        public ProductType Type { get; set; }

        public long? UserId { get; set; }

    }
}