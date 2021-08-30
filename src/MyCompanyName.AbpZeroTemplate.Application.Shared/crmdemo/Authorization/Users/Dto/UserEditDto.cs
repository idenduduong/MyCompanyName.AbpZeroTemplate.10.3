// crmdemo.Authorization.Users.Dto.UserEditDto
using System;
using System.ComponentModel.DataAnnotations;
using Abp.Auditing;
using Abp.Domain.Entities;

namespace MyCompanyName.AbpZeroTemplate.crmdemo.Authorization.Users.Dto
{
	public class UserEditDto : IPassivable
	{
		public long? Id { get; set; }

		[Required]
		[StringLength(32)]
		public string Name { get; set; }

		[Required]
		[StringLength(32)]
		public string Surname { get; set; }

		[Required]
		[StringLength(32)]
		public string UserName { get; set; }

		[Required]
		[EmailAddress]
		[StringLength(256)]
		public string EmailAddress { get; set; }

		[StringLength(24)]
		public string PhoneNumber { get; set; }

		[StringLength(32)]
		[DisableAuditing]
		public string Password { get; set; }

		[Required]
		public string MaNhanVien { get; set; }

		public DateTime? NgaySinh { get; set; }

		public bool GioiTinh { get; set; }

		public string DiaChi { get; set; }

		public string CMT { get; set; }

		public string DiaChiTamTru { get; set; }

		public string SoBHXH { get; set; }

		public string GhiChu { get; set; }

		public int EmployeeStatus { get; set; }

		public DateTime? NgayCap { get; set; }

		public string NoiCap { get; set; }

		public double PTCKBanThe { get; set; }

		public string NoiSinh { get; set; }

		[Required]
		public string UserType { get; set; }

		public bool IsActive { get; set; }

		public bool ShouldChangePasswordOnNextLogin { get; set; }

		public virtual bool IsTwoFactorEnabled { get; set; }

		public virtual bool IsLockoutEnabled { get; set; }
	}

}
