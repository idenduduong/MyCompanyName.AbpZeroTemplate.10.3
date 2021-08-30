using System;
using System.Collections.Generic;
using System.Text;

namespace MyCompanyName.AbpZeroTemplate.crmdemo.Categories.Dtos
{
	public class GetImageOutput
	{
		public string Image { get; set; }

		public GetImageOutput(string image)
		{
			Image = image;
		}
	}
}
