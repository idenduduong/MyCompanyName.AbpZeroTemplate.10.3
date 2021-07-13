using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities.Auditing;
using Abp.Domain.Entities;
using Abp.Auditing;
using Newtonsoft.Json;

namespace MyCompanyName.AbpZeroTemplate.Persons
{
    [Table("PbPersons")]
    [Audited]
    public class Person : FullAuditedEntity
    {
        //[JsonProperty(NullValueHandling = NullValueHandling.Ignore, PropertyName = "Id")]
        //public override int Id { get; set; }

        [Required]
        //[Display(Name = "Name Of Person")]
        //[JsonProperty(NullValueHandling = NullValueHandling.Ignore, PropertyName = "Name")]
        [MaxLength(PersonConsts.MaxNameLength)]
        public virtual string Name { get; set; }

        [Required]
        //[JsonProperty(NullValueHandling = NullValueHandling.Ignore, PropertyName = "Surname")]
        [MaxLength(PersonConsts.MaxSurnameLength)]
        public virtual string Surname { get; set; }

        //[JsonProperty(NullValueHandling = NullValueHandling.Ignore, PropertyName = "EmailAddress")]
        [MaxLength(PersonConsts.MaxEmailAddressLength)]
        public virtual string EmailAddress { get; set; }
    }
}