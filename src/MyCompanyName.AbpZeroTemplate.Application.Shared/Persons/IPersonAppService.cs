using System;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using MyCompanyName.AbpZeroTemplate.Persons.Dtos;
using MyCompanyName.AbpZeroTemplate.Dto;
using System.Collections.Generic;

namespace MyCompanyName.AbpZeroTemplate.Persons
{
    public interface IPersonsAppService : IApplicationService
    {
        ListResultDto<PersonListDto> GetPeople(GetPeopleInput input);

        PagedResultDto<PersonListDto> GetAllPeopleByDapper();

        PagedResultDto<PersonListDto> GetAllPeoplePagedByDapper(int page, int pageSize);

        Task CreatePerson(CreatePersonInput input);

        Task DeletePerson(EntityDto input);

        Task EditPerson(EditPersonInput input);
    }
}