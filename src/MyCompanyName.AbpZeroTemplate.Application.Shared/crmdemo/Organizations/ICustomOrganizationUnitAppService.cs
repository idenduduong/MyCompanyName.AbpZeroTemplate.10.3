﻿// crmdemo.Organizations.IOrganizationUnitAppService
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Dependency;
using MyCompanyName.AbpZeroTemplate.crmdemo.Organizations.Dto;
using MyCompanyName.AbpZeroTemplate.Organizations.Dto;

namespace MyCompanyName.AbpZeroTemplate.crmdemo.Organizations
{
	public interface ICustomOrganizationUnitAppService : IApplicationService, ITransientDependency
	{
		Task<ListResultDto<CustomOrganizationUnitDto>> GetOrganizationUnits();

		Task<PagedResultDto<OrganizationUnitUserListDto>> GetOrganizationUnitUsers(GetOrganizationUnitUsersInput input);

		Task<CustomOrganizationUnitDto> CreateOrganizationUnit(CreateOrganizationUnitInput input);

		Task<CustomOrganizationUnitDto> UpdateOrganizationUnit(UpdateOrganizationUnitInput input);

		Task<CustomOrganizationUnitDto> MoveOrganizationUnit(MoveOrganizationUnitInput input);

		Task DeleteOrganizationUnit(EntityDto<long> input);

		Task RemoveUserFromOrganizationUnit(UserToOrganizationUnitInput input);

		Task AddUsersToOrganizationUnit(UsersToOrganizationUnitInput input);

		Task<PagedResultDto<NameValueDto>> FindUsers(FindOrganizationUnitUsersInput input);
	}

}