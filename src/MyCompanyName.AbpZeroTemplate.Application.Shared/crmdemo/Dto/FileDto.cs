// crmdemo.Dto.FileDto
using System;
using System.ComponentModel.DataAnnotations;

namespace MyCompanyName.AbpZeroTemplate.crmdemo.Dto
{

	public class CrmFileDto
	{
		[Required]
		public string FileName { get; set; }

		[Required]
		public string FileType { get; set; }

		[Required]
		public string FileToken { get; set; }

		public CrmFileDto()
		{

		}

		public CrmFileDto(string fileName, string fileType)
		{
			FileName = fileName;
			FileType = fileType;
			FileToken = Guid.NewGuid().ToString("N");
		}
	}

}
