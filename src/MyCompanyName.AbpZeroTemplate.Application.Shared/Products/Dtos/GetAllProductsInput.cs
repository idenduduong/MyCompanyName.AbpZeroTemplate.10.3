using Abp.Application.Services.Dto;
using System;

namespace MyCompanyName.AbpZeroTemplate.Products.Dtos
{
    public class GetAllProductsInput : PagedAndSortedResultRequestDto
    {
        public string Filter { get; set; }

        public string NameFilter { get; set; }

        public int? TypeFilter { get; set; }

        public string UserNameFilter { get; set; }

    }
}