using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities.Auditing;
using Abp.Domain.Entities;
using Abp.Auditing;

namespace MyCompanyName.AbpZeroTemplate.MyCompanyName.AbpZeroTemplate.DM_NhomDoiTuongs
{
    [Table("DM_NhomDoiTuongs")]
    [Audited]
    public class DM_NhomDoiTuongs : Entity<Guid>, IMayHaveTenant
    {
        public int? TenantId { get; set; }

        [Required]
        public virtual int LoaiDoiTuong { get; set; }

        public virtual string MaNhom { get; set; }

        [Required]
        public virtual string TenNhom { get; set; }

        [Required]
        public virtual double MucDiem { get; set; }

        public virtual string GhiChu { get; set; }

        public virtual string UserTao { get; set; }

        public virtual DateTime? NgayTao { get; set; }

        public virtual string UserSuaCuoi { get; set; }

        public virtual DateTime? NgaySuaCuoi { get; set; }

        [Required]
        public virtual DateTime CreationTime { get; set; }

        public virtual DateTime? LastModificationTime { get; set; }

        [Required]
        public virtual bool IsDeleted { get; set; }

        public virtual DateTime? DeletionTime { get; set; }

    }
}