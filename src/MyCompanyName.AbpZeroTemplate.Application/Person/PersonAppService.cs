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
using Abp.Dapper.Repositories;
using DapperExtensions.Mapper;
using Dapper;
using DynamicData;

namespace MyCompanyName.AbpZeroTemplate.Phones
{
    [AbpAuthorize(AppPermissions.Pages_Phones)]
    public class PersonsAppService : AbpZeroTemplateAppServiceBase, IPersonsAppService
    {
        private readonly IRepository<Person> _personRepository;

        private readonly IDapperRepository<Person> _personDapperRepository;

        public PersonsAppService(IRepository<Person> personRepository)
        {
            _personRepository = personRepository;
        }

        public PersonsAppService(
                    IRepository<Person> personRepository,
                    IDapperRepository<Person> personDapperRepository
                )
        {
            _personRepository = personRepository;
            _personDapperRepository = personDapperRepository;
        }

        public async Task CreatePerson(CreatePersonInput input)
        {
            var person = ObjectMapper.Map<Person>(input);
            await _personRepository.InsertAsync(person);
        }

        public async Task DeletePerson(EntityDto input)
        {
            await _personRepository.DeleteAsync(input.Id);
        }

        public async Task EditPerson(EditPersonInput input)
        {
            var person = await _personRepository.GetAsync(input.Id);
            if (input.Name != null)
            {
                person.Name = input.Name;
            }

            if (input.Surname != null)
            {
                person.Surname = input.Surname;
            }

            if (input.EmailAddress != null)
            {
                person.EmailAddress = input.EmailAddress;
            }

            await _personRepository.UpdateAsync(person);
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

        //  dapper demo
        public PagedResultDto<PersonListDto> GetAllPeopleByDapper()
        {
            var strSql = $@"Select * From PbPersons;";
            var query = _personDapperRepository.Query(strSql);
            var list = query.ToList();
            //IEnumerable<PersonListDto> list = (IEnumerable<PersonListDto>)people;
            var result = new PagedResultDto<PersonListDto>();
            //result = new PagedResultDto<PersonListDto>(query.Count(), (PersonListDto)list);            
            return result;
        }

        public PagedResultDto<PersonListDto> GetAllPeoplePagedByDapper(int page = 1, int pageSize = 10)
        {
            var query = _personDapperRepository.Query("Select * From PbPersons;");
            IQueryable<PersonListDto> list = query.AsQueryable().Select(t => new PersonListDto
                                                                            {
                                                                                Name = t.Name,
                                                                                Surname = t.Surname
                                                                            });
            var result = new PagedResultDto<PersonListDto>();
            result = new PagedResultDto<PersonListDto>(query.Count(), list.OrderBy(p => p.LastModificationTime).PageBy(page * pageSize, pageSize).ToList());
            
            return result;
        }
    }

    //public sealed class PersonMapper : ClassMapper<Person>
    //{
    //    public PersonMapper()
    //    {
    //        Table("Persons");
    //        Map(x => x.DeletionTime).Ignore();
    //        AutoMap();
    //    }
    //}
}