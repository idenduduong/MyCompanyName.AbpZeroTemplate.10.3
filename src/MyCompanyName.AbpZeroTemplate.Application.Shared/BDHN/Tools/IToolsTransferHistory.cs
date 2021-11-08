﻿using System;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using MyCompanyName.AbpZeroTemplate.BDHN.Dtos;

namespace MyCompanyName.AbpZeroTemplate.BDHN
{
    public interface IToolsTransferHistory : IApplicationService
    {
        Task<PagedResultDto<GetToolTransferHistoryForViewDto>> GetAll(GetAllToolTransferHistoryInput input);

        //Task<GetToolForViewDto> GetForView(Guid id);

        //Task<GetToolForEditOutput> GetForEdit(EntityDto<Guid> input);

        //Task CreateOrEdit(CreateOrEditToolDto input);

        //Task Delete(EntityDto<Guid> input);

        //Task<PagedResultDto<BuuCucUnitLookupTableDto>> GetAllPosForLookupTable(GetAllForLookupTableInput input);

        //Task<PagedResultDto<BuuCucUnitLookupTableDto>> GetAllUnitForLookupTable(GetAllForLookupTableInput input);
    }
}