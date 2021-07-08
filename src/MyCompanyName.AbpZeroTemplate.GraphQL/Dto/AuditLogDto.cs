using System;
using Abp.Application.Services.Dto;
using Abp.Auditing;
using Abp.AutoMapper;

namespace MyCompanyName.AbpZeroTemplate.Dto
{
    [AutoMapFrom(typeof(AuditLog))]
    public class AuditLogDto : EntityDto<long>
    {
        public int? TenantId { get; set; }
        public long? UserId { get; set; }
        public string ServiceName { get; set; }
        public DateTime ExecutionTime { get; set; }
    }
}
