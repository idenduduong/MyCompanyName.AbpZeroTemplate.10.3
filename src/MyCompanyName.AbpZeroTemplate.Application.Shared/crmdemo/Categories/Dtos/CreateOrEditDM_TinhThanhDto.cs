using Abp.Application.Services.Dto;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

//using Abp.AspNetCore.Mvc.UI.Bootstrap.TagHelpers.Form;

namespace MyCompanyName.AbpZeroTemplate.crmdemo.Categories.Dtos
{
	public class CreateOrEditDM_TinhThanhDto : FullAuditedEntityDto<Guid?>
	{
		[Display(Name = "Mã tỉnh thành")]
		[Required]
		public string MaTinhThanh { get; set; }

		[Display(Name = "Tên tỉnh thành")]
		[Required]
		public string TenTinhThanh { get; set; }

		[Display(Name = "Ghi chú")]
		[StringLength(2000)]
		public string GhiChu { get; set; }

		public Guid? ID_QuocGia { get; set; }

		public Guid? ID_VungMien { get; set; }
	}

}
