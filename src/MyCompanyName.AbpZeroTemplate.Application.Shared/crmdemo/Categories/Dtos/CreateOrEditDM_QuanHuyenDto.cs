using Abp.Application.Services.Dto;
using System;
using System.ComponentModel.DataAnnotations;

namespace MyCompanyName.AbpZeroTemplate.crmdemo.Categories.Dtos
{
    public class CreateOrEditDM_QuanHuyenDto : FullAuditedEntityDto<Guid?>
    {
        public string MaQuanHuyen { get; set; }

        [Required]
        public string TenQuanHuyen { get; set; }

        public string GhiChu { get; set; }

        public Guid? ID_TinhThanh { get; set; }
    }
}
