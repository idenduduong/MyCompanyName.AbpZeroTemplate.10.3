using System;
using Abp.Application.Services.Dto;
using System.ComponentModel.DataAnnotations;

namespace MyCompanyName.AbpZeroTemplate.BDHN.Dtos
{
    public class CreateOrEditBuuCucDto : FullAuditedEntityDto<Guid?>
    {
        [Required]
        public string POSCode { get; set; }

        [Required]
        public string POSName { get; set; }

        [Required]
        public string? Address { get; set; }

        //[Required]
        //public string? POSTypeCode { get; set; }

        public string? Tel { get; set; }

        [Required]
        public string? ProvinceCode { get; set; }

        [Required]
        public string? CommuneCode { get; set; }

        //public bool? IsOffline { get; set; }

        [Required]
        public string? UnitCode { get; set; }

        public long? OrganizationUnitId { get; set; }
    }
}