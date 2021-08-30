// crmdemo.Categories.DM_NgheNghiep
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities.Auditing;

namespace MyCompanyName.AbpZeroTemplate.crmdemo.Categories
{
	[Table("DM_NgheNghieps")]
	public class DM_NgheNghiep : FullAuditedEntity
	{
		[Required]
		public virtual string DisplayName { get; set; }

		[Required]
		public virtual string Code { get; set; }

		public virtual int DisplayOrder { get; set; }

		public virtual string Description { get; set; }
	}
}
