using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Abp.Auditing;
using Abp.Authorization;
using Abp.Domain.Repositories;
using GraphQL;
using GraphQL.Types;
using Microsoft.EntityFrameworkCore;
using MyCompanyName.AbpZeroTemplate.Core.Base;
using MyCompanyName.AbpZeroTemplate.Core.Extensions;
using MyCompanyName.AbpZeroTemplate.Dto;
using MyCompanyName.AbpZeroTemplate.Types;

namespace MyCompanyName.AbpZeroTemplate.Queries
{
    public class AuditLogQuery : AbpZeroTemplateQueryBase<ListGraphType<AuditLogType>, List<AuditLogDto>>
    {
        private readonly IRepository<AuditLog, long> _auditLogRepository;

        public static class Args
        {
            public const string UserId = "userId";
            public const string ServiceName = "serviceName";
        }

        public AuditLogQuery(IRepository<AuditLog, long> auditLogRepository)
        : base("auditLogs", new Dictionary<string, Type>
        {
     {Args.UserId, typeof(IdGraphType)},
     {Args.ServiceName, typeof(StringGraphType)}
        })
        {
            _auditLogRepository = auditLogRepository;
        }

        public override async Task<List<AuditLogDto>> Resolve(IResolveFieldContext context)
        {
            var query = _auditLogRepository.GetAll().Take(10).AsNoTracking();

            context
                .ContainsArgument<int>(Args.UserId, userId => query = query.Where(a => a.UserId == userId))
                .ContainsArgument<string>(Args.ServiceName, serviceName => query = query.Where(a => a.ServiceName == serviceName));

            return await ProjectToListAsync<AuditLogDto>(query);
        }
    }
}
