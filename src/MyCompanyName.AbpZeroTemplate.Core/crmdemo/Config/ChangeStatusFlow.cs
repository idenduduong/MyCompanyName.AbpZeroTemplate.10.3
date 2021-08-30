// crmdemo.Config.ChangeStatusFlow
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities.Auditing;
using MyCompanyName.AbpZeroTemplate.crmdemo.Config;


namespace MyCompanyName.AbpZeroTemplate.crmdemo.Config
{
	[Table("ChangeStatusFlows")]
	public class ChangeStatusFlow : FullAuditedEntity
	{
		public virtual int Days { get; set; }

		public virtual bool IsEndFlow { get; set; }

		public virtual int? FromStatusId { get; set; }

		public DataProcessStatus FromStatus { get; set; }

		public virtual int? ToStatusId { get; set; }

		public DataProcessStatus ToStatus { get; set; }
	}

}
