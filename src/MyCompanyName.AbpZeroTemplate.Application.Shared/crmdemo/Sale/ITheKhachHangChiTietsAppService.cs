// crmdemo.Sale.ITheKhachHangChiTietsAppService
using System;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Dependency;
using MyCompanyName.AbpZeroTemplate.crmdemo.Categories.Dtos;
using MyCompanyName.AbpZeroTemplate.crmdemo.Common.Dtos;
using MyCompanyName.AbpZeroTemplate.crmdemo.Dto;
using MyCompanyName.AbpZeroTemplate.crmdemo.Sale.Dtos;
using MyCompanyName.AbpZeroTemplate.Dto;

namespace MyCompanyName.AbpZeroTemplate.crmdemo.Sale
{
	public interface ITheKhachHangChiTietsAppService : IApplicationService, ITransientDependency
	{
		Task<PagedResultDto<GetTheKhachHangChiTietForView>> GetAll(GetAllTheKhachHangChiTietsInput input);

		Task<GetTheKhachHangChiTietForEditOutput> GetTheKhachHangChiTietForEdit(EntityDto<Guid> input);

		Task CreateOrEdit(CreateOrEditTheKhachHangChiTietDto input);

		Task Delete(EntityDto<Guid> input);

		Task<FileDto> GetTheKhachHangChiTietsToExcel(GetAllTheKhachHangChiTietsForExcelInput input);

		Task<PagedResultDto<TheKhachHangLookupTableDto>> GetAllTheKhachHangForLookupTable(GetAllForLookupTableInput input);

		Task<PagedResultDto<DM_HangHoaLookupTableDto>> GetAllDM_HangHoaForLookupTable(GetAllForLookupTableInput input);

		Task<GetTheKhachHangChiTietForEditOutput> GetTheKhachHangChiTietByTheKhachHangId(EntityDto<Guid> input);
	}

}
