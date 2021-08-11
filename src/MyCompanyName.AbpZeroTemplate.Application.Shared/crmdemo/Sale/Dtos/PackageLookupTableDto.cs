// crmdemo.Sale.Dtos.PackageLookupTableDto
using System;

namespace MyCompanyName.AbpZeroTemplate.crmdemo.Sale.Dtos
{
	public class PackageLookupTableDto
	{
		public Guid? CardId { get; set; }

		public string CardCode { get; set; }

		public string CustomerName { get; set; }

		public string CustomerPhone { get; set; }

		public Guid? PackageId { get; set; }

		public string Package { get; set; }

		public int PackageRemainingQuantity { get; set; }
	}

}