using System.Collections.Generic;
using MyCompanyName.AbpZeroTemplate.crmdemo.Dto;
using MyCompanyName.AbpZeroTemplate.crmdemo.Sale.Dtos;
using MyCompanyName.AbpZeroTemplate.Dto;

namespace MyCompanyName.AbpZeroTemplate.crm.crmdemo.Sale.Exporting
{
	public interface ITheKhachHangsExcelExporter
	{
		FileDto ExportToFile(List<GetTheKhachHangForView> theKhachHangs);
	}
}
