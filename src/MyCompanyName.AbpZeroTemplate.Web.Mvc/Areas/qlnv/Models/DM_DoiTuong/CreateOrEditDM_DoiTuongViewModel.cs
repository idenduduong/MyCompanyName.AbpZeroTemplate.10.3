using MyCompanyName.AbpZeroTemplate.DM_DoiTuongs.Dtos;

using Abp.Extensions;

namespace MyCompanyName.AbpZeroTemplate.Web.Areas.qlnv.Models.DM_DoiTuong
{
    public class CreateOrEditDM_DoiTuongModalViewModel
    {
        public CreateOrEditDM_DoiTuongDto DM_DoiTuong { get; set; }

        public bool IsEditMode => DM_DoiTuong.Id.HasValue;
    }
}