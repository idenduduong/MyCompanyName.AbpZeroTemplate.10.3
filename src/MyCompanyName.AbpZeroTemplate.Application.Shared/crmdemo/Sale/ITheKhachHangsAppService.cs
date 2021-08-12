// crmdemo.Sale.ITheKhachHangsAppService
using System;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Dependency;
using MyCompanyName.AbpZeroTemplate.crmdemo.Sale.Dtos;
//using crmdemo.Categories.Dtos;
//using crmdemo.Common.Dtos;
//using crmdemo.Dto;
//using crmdemo.Sale.Dtos;

namespace MyCompanyName.AbpZeroTemplate.crmdemo.Sale
{
	public interface ITheKhachHangsAppService : IApplicationService, ITransientDependency
	{
        //Task<PagedResultDto<GetTheKhachHangForView>> GetAll(GetAllTheKhachHangsInput input);

        Task<PagedResultDto<GetTheKhachHangForView>> GetAll();

        //Task<GetTheKhachHangForEditOutput> GetTheKhachHangForEdit(EntityDto<Guid> input);

        //Task<Guid> CreateOrEdit(CreateOrEditTheKhachHangDto input);

        //Task Delete(EntityDto<Guid> input);

        //Task<FileDto> GetTheKhachHangsToExcel(GetAllTheKhachHangsForExcelInput input);

        //Task<PagedResultDto<GetTheKhachHangChiTietForView>> GetAllPackageByCardForRelease(GetAllTheKhachHangChiTietsInput input);

        //Task<PagedResultDto<DM_NhomTheLookupTableDto>> GetAllDM_NhomTheForLookupTable(GetAllForLookupTableInput input);

        //Task<PagedResultDto<DM_TienTeLookupTableDto>> GetAllDM_TienTeForLookupTable(GetAllForLookupTableInput input);

        //Task<PagedResultDto<DM_DacDiemKhachHangLookupTableDto>> GetAllDM_DacDiemKhachHangForLookupTable(GetAllForLookupTableInput input);

        //Task<PagedResultDto<DM_KhuyenMaiDto>> GetAllDM_KhuyenMaiForLookupTable(GetAllForLookupTableInput input);
    }
}
