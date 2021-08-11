// crmdemo.Sale.Dtos.ValueCardLookupTableDto
using System;

namespace MyCompanyName.AbpZeroTemplate.crmdemo.Sale.Dtos
{
	public class ValueCardLookupTableDto
	{
		public Guid? CardId { get; set; }

		public string CardCode { get; set; }

		public string CustomerName { get; set; }

		public string CustomerPhone { get; set; }

		public decimal CardBalance { get; set; }
	}
}
