using System;
using System.Collections.Generic;
using System.Text;

namespace MyCompanyName.AbpZeroTemplate.crmdemo.Categories.Dtos
{
	public class GetAllDM_TinhThanhsForExcelInput
	{
		public string Filter { get; set; }

		public string MaTinhThanhFilter { get; set; }

		public string TenTinhThanhFilter { get; set; }

		public string GhiChuFilter { get; set; }

		public string DM_QuocGiaTenNuocFilter { get; set; }

		public string DM_VungMienTenVungFilter { get; set; }
	}

}
