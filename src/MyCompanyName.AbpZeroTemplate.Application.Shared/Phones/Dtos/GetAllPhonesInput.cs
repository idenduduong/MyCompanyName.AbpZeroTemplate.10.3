using Abp.Application.Services.Dto;
using System;

namespace MyCompanyName.AbpZeroTemplate.Phones.Dtos
{
    public class GetAllPhonesInput : PagedAndSortedResultRequestDto
    {
        public string Filter { get; set; }

        public int? MaxPhoneIdFilter { get; set; }

        public int? MinPhoneIdFilter { get; set; }

        public int? isDeleteFilter { get; set; }

        public string NameFilter { get; set; }

        public string MobileFilter { get; set; }

    }
}