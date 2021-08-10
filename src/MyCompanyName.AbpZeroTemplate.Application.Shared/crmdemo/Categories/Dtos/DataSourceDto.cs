// crmdemo.Categories.Dtos.DataSourceDto
using System;
using Abp.Application.Services.Dto;

namespace MyCompanyName.AbpZeroTemplate.crmdemo.Categories.Dtos
{
	public class DataSourceDto : EntityDto<Guid>
	{
		public string DisplayName { get; set; }

		public string Code { get; set; }

		public int Priority { get; set; }

		public bool IsActive { get; set; }
	}

}
