using System;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using MyCompanyName.AbpZeroTemplate.Phones.Dtos;
using MyCompanyName.AbpZeroTemplate.Dto;

namespace MyCompanyName.AbpZeroTemplate.Phones
{
    public interface IPhonesAppService : IApplicationService
    {
        Task<PagedResultDto<GetPhoneForViewDto>> GetAll(GetAllPhonesInput input);

        Task<GetPhoneForViewDto> GetPhoneForView(int id);

        Task<GetPhoneForEditOutput> GetPhoneForEdit(EntityDto input);

        Task CreateOrEdit(CreateOrEditPhoneDto input);

        Task Delete(EntityDto input);

        Task<FileDto> GetPhonesToExcel(GetAllPhonesForExcelInput input);

    }
}