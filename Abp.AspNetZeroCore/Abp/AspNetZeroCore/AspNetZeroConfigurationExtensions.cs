using Abp.Configuration.Startup;

namespace Abp.AspNetZeroCore
{
	public static class AspNetZeroConfigurationExtensions
	{
		public static AspNetZeroConfiguration AspNetZero(this IModuleConfigurations modules)
		{
			//return modules.get_AbpConfiguration().Get<AspNetZeroConfiguration>();
			return modules.AbpConfiguration.Get<AspNetZeroConfiguration>();
		}
	}
}
