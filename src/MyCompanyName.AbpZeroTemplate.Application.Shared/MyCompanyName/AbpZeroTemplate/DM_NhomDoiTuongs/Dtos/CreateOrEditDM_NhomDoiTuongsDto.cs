using System;
using Abp.Application.Services.Dto;
using System.ComponentModel.DataAnnotations;

namespace MyCompanyName.AbpZeroTemplate.MyCompanyName.AbpZeroTemplate.DM_NhomDoiTuongs.Dtos
{
    public class CreateOrEditDM_NhomDoiTuongsDto : EntityDto<Guid?>
    {

        [Required]
        public int LoaiDoiTuong { get; set; }

        public string MaNhom { get; set; }

        [Required]
        public string TenNhom { get; set; }

        [Required]
        public double MucDiem { get; set; }

        public string GhiChu { get; set; }

        public string UserTao { get; set; }

        public DateTime? NgayTao { get; set; }

        public string UserSuaCuoi { get; set; }

        public DateTime? NgaySuaCuoi { get; set; }

        [Required]
        public DateTime CreationTime { get; set; }

        public DateTime? LastModificationTime { get; set; }

        [Required]
        public bool IsDeleted { get; set; }

        public DateTime? DeletionTime { get; set; }

    }
}