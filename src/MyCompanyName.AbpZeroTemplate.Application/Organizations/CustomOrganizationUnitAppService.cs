// crmdemo.Organizations.OrganizationUnitAppService
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Dynamic.Core;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Authorization;
using Abp.Authorization.Users;
using Abp.Dependency;
using Abp.Domain.Repositories;
using Abp.Events.Bus;
using Abp.Extensions;
using Abp.Linq.Extensions;
using Abp.Organizations;
using MyCompanyName.AbpZeroTemplate.crmdemo;
using MyCompanyName.AbpZeroTemplate.crmdemo.Authorization.Users;
//using crmdemo.Organizations;
//using crmdemo.Organizations.Dto;
//using crmdemo.Organizations.Event;
//using crmdemo.OrganizationUnits;
using Microsoft.EntityFrameworkCore;
using MyCompanyName.AbpZeroTemplate.crmdemo.OrganizationUnits;
using MyCompanyName.AbpZeroTemplate.crmdemo.Organizations.Dto;
using MyCompanyName.AbpZeroTemplate.Organizations.Dto;
using MyCompanyName.AbpZeroTemplate.Authorization.Users;
using MyCompanyName.AbpZeroTemplate.Authorization.Roles;
using MyCompanyName.AbpZeroTemplate.Authorization;

namespace MyCompanyName.AbpZeroTemplate.Organizations
{
    //public class CustomOrganizationUnitAppService : AbpZeroTemplateAppServiceBase, ICustomOrganizationUnitAppService
	//[AbpAuthorize(new string[] { "Pages.Administration.OrganizationUnits" })]
	public class CustomOrganizationUnitAppService : AbpZeroTemplateAppServiceBase, ICustomOrganizationUnitAppService
	//, IApplicationService, ITransientDependency
	{
		private readonly OrganizationUnitManager _organizationUnitManager;

		private readonly IRepository<CustomOrganizationUnit, long> _customOrganizationUnitRepository;

		private readonly IRepository<OrganizationUnit, long> _organizationUnitRepository;

		private readonly IRepository<UserOrganizationUnit, long> _userOrganizationUnitRepository;

		private readonly IRepository<OrganizationUnitRole, long> _organizationUnitRoleRepository;
		private readonly RoleManager _roleManager;

		public CustomOrganizationUnitAppService(
			OrganizationUnitManager organizationUnitManager, 
			IRepository<CustomOrganizationUnit, long> customOrganizationUnitRepository,
			IRepository<OrganizationUnit, long> organizationUnitRepository,
			IRepository<UserOrganizationUnit, long> userOrganizationUnitRepository,
			IRepository<OrganizationUnitRole, long> organizationUnitRoleRepository,
			RoleManager roleManager
		)
		{
			_organizationUnitManager = organizationUnitManager;
			_customOrganizationUnitRepository = customOrganizationUnitRepository;
			_organizationUnitRepository = organizationUnitRepository;
			_userOrganizationUnitRepository = userOrganizationUnitRepository;
			_organizationUnitRoleRepository = organizationUnitRoleRepository;
			_roleManager = roleManager;
		}

		public async Task<ListResultDto<CustomOrganizationUnitDto>> GetOrganizationUnits()
		{
			var customOrganizationUnits = await _customOrganizationUnitRepository.GetAllListAsync();

			var organizationUnitMemberCounts = await _userOrganizationUnitRepository.GetAll()
				.GroupBy(x => x.OrganizationUnitId)
				.Select(groupedUsers => new
				{
					organizationUnitId = groupedUsers.Key,
					count = groupedUsers.Count()
				}).ToDictionaryAsync(x => x.organizationUnitId, y => y.count);

			var organizationUnitRoleCounts = await _organizationUnitRoleRepository.GetAll()
				.GroupBy(x => x.OrganizationUnitId)
				.Select(groupedRoles => new
				{
					organizationUnitId = groupedRoles.Key,
					count = groupedRoles.Count()
				}).ToDictionaryAsync(x => x.organizationUnitId, y => y.count);

			var listCustomOrganizationUnitDto = new ListResultDto<CustomOrganizationUnitDto>(
				customOrganizationUnits.Select(ou =>
				{
					var customOrganizationUnitDto = ObjectMapper.Map<CustomOrganizationUnitDto>(ou);
					customOrganizationUnitDto.MemberCount = organizationUnitMemberCounts.ContainsKey(ou.Id) ? organizationUnitMemberCounts[ou.Id] : 0;
					customOrganizationUnitDto.RoleCount = organizationUnitRoleCounts.ContainsKey(ou.Id) ? organizationUnitRoleCounts[ou.Id] : 0;
					return customOrganizationUnitDto;
				}).ToList());

			return listCustomOrganizationUnitDto;

			#region crm error
			//try { 
			//    return new ListResultDto<CustomOrganizationUnitDto>((await (from ou in _customOrganizationUnitRepository.GetAll()
			//                                                                join uou in _userOrganizationUnitRepository.GetAll() on ou.Id equals uou.OrganizationUnitId into g
			//                                                                orderby ou.UnitCode
			//                                                                select new
			//                                                                {
			//                                                                    ou = ou,
			//                                                                    memberCount = g.Count()
			//                                                                }).ToListAsync()).Select(item =>
			//                                                                {
			//                                                                    CustomOrganizationUnitDto customOrganizationUnitDto = base.ObjectMapper.Map<CustomOrganizationUnitDto>(item.ou);
			//                                                                    customOrganizationUnitDto.MemberCount = item.memberCount;
			//                                                                    return customOrganizationUnitDto;
			//                                                                }).ToList());

			//}
			//catch (Exception ex)
			//{
			//    return new ListResultDto<CustomOrganizationUnitDto>();
			//}
			#endregion

		}

		public async Task<PagedResultDto<OrganizationUnitUserListDto>> GetOrganizationUnitUsers(GetOrganizationUnitUsersInput input)
		{
			var query = from uou in _userOrganizationUnitRepository.GetAll()
						join ou in _customOrganizationUnitRepository.GetAll() on uou.OrganizationUnitId equals ou.Id
						join user in base.UserManager.Users on uou.UserId equals user.Id
						where uou.OrganizationUnitId == input.Id
						select new { uou, user };
			var listOrganizationUnitUserListDto = new PagedResultDto<OrganizationUnitUserListDto>(await query.CountAsync(), (await query.OrderBy(input.Sorting).PageBy(input).ToListAsync()).Select(item =>
			{
				OrganizationUnitUserListDto organizationUnitUserListDto = base.ObjectMapper.Map<OrganizationUnitUserListDto>(item.user);
				organizationUnitUserListDto.AddedTime = item.uou.CreationTime;
				return organizationUnitUserListDto;
			}).ToList());

			return listOrganizationUnitUserListDto;

			#region crmdemo
			//try
			//{
			//	return new ListResultDto<CustomOrganizationUnitDto>((await (from ou in _customOrganizationUnitRepository.GetAll()
			//																join uou in _userOrganizationUnitRepository.GetAll() on ou.Id equals uou.OrganizationUnitId into g
			//																orderby ou.UnitCode
			//																select new
			//																{
			//																	ou = ou,
			//																	memberCount = g.Count()
			//																}).ToListAsync()).Select(item =>
			//																{
			//																	CustomOrganizationUnitDto customOrganizationUnitDto = base.ObjectMapper.Map<CustomOrganizationUnitDto>(item.ou);
			//																	customOrganizationUnitDto.MemberCount = item.memberCount;
			//																	return customOrganizationUnitDto;
			//																}).ToList());
			//}
			//catch (Exception)
			//{
			//	return new ListResultDto<CustomOrganizationUnitDto>();
			//}
			#endregion

		}

		public async Task<PagedResultDto<OrganizationUnitUserListDto>> GetAllOrganizationUnitByUserId(long Id)
		{
			var query = from ouUser in _userOrganizationUnitRepository.GetAll()
						join ou in _organizationUnitRepository.GetAll() on ouUser.OrganizationUnitId equals ou.Id
						join user in UserManager.Users on ouUser.UserId equals user.Id
						where ouUser.UserId == Id
						select new
						{
							ouUser,
							user
						};

			var totalCount = await query.CountAsync();
			var items = await query.ToListAsync();

			return new PagedResultDto<OrganizationUnitUserListDto>(
				totalCount,
				items.Select(item =>
				{
					var organizationUnitUserDto = ObjectMapper.Map<OrganizationUnitUserListDto>(item.user);
					organizationUnitUserDto.AddedTime = item.ouUser.CreationTime;
					return organizationUnitUserDto;
				}).ToList());
		}

		public async Task<PagedResultDto<OrganizationUnitRoleListDto>> GetOrganizationUnitRoles(GetOrganizationUnitRolesInput input)
		{
			var query = from ouRole in _organizationUnitRoleRepository.GetAll()
						join ou in _organizationUnitRepository.GetAll() on ouRole.OrganizationUnitId equals ou.Id
						join role in _roleManager.Roles on ouRole.RoleId equals role.Id
						where ouRole.OrganizationUnitId == input.Id
						select new
						{
							ouRole,
							role
						};

			var totalCount = await query.CountAsync();
			var items = await query.OrderBy(input.Sorting).PageBy(input).ToListAsync();

			return new PagedResultDto<OrganizationUnitRoleListDto>(
				totalCount,
				items.Select(item =>
				{
					var organizationUnitRoleDto = ObjectMapper.Map<OrganizationUnitRoleListDto>(item.role);
					organizationUnitRoleDto.AddedTime = item.ouRole.CreationTime;
					return organizationUnitRoleDto;
				}).ToList());
		}

		//[AbpAuthorize(AppPermissions.Pages_Administration_OrganizationUnits_ManageOrganizationTree)]
		public async Task<CustomOrganizationUnitDto> CreateOrganizationUnit(CreateOrganizationUnitInput input)
		{
			var organizationUnit = new OrganizationUnit(AbpSession.TenantId, input.DisplayName, input.ParentId);

			await _organizationUnitManager.CreateAsync(organizationUnit);
			await CurrentUnitOfWork.SaveChangesAsync();

			return ObjectMapper.Map<CustomOrganizationUnitDto>(organizationUnit);
		}

		//[AbpAuthorize(AppPermissions.Pages_Administration_OrganizationUnits_ManageOrganizationTree)]
		public async Task<CustomOrganizationUnitDto> UpdateOrganizationUnit(UpdateOrganizationUnitInput input)
		{
			var organizationUnit = await _organizationUnitRepository.GetAsync(input.Id);

			organizationUnit.DisplayName = input.DisplayName;

			await _organizationUnitManager.UpdateAsync(organizationUnit);

			return await CreateOrganizationUnitDto(organizationUnit);
		}


		//[AbpAuthorize(new string[] { "Pages.Administration.OrganizationUnits.ManageOrganizationTree" })]
		public async Task<CustomOrganizationUnitDto> MoveOrganizationUnit(MoveOrganizationUnitInput input)
		{
			await _organizationUnitManager.MoveAsync(input.Id, input.NewParentId);
			return await CreateOrganizationUnitDto(await _customOrganizationUnitRepository.GetAsync(input.Id));
		}

		//[AbpAuthorize(new string[] { "Pages.Administration.OrganizationUnits.ManageOrganizationTree" })]
		public async Task DeleteOrganizationUnit(EntityDto<long> input)
		{
			await _customOrganizationUnitRepository.DeleteAsync(input.Id);
		}

		//[AbpAuthorize(new string[] { "Pages.Administration.OrganizationUnits.ManageMembers" })]
		public async Task RemoveUserFromOrganizationUnit(UserToOrganizationUnitInput input)
		{
			await base.UserManager.RemoveFromOrganizationUnitAsync(input.UserId, input.OrganizationUnitId);
		}

		//[AbpAuthorize(AppPermissions.Pages_Administration_OrganizationUnits_ManageRoles)]
		public async Task RemoveRoleFromOrganizationUnit(RoleToOrganizationUnitInput input)
		{
			await _roleManager.RemoveFromOrganizationUnitAsync(input.RoleId, input.OrganizationUnitId);
		}

		//[AbpAuthorize(new string[] { "Pages.Administration.OrganizationUnits.ManageMembers" })]
		public async Task AddUsersToOrganizationUnit(UsersToOrganizationUnitInput input)
		{
			long[] userIds = input.UserIds;
			foreach (long userId in userIds)
			{
				await base.UserManager.AddToOrganizationUnitAsync(userId, input.OrganizationUnitId);
			}
		}

		//[AbpAuthorize(AppPermissions.Pages_Administration_OrganizationUnits_ManageRoles)]
		public async Task AddRolesToOrganizationUnit(RolesToOrganizationUnitInput input)
		{
			foreach (var roleId in input.RoleIds)
			{
				await _roleManager.AddToOrganizationUnitAsync(roleId, input.OrganizationUnitId, AbpSession.TenantId);
			}
		}

		//[AbpAuthorize(new string[] { "Pages.Administration.OrganizationUnits.ManageMembers" })]
		public async Task<PagedResultDto<NameValueDto>> FindUsers(FindOrganizationUnitUsersInput input)
		{
			IQueryable<long> userIdsInOrganizationUnit = from uou in _userOrganizationUnitRepository.GetAll()
														 where uou.OrganizationUnitId == input.OrganizationUnitId
														 select uou.UserId;
			IQueryable<User> query = base.UserManager.Users.Where((User u) => !userIdsInOrganizationUnit.Contains(u.Id)).WhereIf(!input.Filter.IsNullOrWhiteSpace(), (User u) => u.Name.Contains(input.Filter) || u.Surname.Contains(input.Filter) || u.UserName.Contains(input.Filter) || u.EmailAddress.Contains(input.Filter));
			return new PagedResultDto<NameValueDto>(await query.CountAsync(), (await (from u in query
																					  orderby u.Name, u.Surname
																					  select u).PageBy(input).ToListAsync()).Select((User u) => new NameValueDto(u.FullName + " (" + u.EmailAddress + ")", u.Id.ToString())).ToList());
		}

		//[AbpAuthorize(AppPermissions.Pages_Administration_OrganizationUnits_ManageRoles)]
		public async Task<PagedResultDto<NameValueDto>> FindRoles(FindOrganizationUnitRolesInput input)
		{
			var roleIdsInOrganizationUnit = _organizationUnitRoleRepository.GetAll()
				.Where(uou => uou.OrganizationUnitId == input.OrganizationUnitId)
				.Select(uou => uou.RoleId);

			var query = _roleManager.Roles
				.Where(u => !roleIdsInOrganizationUnit.Contains(u.Id))
				.WhereIf(
					!input.Filter.IsNullOrWhiteSpace(),
					u =>
						u.DisplayName.Contains(input.Filter) ||
						u.Name.Contains(input.Filter)
				);

			var roleCount = await query.CountAsync();
			var users = await query
				.OrderBy(u => u.DisplayName)
				.PageBy(input)
				.ToListAsync();

			return new PagedResultDto<NameValueDto>(
				roleCount,
				users.Select(u =>
					new NameValueDto(
						u.DisplayName,
						u.Id.ToString()
					)
				).ToList()
			);
		}

		private async Task<CustomOrganizationUnitDto> CreateOrganizationUnitDto(OrganizationUnit organizationUnit)
		{
			CustomOrganizationUnitDto dto = base.ObjectMapper.Map<CustomOrganizationUnitDto>(organizationUnit);
			CustomOrganizationUnitDto customOrganizationUnitDto = dto;
			customOrganizationUnitDto.MemberCount = await _userOrganizationUnitRepository.CountAsync((UserOrganizationUnit uou) => uou.OrganizationUnitId == organizationUnit.Id);
			return dto;
		}

        //Task<CustomOrganizationUnitDto> ICustomOrganizationUnitAppService.CreateOrganizationUnit(CreateOrganizationUnitInput input)
        //{
        //    throw new NotImplementedException();
        //}

        //Task<CustomOrganizationUnitDto> ICustomOrganizationUnitAppService.UpdateOrganizationUnit(UpdateOrganizationUnitInput input)
        //{
        //    throw new NotImplementedException();
        //}
    }
}
