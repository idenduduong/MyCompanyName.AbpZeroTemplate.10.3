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

		//public async Task<ListResultDto<OrganizationUnitDto>> GetOrganizationUnits()
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
			return new PagedResultDto<OrganizationUnitUserListDto>(await query.CountAsync(), (await query.OrderBy(input.Sorting).PageBy(input).ToListAsync()).Select(item =>
			{
				OrganizationUnitUserListDto organizationUnitUserListDto = base.ObjectMapper.Map<OrganizationUnitUserListDto>(item.user);
				organizationUnitUserListDto.AddedTime = item.uou.CreationTime;
				return organizationUnitUserListDto;
			}).ToList());
		}

		//[AbpAuthorize(new string[] { "Pages.Administration.OrganizationUnits.ManageOrganizationTree" })]
		//public async Task<CustomOrganizationUnitDto> CreateOrganizationUnit(CreateOrganizationUnitInput input)
		//{
		//	string parentIds = string.Empty;
		//	int parentLevel = -1;
		//	new CustomOrganizationUnit();
		//	if (input.ParentId.HasValue)
		//	{
		//		_customOrganizationUnitRepository.Get(input.ParentId.Value);
		//	}
		//	CustomOrganizationUnit organizationUnit = new CustomOrganizationUnit(base.AbpSession.TenantId, input.DisplayName, input.ParentId, parentIds, parentLevel, input.UnitCode, input.Website, input.Phone, input.TaxCode, input.Address, input.AccountNumber, input.MarkupCharacters, input.IsShowPrimary, input.IsShowSecondary);
		//	CustomOrganizationUnit customOrganizationUnit = organizationUnit;
		//	customOrganizationUnit.Code = await _organizationUnitManager.GetNextChildCodeAsync(organizationUnit.ParentId);
		//	await _customOrganizationUnitRepository.InsertAsync(organizationUnit);
		//	await base.CurrentUnitOfWork.SaveChangesAsync();
		//	return base.ObjectMapper.Map<CustomOrganizationUnitDto>(organizationUnit);
		//}

		//[AbpAuthorize(new string[] { "Pages.Administration.OrganizationUnits.ManageOrganizationTree" })]
		//public async Task<CustomOrganizationUnitDto> UpdateOrganizationUnit(UpdateOrganizationUnitInput input)
		//{
		//	CustomOrganizationUnit organizationUnit = await _customOrganizationUnitRepository.GetAsync(input.Id);
		//	organizationUnit.DisplayName = input.DisplayName;
		//	organizationUnit.UnitCode = input.UnitCode;
		//	organizationUnit.Website = input.Website;
		//	organizationUnit.Phone = input.Phone;
		//	organizationUnit.Address = input.Address;
		//	organizationUnit.TaxCode = input.TaxCode;
		//	organizationUnit.AccountNumber = input.AccountNumber;
		//	await _organizationUnitManager.UpdateAsync(organizationUnit);
		//	CustomOrganizationUnitDto result = await CreateOrganizationUnitDto(organizationUnit);
		//	EventBus.Default.Trigger(new OrganizationUnitUpdateEvent
		//	{
		//		OrganizationId = organizationUnit.Id,
		//		OrganizationCode = organizationUnit.UnitCode,
		//		OrganizationName = organizationUnit.DisplayName
		//	});
		//	return result;
		//}

		[AbpAuthorize(new string[] { "Pages.Administration.OrganizationUnits.ManageOrganizationTree" })]
		public async Task<CustomOrganizationUnitDto> MoveOrganizationUnit(MoveOrganizationUnitInput input)
		{
			await _organizationUnitManager.MoveAsync(input.Id, input.NewParentId);
			return await CreateOrganizationUnitDto(await _customOrganizationUnitRepository.GetAsync(input.Id));
		}

		[AbpAuthorize(new string[] { "Pages.Administration.OrganizationUnits.ManageOrganizationTree" })]
		public async Task DeleteOrganizationUnit(EntityDto<long> input)
		{
			await _customOrganizationUnitRepository.DeleteAsync(input.Id);
		}

		[AbpAuthorize(new string[] { "Pages.Administration.OrganizationUnits.ManageMembers" })]
		public async Task RemoveUserFromOrganizationUnit(UserToOrganizationUnitInput input)
		{
			await base.UserManager.RemoveFromOrganizationUnitAsync(input.UserId, input.OrganizationUnitId);
		}

		[AbpAuthorize(new string[] { "Pages.Administration.OrganizationUnits.ManageMembers" })]
		public async Task AddUsersToOrganizationUnit(UsersToOrganizationUnitInput input)
		{
			long[] userIds = input.UserIds;
			foreach (long userId in userIds)
			{
				await base.UserManager.AddToOrganizationUnitAsync(userId, input.OrganizationUnitId);
			}
		}

		[AbpAuthorize(new string[] { "Pages.Administration.OrganizationUnits.ManageMembers" })]
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

		private async Task<CustomOrganizationUnitDto> CreateOrganizationUnitDto(OrganizationUnit organizationUnit)
		{
			CustomOrganizationUnitDto dto = base.ObjectMapper.Map<CustomOrganizationUnitDto>(organizationUnit);
			CustomOrganizationUnitDto customOrganizationUnitDto = dto;
			customOrganizationUnitDto.MemberCount = await _userOrganizationUnitRepository.CountAsync((UserOrganizationUnit uou) => uou.OrganizationUnitId == organizationUnit.Id);
			return dto;
		}

        public Task<CustomOrganizationUnitDto> CreateOrganizationUnit(CreateOrganizationUnitInput input)
        {
            throw new NotImplementedException();
        }

        public Task<CustomOrganizationUnitDto> UpdateOrganizationUnit(UpdateOrganizationUnitInput input)
        {
            throw new NotImplementedException();
        }
    }
}
