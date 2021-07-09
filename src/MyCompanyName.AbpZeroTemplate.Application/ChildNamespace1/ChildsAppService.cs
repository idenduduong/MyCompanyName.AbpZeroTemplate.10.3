using MyCompanyName.AbpZeroTemplate.BaseNamespace;
using MyCompanyName.AbpZeroTemplate.Authorization.Users;

using System;
using System.Linq;
using System.Linq.Dynamic.Core;
using Abp.Linq.Extensions;
using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Domain.Repositories;
using MyCompanyName.AbpZeroTemplate.ChildNamespace1.Exporting;
using MyCompanyName.AbpZeroTemplate.ChildNamespace1.Dtos;
using MyCompanyName.AbpZeroTemplate.Dto;
using Abp.Application.Services.Dto;
using MyCompanyName.AbpZeroTemplate.Authorization;
using Abp.Extensions;
using Abp.Authorization;
using Microsoft.EntityFrameworkCore;
using Abp.UI;
using MyCompanyName.AbpZeroTemplate.Storage;

namespace MyCompanyName.AbpZeroTemplate.ChildNamespace1
{
    [AbpAuthorize(AppPermissions.Pages_Childs)]
    public class ChildsAppService : AbpZeroTemplateAppServiceBase, IChildsAppService
    {
        private readonly IRepository<Child> _childRepository;
        private readonly IChildsExcelExporter _childsExcelExporter;
        private readonly IRepository<BaseEntity, int> _lookup_baseEntityRepository;
        private readonly IRepository<User, long> _lookup_userRepository;

        public ChildsAppService(IRepository<Child> childRepository, IChildsExcelExporter childsExcelExporter, IRepository<BaseEntity, int> lookup_baseEntityRepository, IRepository<User, long> lookup_userRepository)
        {
            _childRepository = childRepository;
            _childsExcelExporter = childsExcelExporter;
            _lookup_baseEntityRepository = lookup_baseEntityRepository;
            _lookup_userRepository = lookup_userRepository;

        }

        public async Task<PagedResultDto<GetChildForViewDto>> GetAll(GetAllChildsInput input)
        {

            var filteredChilds = _childRepository.GetAll()
                        .Include(e => e.BaseEntityFk)
                        .Include(e => e.UserFk)
                        .WhereIf(!string.IsNullOrWhiteSpace(input.Filter), e => false || e.ChildProp1.Contains(input.Filter))
                        .WhereIf(!string.IsNullOrWhiteSpace(input.ChildProp1Filter), e => e.ChildProp1 == input.ChildProp1Filter)
                        .WhereIf(!string.IsNullOrWhiteSpace(input.BaseEntityBaseProp1Filter), e => e.BaseEntityFk != null && e.BaseEntityFk.BaseProp1 == input.BaseEntityBaseProp1Filter)
                        .WhereIf(!string.IsNullOrWhiteSpace(input.UserNameFilter), e => e.UserFk != null && e.UserFk.Name == input.UserNameFilter)
                        .WhereIf(input.BaseEntityIdFilter.HasValue, e => false || e.BaseEntityId == input.BaseEntityIdFilter.Value);

            var pagedAndFilteredChilds = filteredChilds
                .OrderBy(input.Sorting ?? "id asc")
                .PageBy(input);

            var childs = from o in pagedAndFilteredChilds
                         join o1 in _lookup_baseEntityRepository.GetAll() on o.BaseEntityId equals o1.Id into j1
                         from s1 in j1.DefaultIfEmpty()

                         join o2 in _lookup_userRepository.GetAll() on o.UserId equals o2.Id into j2
                         from s2 in j2.DefaultIfEmpty()

                         select new
                         {

                             o.ChildProp1,
                             Id = o.Id,
                             BaseEntityBaseProp1 = s1 == null || s1.BaseProp1 == null ? "" : s1.BaseProp1.ToString(),
                             UserName = s2 == null || s2.Name == null ? "" : s2.Name.ToString()
                         };

            var totalCount = await filteredChilds.CountAsync();

            var dbList = await childs.ToListAsync();
            var results = new List<GetChildForViewDto>();

            foreach (var o in dbList)
            {
                var res = new GetChildForViewDto()
                {
                    Child = new ChildDto
                    {

                        ChildProp1 = o.ChildProp1,
                        Id = o.Id,
                    },
                    BaseEntityBaseProp1 = o.BaseEntityBaseProp1,
                    UserName = o.UserName
                };

                results.Add(res);
            }

            return new PagedResultDto<GetChildForViewDto>(
                totalCount,
                results
            );

        }

        public async Task<GetChildForViewDto> GetChildForView(int id)
        {
            var child = await _childRepository.GetAsync(id);

            var output = new GetChildForViewDto { Child = ObjectMapper.Map<ChildDto>(child) };

            if (output.Child.BaseEntityId != null)
            {
                var _lookupBaseEntity = await _lookup_baseEntityRepository.FirstOrDefaultAsync((int)output.Child.BaseEntityId);
                output.BaseEntityBaseProp1 = _lookupBaseEntity?.BaseProp1?.ToString();
            }

            if (output.Child.UserId != null)
            {
                var _lookupUser = await _lookup_userRepository.FirstOrDefaultAsync((long)output.Child.UserId);
                output.UserName = _lookupUser?.Name?.ToString();
            }

            return output;
        }

        [AbpAuthorize(AppPermissions.Pages_Childs_Edit)]
        public async Task<GetChildForEditOutput> GetChildForEdit(EntityDto input)
        {
            var child = await _childRepository.FirstOrDefaultAsync(input.Id);

            var output = new GetChildForEditOutput { Child = ObjectMapper.Map<CreateOrEditChildDto>(child) };

            if (output.Child.BaseEntityId != null)
            {
                var _lookupBaseEntity = await _lookup_baseEntityRepository.FirstOrDefaultAsync((int)output.Child.BaseEntityId);
                output.BaseEntityBaseProp1 = _lookupBaseEntity?.BaseProp1?.ToString();
            }

            if (output.Child.UserId != null)
            {
                var _lookupUser = await _lookup_userRepository.FirstOrDefaultAsync((long)output.Child.UserId);
                output.UserName = _lookupUser?.Name?.ToString();
            }

            return output;
        }

        public async Task CreateOrEdit(CreateOrEditChildDto input)
        {
            if (input.Id == null)
            {
                await Create(input);
            }
            else
            {
                await Update(input);
            }
        }

        [AbpAuthorize(AppPermissions.Pages_Childs_Create)]
        protected virtual async Task Create(CreateOrEditChildDto input)
        {
            var child = ObjectMapper.Map<Child>(input);

            if (AbpSession.TenantId != null)
            {
                child.TenantId = (int?)AbpSession.TenantId;
            }

            await _childRepository.InsertAsync(child);

        }

        [AbpAuthorize(AppPermissions.Pages_Childs_Edit)]
        protected virtual async Task Update(CreateOrEditChildDto input)
        {
            var child = await _childRepository.FirstOrDefaultAsync((int)input.Id);
            ObjectMapper.Map(input, child);

        }

        [AbpAuthorize(AppPermissions.Pages_Childs_Delete)]
        public async Task Delete(EntityDto input)
        {
            await _childRepository.DeleteAsync(input.Id);
        }

        public async Task<FileDto> GetChildsToExcel(GetAllChildsForExcelInput input)
        {

            var filteredChilds = _childRepository.GetAll()
                        .Include(e => e.BaseEntityFk)
                        .Include(e => e.UserFk)
                        .WhereIf(!string.IsNullOrWhiteSpace(input.Filter), e => false || e.ChildProp1.Contains(input.Filter))
                        .WhereIf(!string.IsNullOrWhiteSpace(input.ChildProp1Filter), e => e.ChildProp1 == input.ChildProp1Filter)
                        .WhereIf(!string.IsNullOrWhiteSpace(input.BaseEntityBaseProp1Filter), e => e.BaseEntityFk != null && e.BaseEntityFk.BaseProp1 == input.BaseEntityBaseProp1Filter)
                        .WhereIf(!string.IsNullOrWhiteSpace(input.UserNameFilter), e => e.UserFk != null && e.UserFk.Name == input.UserNameFilter);

            var query = (from o in filteredChilds
                         join o1 in _lookup_baseEntityRepository.GetAll() on o.BaseEntityId equals o1.Id into j1
                         from s1 in j1.DefaultIfEmpty()

                         join o2 in _lookup_userRepository.GetAll() on o.UserId equals o2.Id into j2
                         from s2 in j2.DefaultIfEmpty()

                         select new GetChildForViewDto()
                         {
                             Child = new ChildDto
                             {
                                 ChildProp1 = o.ChildProp1,
                                 Id = o.Id
                             },
                             BaseEntityBaseProp1 = s1 == null || s1.BaseProp1 == null ? "" : s1.BaseProp1.ToString(),
                             UserName = s2 == null || s2.Name == null ? "" : s2.Name.ToString()
                         });

            var childListDtos = await query.ToListAsync();

            return _childsExcelExporter.ExportToFile(childListDtos);
        }

        [AbpAuthorize(AppPermissions.Pages_Childs)]
        public async Task<PagedResultDto<ChildBaseEntityLookupTableDto>> GetAllBaseEntityForLookupTable(GetAllForLookupTableInput input)
        {
            var query = _lookup_baseEntityRepository.GetAll().WhereIf(
                   !string.IsNullOrWhiteSpace(input.Filter),
                  e => e.BaseProp1 != null && e.BaseProp1.Contains(input.Filter)
               );

            var totalCount = await query.CountAsync();

            var baseEntityList = await query
                .PageBy(input)
                .ToListAsync();

            var lookupTableDtoList = new List<ChildBaseEntityLookupTableDto>();
            foreach (var baseEntity in baseEntityList)
            {
                lookupTableDtoList.Add(new ChildBaseEntityLookupTableDto
                {
                    Id = baseEntity.Id,
                    DisplayName = baseEntity.BaseProp1?.ToString()
                });
            }

            return new PagedResultDto<ChildBaseEntityLookupTableDto>(
                totalCount,
                lookupTableDtoList
            );
        }

        [AbpAuthorize(AppPermissions.Pages_Childs)]
        public async Task<PagedResultDto<ChildUserLookupTableDto>> GetAllUserForLookupTable(GetAllForLookupTableInput input)
        {
            var query = _lookup_userRepository.GetAll().WhereIf(
                   !string.IsNullOrWhiteSpace(input.Filter),
                  e => e.Name != null && e.Name.Contains(input.Filter)
               );

            var totalCount = await query.CountAsync();

            var userList = await query
                .PageBy(input)
                .ToListAsync();

            var lookupTableDtoList = new List<ChildUserLookupTableDto>();
            foreach (var user in userList)
            {
                lookupTableDtoList.Add(new ChildUserLookupTableDto
                {
                    Id = user.Id,
                    DisplayName = user.Name?.ToString()
                });
            }

            return new PagedResultDto<ChildUserLookupTableDto>(
                totalCount,
                lookupTableDtoList
            );
        }

    }
}