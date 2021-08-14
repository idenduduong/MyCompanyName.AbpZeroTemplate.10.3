// crmdemo.Categories.IDM_DoiTuongsAppService
using System;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Dependency;
using MyCompanyName.AbpZeroTemplate.crmdemo.Categories.Dtos;
using MyCompanyName.AbpZeroTemplate.crmdemo.Common.Dtos;
using MyCompanyName.AbpZeroTemplate.crmdemo.Dto;
//using crmdemo.Categories.Dtos;
//using crmdemo.Common.Dtos;
//using crmdemo.Dto;

namespace MyCompanyName.AbpZeroTemplate.crmdemo.Categories
{
	public interface IDM_DoiTuongsAppService : IApplicationService, ITransientDependency
	{
		Task<PagedResultDto<GetDM_DoiTuongForView>> GetAll(GetAllDM_DoiTuongsInput input);
		//Task<PagedResultDto<GetDM_DoiTuongForView>> GetAll();

		Task<GetDM_DoiTuongForEditOutput> GetDM_DoiTuongForEdit(EntityDto<Guid> input);

		Task<DM_DoiTuongDto> CreateOrEdit(CreateOrEditDM_DoiTuongDto input);

		Task Delete(EntityDto<Guid> input);

		Task<FileDto> GetDM_DoiTuongsToExcel(GetAllDM_DoiTuongsForExcelInput input);

		Task<PagedResultDto<DM_NhomDoiTuongLookupTableDto>> GetAllDM_NhomDoiTuongForLookupTable(GetAllForLookupTableInput input);

		Task<PagedResultDto<DM_TinhThanhLookupTableDto>> GetAllDM_TinhThanhForLookupTable(GetAllForLookupTableInput input);

		Task<PagedResultDto<DM_QuanHuyenLookupTableDto>> GetAllDM_QuanHuyenForLookupTable(GetAllQuanHuyenForLookupTableInput input);

		Task<PagedResultDto<UserLookupTableDto>> GetAllUserForLookupTable(GetAllForLookupTableInput input);

		Task<PagedResultDto<NguonKhachHangLookupTableDto>> GetAllNguonKhachHangForLookupTable(GetAllForLookupTableInput input);

		Task<PagedResultDto<DM_QuocGiaLookupTableDto>> GetAllDM_QuocGiaForLookupTable(GetAllForLookupTableInput input);

		Task<PagedResultDto<DM_TrangThaiLookupTableDto>> GetAllDM_TrangThaiForLookupTable(GetAllForLookupTableInput input);

		Task<GetImageOutput> GetDoiTuongImage(Guid doiTuongId);

		Task<string> GetMaKhachHang();
	}
}
