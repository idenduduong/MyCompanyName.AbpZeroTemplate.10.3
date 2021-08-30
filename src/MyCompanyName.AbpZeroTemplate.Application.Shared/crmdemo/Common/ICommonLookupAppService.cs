// crmdemo.Common.ICommonLookupAppService
using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Dependency;
using MyCompanyName.AbpZeroTemplate.Authorization.Users.Dto;
using MyCompanyName.AbpZeroTemplate.Common.Dto;
using MyCompanyName.AbpZeroTemplate.crmdemo.Categories.Dtos;
using MyCompanyName.AbpZeroTemplate.crmdemo.Common.Dto;
using MyCompanyName.AbpZeroTemplate.crmdemo.Common.Dtos;
using MyCompanyName.AbpZeroTemplate.crmdemo.Organizations.Dto;
using MyCompanyName.AbpZeroTemplate.crmdemo.Sale.Dtos;
using MyCompanyName.AbpZeroTemplate.Editions.Dto;
//using crmdemo.Authorization.Users.Dto;
//using crmdemo.Categories.Dtos;
//using crmdemo.Common.Dto;
//using crmdemo.Common.Dtos;
//using crmdemo.Editions.Dto;
//using crmdemo.Organizations.Dto;
//using crmdemo.Sale.Dtos;

namespace MyCompanyName.AbpZeroTemplate.crmdemo.Common
{
	public interface ICommonLookupAppService : IApplicationService, ITransientDependency
	{
		Task<ListResultDto<SubscribableEditionComboboxItemDto>> GetEditionsForCombobox(bool onlyFreeItems = false);

		Task<PagedResultDto<NameValueDto>> FindUsers(FindUsersInput input);

		Task<PagedResultDto<DM_DoiTuongLookupTableDto>> GetAllDM_DoiTuongForLookupTable(GetAllKhachHangForLookupTableInput input);

		GetDefaultEditionNameOutput GetDefaultEditionName();

		Task<PagedResultDto<EmployeeLookupTableDto>> GetAllSalesForLookupTable(GetAllEmployeeForLookupTableInput input);

		Task<PagedResultDto<EmployeeLookupTableDto>> GetAllKTVForLookupTable(GetAllEmployeeForLookupTableInput input);

		Task<CustomOrganizationUnitDto> GetCurrentUserOrganization();

		Task<UserEditDto> GetCurrentUser();

		Task<string> GetCurrentUserOrganizationsString();

		Task<List<CustomOrganizationUnitDto>> GetCurrentUserOrganizations();

		Task<List<CustomOrganizationUnitDto>> GetAvailableOrganizations();

		Task<List<DataSourceDto>> GetAvailableDataSources();

		Task<List<ProcessStatusDto>> GetStatusesInFlow(int statusId);

		Task<PagedResultDto<ImportDataForLookupTableDto>> GetAllImportDataListForLookupTable(GetAllImportDataListForLookupTableInput input);

		Task<PagedResultDto<EmployeeLookupTableDto>> GetAllSalesForLookupTableByOrganization(GetAllEmployeeForLookupTableInput input);
	}

}
