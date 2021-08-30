// crmdemo.Sale.ImportData
using System;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities.Auditing;
using MyCompanyName.AbpZeroTemplate.Authorization.Users;
using MyCompanyName.AbpZeroTemplate.crmdemo.Categories;

namespace MyCompanyName.AbpZeroTemplate.crmdemo.Sale
{
	[Table("ImportDatas")]
	public class ImportData : FullAuditedEntity<Guid>
	{
		public virtual DateTime ImportTime { get; set; }

		public virtual string InputFile { get; set; }

		public virtual string OutputFile { get; set; }

		public virtual int DataType { get; set; }

		public virtual int TotalProcessedData { get; set; }

		public virtual int TotalSuccess { get; set; }

		public virtual int TotalInValid { get; set; }

		public virtual int TotalDupplicate { get; set; }

		public virtual int TotalIgnored { get; set; }

		public virtual string ImportCode { get; set; }

		public virtual long? ImportedBy { get; set; }

		public User Imported { get; set; }

		public virtual Guid? DataSourceId { get; set; }

		public DataSource DataSource { get; set; }
	}

}
