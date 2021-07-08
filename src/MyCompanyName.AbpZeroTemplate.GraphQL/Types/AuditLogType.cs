using GraphQL.Types;
using MyCompanyName.AbpZeroTemplate.Dto;

namespace MyCompanyName.AbpZeroTemplate.Types
{
    public class AuditLogType : ObjectGraphType<AuditLogDto>
    {
        public AuditLogType()
        {
            Field(x => x.Id);
            Field(x => x.UserId, nullable: true);
            Field(x => x.TenantId, nullable: true);
            Field(x => x.ExecutionTime);
            Field(x => x.ServiceName);
        }
    }
}
