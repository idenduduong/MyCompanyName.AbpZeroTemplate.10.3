using System;
using Abp.Application.Services.Dto;
using System.ComponentModel.DataAnnotations;

namespace MyCompanyName.AbpZeroTemplate.DM_DoiTuongs.Dtos
{
    public class GetDM_DoiTuongForEditOutput
    {
        public CreateOrEditDM_DoiTuongDto DM_DoiTuong { get; set; }

    }
}