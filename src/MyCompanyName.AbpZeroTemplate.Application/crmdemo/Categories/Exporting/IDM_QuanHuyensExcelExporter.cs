using MyCompanyName.AbpZeroTemplate.crmdemo.Categories.Dtos;
using MyCompanyName.AbpZeroTemplate.Dto;
using System;
using System.Collections.Generic;
using System.Linq;

namespace MyCompanyName.AbpZeroTemplate.crmdemo.Categories.Exporting
{
    public interface IDM_QuanHuyensExcelExporter
    {
        FileDto ExportToFile(List<GetDM_QuanHuyenForView> dM_QuanHuyens);
    }

}
