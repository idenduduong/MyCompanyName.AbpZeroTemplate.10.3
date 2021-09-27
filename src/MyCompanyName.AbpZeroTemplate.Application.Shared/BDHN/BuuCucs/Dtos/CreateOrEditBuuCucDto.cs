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

        public string? Address { get; set; }

        //[Required]
        //public string? POSTypeCode { get; set; }

        public string? Tel { get; set; }

        public Guid? ProvinceId { get; set; }

        [Required]
        public string ProvinceCode { get; set; }

        public Guid? CommuneId { get; set; }

        [Required]
        public string CommuneCode { get; set; }

        public Guid? UnitId { get; set; }

        public string UnitCode { get; set; }

        public long? OrganizationUnitId { get; set; }
    }
}