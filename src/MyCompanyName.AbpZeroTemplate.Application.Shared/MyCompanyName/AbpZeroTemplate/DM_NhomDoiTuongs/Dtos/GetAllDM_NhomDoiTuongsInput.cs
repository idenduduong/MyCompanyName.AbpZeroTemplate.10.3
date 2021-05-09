using Abp.Application.Services.Dto;
using System;

namespace MyCompanyName.AbpZeroTemplate.MyCompanyName.AbpZeroTemplate.DM_NhomDoiTuongs.Dtos
{
    public class GetAllDM_NhomDoiTuongsInput : PagedAndSortedResultRequestDto
    {
        public string Filter { get; set; }

        public int? MaxLoaiDoiTuongFilter { get; set; }
        public int? MinLoaiDoiTuongFilter { get; set; }

        public string MaNhomFilter { get; set; }

        public string TenNhomFilter { get; set; }

        public double? MaxMucDiemFilter { get; set; }
        public double? MinMucDiemFilter { get; set; }

        public string GhiChuFilter { get; set; }

        public string UserTaoFilter { get; set; }

        public DateTime? MaxNgayTaoFilter { get; set; }
        public DateTime? MinNgayTaoFilter { get; set; }

        public string UserSuaCuoiFilter { get; set; }

        public DateTime? MaxNgaySuaCuoiFilter { get; set; }
        public DateTime? MinNgaySuaCuoiFilter { get; set; }

        public DateTime? MaxCreationTimeFilter { get; set; }
        public DateTime? MinCreationTimeFilter { get; set; }

        public DateTime? MaxLastModificationTimeFilter { get; set; }
        public DateTime? MinLastModificationTimeFilter { get; set; }

        public int? IsDeletedFilter { get; set; }

        public DateTime? MaxDeletionTimeFilter { get; set; }
        public DateTime? MinDeletionTimeFilter { get; set; }

    }
}