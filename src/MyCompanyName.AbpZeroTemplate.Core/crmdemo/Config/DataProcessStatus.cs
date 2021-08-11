// crmdemo.Config.DataProcessStatus
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities.Auditing;

namespace MyCompanyName.AbpZeroTemplate.crmdemo.Config
{
	[Table("DataProcessStatuses")]
	public class DataProcessStatus : FullAuditedEntity
	{
		public virtual string DisplayName { get; set; }

		public virtual int OrderNumber { get; set; }

		public virtual bool IsActive { get; set; }

		public virtual bool IsEndProcess { get; set; }

		public virtual bool IsBeginProcess { get; set; }

		public virtual bool IsCallRequired { get; set; }

		public virtual bool IsPhoneCommunicationRequired { get; set; }

		public virtual bool IsReasonRequired { get; set; }

		public virtual bool IsFileRequired { get; set; }

		public virtual bool IsScheduleRequired { get; set; }

		public virtual bool TrialCustomer { get; set; }

		public virtual bool FullCustomer { get; set; }

		public virtual int TotalDaysLimit { get; set; }
	}
}
