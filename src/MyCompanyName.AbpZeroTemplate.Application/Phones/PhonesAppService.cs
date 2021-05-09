using System;
using System.Linq;
using System.Linq.Dynamic.Core;
using Abp.Linq.Extensions;
using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Domain.Repositories;
using MyCompanyName.AbpZeroTemplate.Phones.Exporting;
using MyCompanyName.AbpZeroTemplate.Phones.Dtos;
using MyCompanyName.AbpZeroTemplate.Dto;
using Abp.Application.Services.Dto;
using MyCompanyName.AbpZeroTemplate.Authorization;
using Abp.Extensions;
using Abp.Authorization;
using Microsoft.EntityFrameworkCore;

namespace MyCompanyName.AbpZeroTemplate.Phones
{
    [AbpAuthorize(AppPermissions.Pages_Phones)]
    public class PhonesAppService : AbpZeroTemplateAppServiceBase, IPhonesAppService
    {
        private readonly IRepository<Phone> _phoneRepository;
        private readonly IPhonesExcelExporter _phonesExcelExporter;

        public PhonesAppService(IRepository<Phone> phoneRepository, IPhonesExcelExporter phonesExcelExporter)
        {
            _phoneRepository = phoneRepository;
            _phonesExcelExporter = phonesExcelExporter;

        }

        public async Task<PagedResultDto<GetPhoneForViewDto>> GetAll(GetAllPhonesInput input)
        {

            var filteredPhones = _phoneRepository.GetAll()
                        .WhereIf(!string.IsNullOrWhiteSpace(input.Filter), e => false || e.Name.Contains(input.Filter) || e.Mobile.Contains(input.Filter))
                        .WhereIf(input.MinPhoneIdFilter != null, e => e.PhoneId >= input.MinPhoneIdFilter)
                        .WhereIf(input.MaxPhoneIdFilter != null, e => e.PhoneId <= input.MaxPhoneIdFilter)
                        .WhereIf(input.isDeleteFilter.HasValue && input.isDeleteFilter > -1, e => (input.isDeleteFilter == 1 && e.isDelete) || (input.isDeleteFilter == 0 && !e.isDelete))
                        .WhereIf(!string.IsNullOrWhiteSpace(input.NameFilter), e => e.Name == input.NameFilter)
                        .WhereIf(!string.IsNullOrWhiteSpace(input.MobileFilter), e => e.Mobile == input.MobileFilter);

            var pagedAndFilteredPhones = filteredPhones
                .OrderBy(input.Sorting ?? "id asc")
                .PageBy(input);

            var phones = from o in pagedAndFilteredPhones
                         select new GetPhoneForViewDto()
                         {
                             Phone = new PhoneDto
                             {
                                 PhoneId = o.PhoneId,
                                 isDelete = o.isDelete,
                                 Name = o.Name,
                                 Mobile = o.Mobile,
                                 Id = o.Id
                             }
                         };

            var totalCount = await filteredPhones.CountAsync();

            return new PagedResultDto<GetPhoneForViewDto>(
                totalCount,
                await phones.ToListAsync()
            );
        }

        public async Task<GetPhoneForViewDto> GetPhoneForView(int id)
        {
            var phone = await _phoneRepository.GetAsync(id);

            var output = new GetPhoneForViewDto { Phone = ObjectMapper.Map<PhoneDto>(phone) };

            return output;
        }

        [AbpAuthorize(AppPermissions.Pages_Phones_Edit)]
        public async Task<GetPhoneForEditOutput> GetPhoneForEdit(EntityDto input)
        {
            var phone = await _phoneRepository.FirstOrDefaultAsync(input.Id);

            var output = new GetPhoneForEditOutput { Phone = ObjectMapper.Map<CreateOrEditPhoneDto>(phone) };

            return output;
        }

        public async Task CreateOrEdit(CreateOrEditPhoneDto input)
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

        [AbpAuthorize(AppPermissions.Pages_Phones_Create)]
        protected virtual async Task Create(CreateOrEditPhoneDto input)
        {
            var phone = ObjectMapper.Map<Phone>(input);

            if (AbpSession.TenantId != null)
            {
                phone.TenantId = (int?)AbpSession.TenantId;
            }

            await _phoneRepository.InsertAsync(phone);
        }

        [AbpAuthorize(AppPermissions.Pages_Phones_Edit)]
        protected virtual async Task Update(CreateOrEditPhoneDto input)
        {
            var phone = await _phoneRepository.FirstOrDefaultAsync((int)input.Id);
            ObjectMapper.Map(input, phone);
        }

        [AbpAuthorize(AppPermissions.Pages_Phones_Delete)]
        public async Task Delete(EntityDto input)
        {
            await _phoneRepository.DeleteAsync(input.Id);
        }

        public async Task<FileDto> GetPhonesToExcel(GetAllPhonesForExcelInput input)
        {

            var filteredPhones = _phoneRepository.GetAll()
                        .WhereIf(!string.IsNullOrWhiteSpace(input.Filter), e => false || e.Name.Contains(input.Filter) || e.Mobile.Contains(input.Filter))
                        .WhereIf(input.MinPhoneIdFilter != null, e => e.PhoneId >= input.MinPhoneIdFilter)
                        .WhereIf(input.MaxPhoneIdFilter != null, e => e.PhoneId <= input.MaxPhoneIdFilter)
                        .WhereIf(input.isDeleteFilter.HasValue && input.isDeleteFilter > -1, e => (input.isDeleteFilter == 1 && e.isDelete) || (input.isDeleteFilter == 0 && !e.isDelete))
                        .WhereIf(!string.IsNullOrWhiteSpace(input.NameFilter), e => e.Name == input.NameFilter)
                        .WhereIf(!string.IsNullOrWhiteSpace(input.MobileFilter), e => e.Mobile == input.MobileFilter);

            var query = (from o in filteredPhones
                         select new GetPhoneForViewDto()
                         {
                             Phone = new PhoneDto
                             {
                                 PhoneId = o.PhoneId,
                                 isDelete = o.isDelete,
                                 Name = o.Name,
                                 Mobile = o.Mobile,
                                 Id = o.Id
                             }
                         });

            var phoneListDtos = await query.ToListAsync();

            return _phonesExcelExporter.ExportToFile(phoneListDtos);
        }

    }
}