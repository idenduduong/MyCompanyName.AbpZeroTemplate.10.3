using Abp.Application.Services.Dto;
using System;
using System.Collections.Generic;
using System.Text;

namespace MyCompanyName.AbpZeroTemplate.crmdemo.Categories.Dtos
{
	public class DM_TinhThanhDto : EntityDto<Guid>
	{
		public string MaTinhThanh { get; set; }

		public string TenTinhThanh { get; set; }

		public string GhiChu { get; set; }

		public string UserTao { get; set; }

		public DateTime? NgayTao { get; set; }

		public string UserSuaCuoi { get; set; }

		public DateTime? NgaySuaCuoi { get; set; }

		public Guid? ID_QuocGia { get; set; }

		public Guid? ID_VungMien { get; set; }
	}

}
