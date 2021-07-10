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
using MyCompanyName.AbpZeroTemplate.Persons;
using MyCompanyName.AbpZeroTemplate.Persons.Dtos;

namespace MyCompanyName.AbpZeroTemplate.Phones
{
    [AbpAuthorize(AppPermissions.Pages_Phones)]
    public class PersonsAppService : AbpZeroTemplateAppServiceBase, IPersonsAppService
    {
        private readonly IRepository<Person> _personRepository;

        public PersonsAppService(IRepository<Person> personRepository)
        {
            _personRepository = personRepository;
        }

        public ListResultDto<PersonListDto> GetPeople(GetPeopleInput input)
        {
            var persons = _personRepository
                .GetAll()
                .WhereIf(
                    !input.Filter.IsNullOrEmpty(),
                    p => p.Name.Contains(input.Filter) ||
                            p.Surname.Contains(input.Filter) ||
                            p.EmailAddress.Contains(input.Filter)
                )
                .OrderBy(p => p.Name)
                .ThenBy(p => p.Surname)
                .ToList();

            return new ListResultDto<PersonListDto>(ObjectMapper.Map<List<PersonListDto>>(persons));
        }
    }
}