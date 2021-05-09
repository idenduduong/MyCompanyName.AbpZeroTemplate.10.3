using MyCompanyName.AbpZeroTemplate.MyCompanyName.AbpZeroTemplate.DM_NhomDoiTuongs.Dtos;

using Abp.Extensions;

namespace MyCompanyName.AbpZeroTemplate.Web.Areas.AppAreaName.Models.DM_NhomDoiTuongs
{
    public class CreateOrEditDM_NhomDoiTuongsModalViewModel
    {
        public CreateOrEditDM_NhomDoiTuongsDto DM_NhomDoiTuongs { get; set; }

        public bool IsEditMode => DM_NhomDoiTuongs.Id.HasValue;
    }
}