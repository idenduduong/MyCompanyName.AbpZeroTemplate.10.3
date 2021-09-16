using Abp.Application.Services.Dto;
using System;

namespace MyCompanyName.AbpZeroTemplate.crmdemo.Categories.Dtos
{
    public class DM_QuanHuyenDto : EntityDto<Guid>
    {
        public string MaQuanHuyen { get; set; }

        public string TenQuanHuyen { get; set; }

        public string GhiChu { get; set; }

        public string UserTao { get; set; }

        public DateTime? NgayTao { get; set; }

        public string UserSuaCuoi { get; set; }

        public DateTime? NgaySuaCuoi { get; set; }

        public Guid? ID_TinhThanh { get; set; }
    }

}
