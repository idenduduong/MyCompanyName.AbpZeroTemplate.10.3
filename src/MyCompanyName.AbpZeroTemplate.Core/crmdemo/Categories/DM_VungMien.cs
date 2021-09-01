using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyCompanyName.AbpZeroTemplate.crmdemo.Categories
{
	[Table("DM_VungMiens")]
	public class DM_VungMien : FullAuditedEntity<Guid>, IMayHaveTenant
	{
		public int? TenantId { get; set; }

		public virtual string MaVung { get; set; }

		[Required]
		public virtual string TenVung { get; set; }

		public virtual string GhiChu { get; set; }
	}

}
