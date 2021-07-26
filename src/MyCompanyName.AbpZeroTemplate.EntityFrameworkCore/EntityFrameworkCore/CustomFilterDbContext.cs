using Abp.Organizations;
using Abp.Runtime.Session;
using Abp.Zero.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using MyCompanyName.AbpZeroTemplate.Authorization.Roles;
using MyCompanyName.AbpZeroTemplate.Authorization.Users;
using MyCompanyName.AbpZeroTemplate.MultiTenancy;
using System;
using System.Linq;
using System.Linq.Expressions;

namespace MyCompanyName.AbpZeroTemplate.EntityFrameworkCore
{
    class CustomFilterDbContext : AbpZeroDbContext<Tenant, Role, User, CustomFilterDbContext>
    {
        //public DbSet<Document> Documents { get; set; }

        public IPrincipalAccessor PrincipalAccessor { get; set; }

        protected virtual int? CurrentOUId => GetCurrentUsersOuIdOrNull();

        public bool IsOUFilterEnabled { get; private set; }

        public CustomFilterDbContext(DbContextOptions<CustomFilterDbContext> options)
            : base(options)
        {

        }

        protected override bool ShouldFilterEntity<TEntity>(IMutableEntityType entityType)
        {
            if (typeof(IMayHaveOrganizationUnit).IsAssignableFrom(typeof(TEntity)))
            {
                return true;
            }
            return base.ShouldFilterEntity<TEntity>(entityType);
        }

        protected override Expression<Func<TEntity, bool>> CreateFilterExpression<TEntity>()
        {
            var expression = base.CreateFilterExpression<TEntity>();
            if (typeof(IMayHaveOrganizationUnit).IsAssignableFrom(typeof(TEntity)))
            {
                Expression<Func<TEntity, bool>> mayHaveOUFilter = e => ((IMayHaveOrganizationUnit)e).OrganizationUnitId == CurrentOUId || (((IMayHaveOrganizationUnit)e).OrganizationUnitId == CurrentOUId) == IsOUFilterEnabled;
                expression = expression == null ? mayHaveOUFilter : CombineExpressions(expression, mayHaveOUFilter);
            }

            return expression;
        }

        protected virtual int? GetCurrentUsersOuIdOrNull()
        {
            var userOuClaim = PrincipalAccessor.Principal?.Claims.FirstOrDefault(c => c.Type == "Application_OrganizationUnitId");
            if (string.IsNullOrEmpty(userOuClaim?.Value))
            {
                return null;
            }

            return Convert.ToInt32(userOuClaim.Value);
        }
    }
}
