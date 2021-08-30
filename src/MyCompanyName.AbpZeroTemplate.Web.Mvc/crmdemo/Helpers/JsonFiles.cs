// crmdemo.Web.Helpers.JsonFiles
using System.Collections.Generic;
using System.Linq;
using MyCompanyName.AbpZeroTemplate.Web.crmdemo.Helpers;

namespace MyCompanyName.AbpZeroTemplate.Web.crmdemo.Helpers
{
	public class JsonFiles
	{
		public ViewDataUploadFilesResult[] files;

		public string TempFolder { get; set; }

		public JsonFiles(List<ViewDataUploadFilesResult> filesList)
		{
			files = new ViewDataUploadFilesResult[filesList.Count];
			for (int i = 0; i < filesList.Count; i++)
			{
				files[i] = filesList.ElementAt(i);
			}
		}
	}
}
