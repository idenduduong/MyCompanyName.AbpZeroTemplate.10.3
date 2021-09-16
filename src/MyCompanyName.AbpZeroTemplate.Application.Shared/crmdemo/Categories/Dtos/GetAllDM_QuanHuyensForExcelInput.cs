using System;

namespace MyCompanyName.AbpZeroTemplate.crmdemo.Categories.Dtos
{
    public class GetAllDM_QuanHuyensForExcelInput
    {
        public string Filter { get; set; }

        public string MaQuanHuyenFilter { get; set; }

        public string TenQuanHuyenFilter { get; set; }

        public string GhiChuFilter { get; set; }

        public string DM_TinhThanhTenTinhThanhFilter { get; set; }
    }

}
