using Abp.Application.Services.Dto;
using System;

namespace MyCompanyName.AbpZeroTemplate.ChildNamespace1.Dtos
{
    public class GetAllChildsForExcelInput
    {
        public string Filter { get; set; }

        public string ChildProp1Filter { get; set; }

        public string BaseEntityBaseProp1Filter { get; set; }

        public string UserNameFilter { get; set; }

        public int? BaseEntityIdFilter { get; set; }
    }
}