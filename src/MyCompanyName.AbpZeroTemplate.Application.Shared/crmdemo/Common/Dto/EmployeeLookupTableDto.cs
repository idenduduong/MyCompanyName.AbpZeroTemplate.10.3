using System;
using System.Collections.Generic;
using System.Text;

namespace MyCompanyName.AbpZeroTemplate.crmdemo.Common.Dto
{
	public class EmployeeLookupTableDto
	{
		public long Id { get; set; }

		public string MaNhanVien { get; set; }

		public string TenNhanVien { get; set; }

		public long OrganizationId { get; set; }

		public string OrganizationName { get; set; }

		public double? PTChietKhau { get; set; }
	}

}
