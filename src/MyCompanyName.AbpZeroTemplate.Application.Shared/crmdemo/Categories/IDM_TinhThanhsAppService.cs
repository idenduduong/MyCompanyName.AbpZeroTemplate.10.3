using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Dependency;
using MyCompanyName.AbpZeroTemplate.crmdemo.Categories.Dtos;
using MyCompanyName.AbpZeroTemplate.crmdemo.Common.Dtos;
using MyCompanyName.AbpZeroTemplate.Dto;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace MyCompanyName.AbpZeroTemplate.crmdemo.Categories
{
	public interface IDM_TinhThanhsAppService : IApplicationService, ITransientDependency
	{
		//Task<PagedResultDto<GetDM_TinhThanhForView>> GetAll();

		Task<PagedResultDto<GetDM_TinhThanhForView>> GetAll(GetAllDM_TinhThanhsInput input);

		Task<GetDM_TinhThanhForEditOutput> GetDM_TinhThanhForEdit(EntityDto<Guid> input);

		Task CreateOrEdit(CreateOrEditDM_TinhThanhDto input);

		Task Delete(EntityDto<Guid> input);

		Task<FileDto> GetDM_TinhThanhsToExcel(GetAllDM_TinhThanhsForExcelInput input);

		Task<PagedResultDto<DM_QuocGiaLookupTableDto>> GetAllDM_QuocGiaForLookupTable(GetAllForLookupTableInput input);

		Task<PagedResultDto<DM_VungMienLookupTableDto>> GetAllDM_VungMienForLookupTable(GetAllForLookupTableInput input);
	}

}
