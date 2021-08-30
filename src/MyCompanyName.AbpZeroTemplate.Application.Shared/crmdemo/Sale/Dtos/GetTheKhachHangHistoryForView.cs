using System;
using Abp.Application.Services.Dto;

namespace MyCompanyName.AbpZeroTemplate.crmdemo.Sale.Dtos
{
	public class GetTheKhachHangHistoryForView : PagedAndSortedResultRequestDto
	{
		public string Id { get; set; }

		public string Filter { get; set; }

		public string Name { get; set; }

		public string Content { get; set; }

		public string NgayDate { get; set; }

		public Guid? ID_TheKhachHang { get; set; }
	}
}
