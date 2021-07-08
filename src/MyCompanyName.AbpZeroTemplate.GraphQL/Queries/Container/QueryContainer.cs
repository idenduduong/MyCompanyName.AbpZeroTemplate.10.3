using Abp.Dependency;
using GraphQL.Types;

namespace MyCompanyName.AbpZeroTemplate.Queries.Container
{
    //  datdd
    public sealed class QueryContainer : ObjectGraphType, ITransientDependency
    {
        public QueryContainer(RoleQuery roleQuery, UserQuery userQuery, OrganizationUnitQuery organizationUnitQuery, AuditLogQuery auditLogQuery)
        //public QueryContainer(RoleQuery roleQuery, UserQuery userQuery, OrganizationUnitQuery organizationUnitQuery)
        {
            AddField(roleQuery.GetFieldType());

            AddField(organizationUnitQuery.GetFieldType());

            AddField(userQuery.GetFieldType());

            AddField(auditLogQuery.GetFieldType());
        }
    }
}