// crmdemo.Temp.EntityOrder
using System;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;

namespace MyCompanyName.AbpZeroTemplate.crmdemo.Temp
{
	[Table("EntityOrders")]
	public class EntityOrder : FullAuditedEntity<Guid>, IMayHaveTenant
	{
		public int? TenantId { get; set; }

		public virtual string EntityCode { get; set; }

		public virtual double OrderNumber { get; set; }
	}

}
