using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using MyCompanyName.AbpZeroTemplate.crmdemo.Organizations.Dto;
using MyCompanyName.AbpZeroTemplate.Organizations.Dto;

namespace MyCompanyName.AbpZeroTemplate.Organizations
{
    public interface ICustomOrganizationUnitAppService : IApplicationService
	{
		Task<ListResultDto<CustomOrganizationUnitDto>> GetOrganizationUnits();

		Task<PagedResultDto<OrganizationUnitUserListDto>> GetOrganizationUnitUsers(GetOrganizationUnitUsersInput input);

		Task<CustomOrganizationUnitDto> CreateOrganizationUnit(CreateOrganizationUnitInput input);

		Task<CustomOrganizationUnitDto> UpdateOrganizationUnit(UpdateOrganizationUnitInput input);

		Task<CustomOrganizationUnitDto> MoveOrganizationUnit(MoveOrganizationUnitInput input);

		Task DeleteOrganizationUnit(EntityDto<long> input);

		Task RemoveUserFromOrganizationUnit(UserToOrganizationUnitInput input);

		Task RemoveRoleFromOrganizationUnit(RoleToOrganizationUnitInput input);

		Task AddUsersToOrganizationUnit(UsersToOrganizationUnitInput input);

		Task AddRolesToOrganizationUnit(RolesToOrganizationUnitInput input);

		Task<PagedResultDto<NameValueDto>> FindUsers(FindOrganizationUnitUsersInput input);

		Task<PagedResultDto<NameValueDto>> FindRoles(FindOrganizationUnitRolesInput input);
	}
}
