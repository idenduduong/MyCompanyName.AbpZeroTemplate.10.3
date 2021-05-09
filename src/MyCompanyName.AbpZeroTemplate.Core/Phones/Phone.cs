using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities.Auditing;
using Abp.Domain.Entities;
using Abp.Auditing;

namespace MyCompanyName.AbpZeroTemplate.Phones
{
    [Table("Phones")]
    [Audited]
    public class Phone : FullAuditedEntity, IMayHaveTenant
    {
        public int? TenantId { get; set; }

        public virtual int PhoneId { get; set; }

        public virtual bool isDelete { get; set; }

        [Required]
        [StringLength(PhoneConsts.MaxNameLength, MinimumLength = PhoneConsts.MinNameLength)]
        public virtual string Name { get; set; }

        [Required]
        [StringLength(PhoneConsts.MaxMobileLength, MinimumLength = PhoneConsts.MinMobileLength)]
        public virtual string Mobile { get; set; }

    }
}