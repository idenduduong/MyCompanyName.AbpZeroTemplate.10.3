// crmdemo.Sale.Dtos.DM_KhuyenMaiDto
using System;
using Abp.Application.Services.Dto;

namespace MyCompanyName.AbpZeroTemplate.crmdemo.Sale.Dtos
{
	public class DM_KhuyenMaiDto : EntityDto<Guid>
	{
		public string DisplayName { get; set; }

		public string Code { get; set; }

		public string SoQuyetDinh { get; set; }

		public bool IsPercentage { get; set; }
	}

}
