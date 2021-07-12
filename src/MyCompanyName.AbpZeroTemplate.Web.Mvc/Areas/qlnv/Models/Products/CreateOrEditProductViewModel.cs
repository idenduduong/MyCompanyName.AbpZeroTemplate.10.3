using MyCompanyName.AbpZeroTemplate.Products.Dtos;

using Abp.Extensions;

namespace MyCompanyName.AbpZeroTemplate.Web.Areas.qlnv.Models.Products
{
    public class CreateOrEditProductModalViewModel
    {
        public CreateOrEditProductDto Product { get; set; }

        public string UserName { get; set; }

        public bool IsEditMode => Product.Id.HasValue;
    }
}