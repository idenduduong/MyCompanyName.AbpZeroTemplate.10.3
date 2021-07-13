using Abp.Application.Services.Dto;
using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace MyCompanyName.AbpZeroTemplate.Persons.Dtos
{
    public class PersonListDto : FullAuditedEntityDto
    {
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore, PropertyName = "Id")]
        public int Id { get; set; }

        //[Display(Name = "Name Of Person")]
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore, PropertyName = "Name")]
        public string Name { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore, PropertyName = "Surname")]
        public string Surname { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore, PropertyName = "EmailAddress")]
        public string EmailAddress { get; set; }
    }
}