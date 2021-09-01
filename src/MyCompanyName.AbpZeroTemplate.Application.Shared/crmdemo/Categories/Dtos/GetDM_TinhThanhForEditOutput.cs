using System;
using System.Collections.Generic;
using System.Text;

namespace MyCompanyName.AbpZeroTemplate.crmdemo.Categories.Dtos
{
	public class GetDM_TinhThanhForEditOutput
	{
		public CreateOrEditDM_TinhThanhDto DM_TinhThanh { get; set; }

		public string DM_QuocGiaTenNuoc { get; set; }

		public string DM_VungMienTenVung { get; set; }
	}
}
