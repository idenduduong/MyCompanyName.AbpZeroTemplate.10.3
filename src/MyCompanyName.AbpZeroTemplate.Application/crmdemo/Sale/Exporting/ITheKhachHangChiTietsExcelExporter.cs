// crmdemo.Sale.Exporting.ITheKhachHangChiTietsExcelExporter
using System.Collections.Generic;
using MyCompanyName.AbpZeroTemplate.crmdemo.Dto;
using MyCompanyName.AbpZeroTemplate.crmdemo.Sale.Dtos;
using MyCompanyName.AbpZeroTemplate.Dto;

namespace MyCompanyName.AbpZeroTemplate.crmdemo.Sale.Exporting
{
	public interface ITheKhachHangChiTietsExcelExporter
	{
		FileDto ExportToFile(List<GetTheKhachHangChiTietForView> theKhachHangChiTiets);
	}

}
