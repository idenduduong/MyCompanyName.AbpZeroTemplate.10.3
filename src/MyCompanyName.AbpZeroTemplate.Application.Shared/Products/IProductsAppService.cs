using System;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using MyCompanyName.AbpZeroTemplate.Products.Dtos;
using MyCompanyName.AbpZeroTemplate.Dto;

namespace MyCompanyName.AbpZeroTemplate.Products
{
    public interface IProductsAppService : IApplicationService
    {
        Task<PagedResultDto<GetProductForViewDto>> GetAll(GetAllProductsInput input);

        Task<GetProductForViewDto> GetProductForView(int id);

        Task<GetProductForEditOutput> GetProductForEdit(EntityDto input);

        Task CreateOrEdit(CreateOrEditProductDto input);

        Task Delete(EntityDto input);

        Task<FileDto> GetProductsToExcel(GetAllProductsForExcelInput input);

        Task<PagedResultDto<ProductUserLookupTableDto>> GetAllUserForLookupTable(GetAllForLookupTableInput input);

    }
}