using MyCompanyName.Localization;
using Volo.Abp.Authorization.Permissions;
using Volo.Abp.Localization;

namespace MyCompanyName.Permissions
{
    public class MyCompanyNamePermissionDefinitionProvider : PermissionDefinitionProvider
    {
        public override void Define(IPermissionDefinitionContext context)
        {
            var myGroup = context.AddGroup(MyCompanyNamePermissions.GroupName);

            //Define your own permissions here. Example:
            //myGroup.AddPermission(MyCompanyNamePermissions.MyPermission1, L("Permission:MyPermission1"));
        }

        private static LocalizableString L(string name)
        {
            return LocalizableString.Create<MyCompanyNameResource>(name);
        }
    }
}
