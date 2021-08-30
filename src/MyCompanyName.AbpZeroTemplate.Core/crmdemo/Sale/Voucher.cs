// crmdemo.Sale.Voucher
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities.Auditing;
using MyCompanyName.AbpZeroTemplate.crmdemo.Categories;
using MyCompanyName.AbpZeroTemplate.crmdemo.Sale;

namespace MyCompanyName.AbpZeroTemplate.crmdemo.Sale
{
	[Table("Vouchers")]
	public class Voucher : FullAuditedEntity<Guid>
	{
		[Required]
		public virtual string VoucherCode { get; set; }

		public virtual decimal VoucherValue { get; set; }

		public virtual Guid? KhuyenMaiId { get; set; }

		public DM_KhuyenMai KhuyenMai { get; set; }
	}
}
