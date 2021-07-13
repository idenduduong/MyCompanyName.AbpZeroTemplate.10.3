using System;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using MyCompanyName.AbpZeroTemplate.Persons.Dtos;
using MyCompanyName.AbpZeroTemplate.Dto;

namespace MyCompanyName.AbpZeroTemplate.Persons
{
    public interface IPersonsAppService : IApplicationService
    {
        ListResultDto<PersonListDto> GetPeople(GetPeopleInput input);

        Task CreatePerson(CreatePersonInput input);

        Task DeletePerson(EntityDto input);

        Task EditPerson(EditPersonInput input);
    }
}