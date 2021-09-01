using MyCompanyName.AbpZeroTemplate.crmdemo.Categories.Dtos;
using MyCompanyName.AbpZeroTemplate.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyCompanyName.AbpZeroTemplate.crmdemo.Categories.Exporting
{
	public interface IDM_TinhThanhsExcelExporter
	{
		FileDto ExportToFile(List<GetDM_TinhThanhForView> dM_TinhThanhs);
	}

}
