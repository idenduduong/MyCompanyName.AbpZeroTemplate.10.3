using Abp.Zero.Configuration;
using System.Diagnostics;

namespace Abp.AspNetZeroCore.Licensing
{
    public abstract class AspNetZeroBaseLicenseChecker
    {
        private readonly IAbpZeroConfig _abpZeroConfig;

        private string LicenseCode { get; }

        protected abstract string GetSalt();

        protected abstract string GetHashedValueWithoutUniqueComputerId(string str);

        protected AspNetZeroBaseLicenseChecker(AspNetZeroConfiguration configuration, IAbpZeroConfig abpZeroConfig, string configFilePath = "")
        {
            _abpZeroConfig = abpZeroConfig;
            LicenseCode = configuration.LicenseCode;
        }

        protected string GetLicenseCode()
        {
            return LicenseCode;
        }

        protected bool CompareProjectName(string hashedProjectName)
        {
            string[] array = GetAssemblyName().Split('.');
            for (int i = 0; i < array.Length; i++)
            {
                for (int j = 0; j <= i; j++)
                {
                    string text = array[i];
                    for (int num = i - 1; num > i - 1 - j; num--)
                    {
                        text = array[num] + "." + text;
                    }
                    if (hashedProjectName == GetHashedValueWithoutUniqueComputerId(text))
                    {
                        return true;
                    }
                }
            }
            return false;
        }

        protected string GetAssemblyName()
        {
            //return _abpZeroConfig.get_EntityTypes().get_User().Assembly.GetName().Name;
            return _abpZeroConfig.EntityTypes.User.Assembly.GetName().Name;
        }

        protected string GetLicenseController()
        {
            return "WebProject";
        }

        protected bool IsThereAReasonToNotCheck()
        {
            return Debugger.IsAttached;
        }
    }
}
