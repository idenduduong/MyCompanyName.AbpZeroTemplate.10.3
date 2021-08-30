// crmdemo.Categories.Dtos.UpdateDoiTuongImageInput
using System;
using System.ComponentModel.DataAnnotations;

namespace MyCompanyName.AbpZeroTemplate.crmdemo.Categories.Dtos
{
	public class UpdateDoiTuongImageInput
	{
		[Required]
		[MaxLength(400)]
		public string FileName { get; set; }

		public int X { get; set; }

		public int Y { get; set; }

		public int Width { get; set; }

		public int Height { get; set; }

		public Guid DM_DoiTuongId { get; set; }
	}

}
