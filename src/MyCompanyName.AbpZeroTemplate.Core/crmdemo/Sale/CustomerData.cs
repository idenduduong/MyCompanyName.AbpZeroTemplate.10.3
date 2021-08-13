// crmdemo.Sale.CustomerData
using System;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities.Auditing;
using Abp.Organizations;
using MyCompanyName.AbpZeroTemplate.crmdemo.Sale;
using MyCompanyName.AbpZeroTemplate.crmdemo.Categories;

namespace MyCompanyName.AbpZeroTemplate.crmdemo.Sale
{
	[Table("CustomerDatas")]
	public class CustomerData : FullAuditedEntity<Guid>
	{
		public virtual string Name { get; set; }

		public virtual string PrimaryPhone { get; set; }

		public virtual string SecondaryPhone { get; set; }

		public virtual string IndentifyNumber { get; set; }

		public virtual DateTime? DateOfBirth { get; set; }

		public virtual bool Gender { get; set; }

		public virtual string Address { get; set; }

		public virtual string Email { get; set; }

		public virtual string Note { get; set; }

		public virtual Guid? NationId { get; set; }

		public DM_QuocGia Nation { get; set; }

		public virtual string NationString { get; set; }

		public virtual Guid? ProvinceId { get; set; }

		public DM_TinhThanh Province { get; set; }

		public virtual string ProvinceString { get; set; }

		public virtual Guid? DistrictId { get; set; }

		public DM_QuanHuyen District { get; set; }

		public virtual string DistrictString { get; set; }

		public virtual Guid? AreaId { get; set; }

		public virtual int? CareerId { get; set; }

		public DM_NgheNghiep Career { get; set; }

		public virtual string CareerString { get; set; }

		public virtual long? TargetOrganizationUnitId { get; set; }

		public OrganizationUnit TargetOrganizationUnit { get; set; }

		public virtual Guid? TargetServiceId { get; set; }

		public DM_HangHoa TargetService { get; set; }

		public virtual Guid? ImportDataId { get; set; }

		public ImportData ImportData { get; set; }

		public virtual string ImportCode { get; set; }

		public virtual Guid? CustomerId { get; set; }

		public DM_DoiTuong Customer { get; set; }

		public virtual string CustomerCode { get; set; }

		public virtual Guid DataGroup { get; set; }

		public virtual bool IsInUse { get; set; }

		public virtual Guid? DataSourceId { get; set; }

		public virtual string DataSource { get; set; }

		public virtual int DataType { get; set; }

		public virtual bool IsImported { get; set; }

		public virtual bool BelongsToSeller { get; set; }

		public virtual long? BelongsToSellerId { get; set; }

		public virtual string BelongsToSellerName { get; set; }

		public virtual DateTime? DataActiveTime { get; set; }

		public virtual long? ActivedByUserId { get; set; }

		public virtual string ActivedByUserName { get; set; }

		public virtual int? RecallType { get; set; }

		public virtual string RecalledBy { get; set; }

		public virtual string RecalledReason { get; set; }

		public virtual long? AuthorizedEmployeeId { get; set; }

		public virtual string AuthorizedEmployee { get; set; }

		public virtual long? AuthorizedOrganizationId { get; set; }

		public virtual string AuthorizedOrganization { get; set; }

		public virtual int? DataProcessStatusId { get; set; }

		public virtual string DataProcessStatus { get; set; }

		public virtual bool IsRecalled { get; set; }

		public virtual string AuthorizedOrganizations { get; set; }

		public virtual string TargetOrganizationName { get; set; }

		public virtual string TargetServiceName { get; set; }

		public virtual DateTime LastChangeStatusTime { get; set; }

		public virtual string ConsultingFiles { get; set; }

		public virtual DateTime? CurrentSchedule { get; set; }
	}

}
