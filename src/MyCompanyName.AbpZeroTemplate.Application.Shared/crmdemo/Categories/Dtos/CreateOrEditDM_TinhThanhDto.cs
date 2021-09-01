using Abp.Application.Services.Dto;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace MyCompanyName.AbpZeroTemplate.crmdemo.Categories.Dtos
{
	public class CreateOrEditDM_TinhThanhDto : FullAuditedEntityDto<Guid?>
	{
		public string MaTinhThanh { get; set; }

		[Required]
		public string TenTinhThanh { get; set; }

		public string GhiChu { get; set; }

		public Guid? ID_QuocGia { get; set; }

		public Guid? ID_VungMien { get; set; }
	}

}
