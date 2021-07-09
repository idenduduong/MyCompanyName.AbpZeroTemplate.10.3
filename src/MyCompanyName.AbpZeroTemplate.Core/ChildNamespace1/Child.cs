using MyCompanyName.AbpZeroTemplate.BaseNamespace;
using MyCompanyName.AbpZeroTemplate.Authorization.Users;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities.Auditing;
using Abp.Domain.Entities;
using Abp.Auditing;

namespace MyCompanyName.AbpZeroTemplate.ChildNamespace1
{
    [Table("Childs")]
    [Audited]
    public class Child : Entity, IMayHaveTenant
    {
        public int? TenantId { get; set; }

        public virtual string ChildProp1 { get; set; }

        public virtual int? BaseEntityId { get; set; }

        [ForeignKey("BaseEntityId")]
        public BaseEntity BaseEntityFk { get; set; }

        public virtual long? UserId { get; set; }

        [ForeignKey("UserId")]
        public User UserFk { get; set; }

    }
}