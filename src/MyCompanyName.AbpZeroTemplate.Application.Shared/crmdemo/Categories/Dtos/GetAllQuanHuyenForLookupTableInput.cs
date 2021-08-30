// crmdemo.Categories.Dtos.GetAllQuanHuyenForLookupTableInput
using System;
using Abp.Application.Services.Dto;

namespace MyCompanyName.AbpZeroTemplate.crmdemo.Categories.Dtos
{
	public class GetAllQuanHuyenForLookupTableInput : PagedAndSortedResultRequestDto
	{
		public string Filter { get; set; }

		public Guid? ID_TinhThanh { get; set; }
	}
}
