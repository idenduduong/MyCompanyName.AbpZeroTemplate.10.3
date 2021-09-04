using Abp.Application.Services.Dto;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace MyCompanyName.AbpZeroTemplate.crmdemo.Categories.Dtos
{
    public class CreateOrEditDM_TinhThanhDto : FullAuditedEntityDto<Guid?>, IValidatableObject
    {
        [Display(Name = "Mã tỉnh thành")]
        [Required(AllowEmptyStrings = false, ErrorMessage = "Enter: Mã tỉnh thành")]
        public string MaTinhThanh { get; set; }

        [Display(Name = "Tên tỉnh thành")]
        [Required]
        public string TenTinhThanh { get; set; }

        [Display(Name = "Ghi chú")]
        [StringLength(2000)]
        public string GhiChu { get; set; }

        public Guid? ID_QuocGia { get; set; }

        public Guid? ID_VungMien { get; set; }

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            var results = new List<ValidationResult>();
            if (this.ID_VungMien != null)
            {
                Validator.TryValidateProperty(
                    this.ID_QuocGia,
                    new ValidationContext(this, null, null) { MemberName = "ID_QuocGia" },
                    results);
                Validator.TryValidateProperty(
                    this.ID_VungMien,
                    new ValidationContext(this, null, null) { MemberName = "ID_VungMien" },
                    results);

                // some other random test
                if (this.GhiChu == null) results.Add(new ValidationResult("GhiChu must not null"));
            }
            return results;
        }
    }
}
