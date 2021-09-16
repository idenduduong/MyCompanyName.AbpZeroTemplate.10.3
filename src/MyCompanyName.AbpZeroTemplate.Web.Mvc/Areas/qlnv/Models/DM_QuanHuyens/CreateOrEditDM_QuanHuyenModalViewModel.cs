using MyCompanyName.AbpZeroTemplate.crmdemo.Categories.Dtos;
using System;
using System.Linq;

namespace MyCompanyName.AbpZeroTemplate.Web.Areas.qlnv.Models.DM_QuanHuyens
{
    public class CreateOrEditDM_QuanHuyenModalViewModel
    {
        public CreateOrEditDM_QuanHuyenDto DM_QuanHuyen { get; set; }

        public string DM_TinhThanhTenTinhThanh { get; set; }

        public bool IsEditMode => DM_QuanHuyen.Id.HasValue;
    }
}
