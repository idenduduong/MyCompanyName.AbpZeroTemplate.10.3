// crmdemo.Categories.DataSource
using System;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities.Auditing;

namespace MyCompanyName.AbpZeroTemplate.crmdemo.Categories
{
	[Table("DataSources")]
	public class DataSource : FullAuditedEntity<Guid>
	{
		public virtual string DisplayName { get; set; }

		public virtual string Code { get; set; }

		public virtual int Priority { get; set; }

		public virtual bool IsActive { get; set; }
	}


}