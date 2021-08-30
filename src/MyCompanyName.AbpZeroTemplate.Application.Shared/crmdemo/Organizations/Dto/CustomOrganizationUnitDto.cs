// crmdemo.Organizations.Dto.CustomOrganizationUnitDto
using Abp.Application.Services.Dto;

namespace MyCompanyName.AbpZeroTemplate.crmdemo.Organizations.Dto
{
	public class CustomOrganizationUnitDto : AuditedEntityDto<long>
	{
		public long? ParentId { get; set; }

		public string Code { get; set; }

		public string DisplayName { get; set; }

		public int MemberCount { get; set; }

		public int RoleCount { get; set; }

		public int? Level { get; set; }

		public string Lineage { get; set; }

		public string UnitCode { get; set; }

		public string Website { get; set; }

		public string Address { get; set; }

		public string TaxCode { get; set; }

		public string AccountNumber { get; set; }

		public string Phone { get; set; }

		public string MarkupCharacters { get; set; }

		public bool? IsShowPrimary { get; set; }

		public bool? IsShowSecondary { get; set; }
	}

}
