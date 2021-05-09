using System;
using Abp.Application.Services.Dto;

namespace MyCompanyName.AbpZeroTemplate.MyCompanyName.AbpZeroTemplate.DM_NhomDoiTuongs.Dtos
{
    public class DM_NhomDoiTuongsDto : EntityDto<Guid>
    {
        public int LoaiDoiTuong { get; set; }

        public string MaNhom { get; set; }

        public string TenNhom { get; set; }

        public double MucDiem { get; set; }

        public string GhiChu { get; set; }

        public string UserTao { get; set; }

        public DateTime? NgayTao { get; set; }

        public string UserSuaCuoi { get; set; }

        public DateTime? NgaySuaCuoi { get; set; }

        public DateTime CreationTime { get; set; }

        public DateTime? LastModificationTime { get; set; }

        public bool IsDeleted { get; set; }

        public DateTime? DeletionTime { get; set; }

    }
}