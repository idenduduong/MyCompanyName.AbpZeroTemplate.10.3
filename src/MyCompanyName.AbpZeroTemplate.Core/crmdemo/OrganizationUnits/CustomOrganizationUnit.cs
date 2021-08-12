// crmdemo.OrganizationUnits.CustomOrganizationUnit
using System;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using Abp.Organizations;
namespace MyCompanyName.AbpZeroTemplate.crmdemo.OrganizationUnits
{
	//[Table("AbpOrganizationUnits")]
	public class CustomOrganizationUnit : OrganizationUnit
	//, IMayHaveTenant
	{
		public virtual string? UnitCode { get; set; }

		public virtual string? Website { get; set; }

		public virtual string? Address { get; set; }

		public virtual string? TaxCode { get; set; }

		public virtual string? AccountNumber { get; set; }

		public virtual string? Phone { get; set; }

		public string? Lineage { get; set; }

		public Guid? AreaId { get; set; }

		public string? AreaName { get; set; }

		public CustomOrganizationUnit()
		{
		}

		public CustomOrganizationUnit(int? tenantId, string? displayName, long? parentId, string? parentIds, int? parentLevel, string? unitCode, string? website, string? phone, string? taxCode, string? address, string? accountNumber, string? markupCharacters, bool? isShowPrimary, bool? isShowSecondary)
			: base(tenantId, displayName, parentId)
		{
			UnitCode = unitCode;
			Website = website;
			Address = address;
			TaxCode = taxCode;
			AccountNumber = accountNumber;
			Phone = phone;
		}
	}

}
