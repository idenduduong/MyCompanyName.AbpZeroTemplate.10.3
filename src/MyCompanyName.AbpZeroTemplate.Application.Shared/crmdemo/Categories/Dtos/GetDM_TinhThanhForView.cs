using System;
using System.Collections.Generic;
using System.Text;

namespace MyCompanyName.AbpZeroTemplate.crmdemo.Categories.Dtos
{
	public class GetDM_TinhThanhForView : DM_TinhThanhDto
	{
		public DM_TinhThanhDto DM_TinhThanh { get; set; }

		public string DM_QuocGiaTenNuoc { get; set; }

		public string DM_VungMienTenVung { get; set; }
	}

}
