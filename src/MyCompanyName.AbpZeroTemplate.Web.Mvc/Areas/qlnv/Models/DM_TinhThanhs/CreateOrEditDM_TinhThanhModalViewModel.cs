using MyCompanyName.AbpZeroTemplate.crmdemo.Categories.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyCompanyName.AbpZeroTemplate.Web.Areas.qlnv.Models.DM_TinhThanhs
{
	public class CreateOrEditDM_TinhThanhModalViewModel
	{
		public CreateOrEditDM_TinhThanhDto DM_TinhThanh { get; set; }

		public string DM_QuocGiaTenNuoc { get; set; }

		public string DM_VungMienTenVung { get; set; }

		public bool IsEditMode => DM_TinhThanh.Id.HasValue;
	}

}
