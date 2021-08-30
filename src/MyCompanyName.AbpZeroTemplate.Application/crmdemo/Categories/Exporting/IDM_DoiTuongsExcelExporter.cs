// crmdemo.Categories.Exporting.IDM_DoiTuongsExcelExporter
using System.Collections.Generic;
using MyCompanyName.AbpZeroTemplate.crmdemo.Categories.Dtos;
using MyCompanyName.AbpZeroTemplate.crmdemo.Dto;
using MyCompanyName.AbpZeroTemplate.Dto;

namespace MyCompanyName.AbpZeroTemplate.crmdemo.Categories.Exporting
{
	public interface IDM_DoiTuongsExcelExporter
	{
		FileDto ExportToFile(List<GetDM_DoiTuongForView> dM_DoiTuongs);
	}

}
