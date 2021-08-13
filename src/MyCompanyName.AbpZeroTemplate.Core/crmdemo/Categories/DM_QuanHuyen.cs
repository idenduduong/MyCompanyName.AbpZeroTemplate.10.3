// crmdemo.Categories.DM_QuanHuyen
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;

namespace MyCompanyName.AbpZeroTemplate.crmdemo.Categories
{
	[Table("DM_QuanHuyens")]
	public class DM_QuanHuyen : FullAuditedEntity<Guid>, IMayHaveTenant
	{
		public int? TenantId { get; set; }

		public virtual string MaQuanHuyen { get; set; }

		[Required]
		public virtual string TenQuanHuyen { get; set; }

		public virtual string GhiChu { get; set; }

		public virtual string UserTao { get; set; }

		public virtual DateTime? NgayTao { get; set; }

		public virtual string UserSuaCuoi { get; set; }

		public virtual DateTime? NgaySuaCuoi { get; set; }

		public virtual Guid? ID_TinhThanh { get; set; }

		public virtual Guid? AreaId { get; set; }

		public virtual string AreaName { get; set; }
	}
}
