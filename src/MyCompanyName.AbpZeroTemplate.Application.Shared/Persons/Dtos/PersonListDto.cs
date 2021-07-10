using Abp.Application.Services.Dto;

namespace MyCompanyName.AbpZeroTemplate.Persons.Dtos
{
    public class PersonListDto : FullAuditedEntityDto
    {
        public string Name { get; set; }

        public string Surname { get; set; }

        public string EmailAddress { get; set; }
    }
}