using System;
using System.Collections.Generic;
using System.Text;

namespace MyCompanyName.AbpZeroTemplate.crmdemo.Categories.Dtos
{
	public class DM_HangHoaLookupTableDto
	{
		public string Id { get; set; }

		public string DisplayName { get; set; }

		public int? ThoiGianThucHien { get; set; }

		public string Code { get; set; }

		public double? DonGia { get; set; }

		public string TenNhom { get; set; }
	}
}
