using Abp.Dependency;
using Abp.Modules;

namespace Abp.AspNetZeroCore
{
	public class AbpAspNetZeroCoreModule : AbpModule
	{
		public override void PreInitialize()
		{
			//((IIocRegistrar)((AbpModule)this).get_IocManager()).Register<AspNetZeroConfiguration>((DependencyLifeStyle)0);
			IocManager.Register<AspNetZeroConfiguration>(DependencyLifeStyle.Singleton);
		}

		public override void Initialize()
		{
			//((IIocRegistrar)((AbpModule)this).get_IocManager()).RegisterAssemblyByConvention(typeof(AbpAspNetZeroCoreModule).Assembly);
			IocManager.RegisterAssemblyByConvention(typeof(AbpAspNetZeroCoreModule).Assembly);
		}

		public override void PostInitialize()
		{
		}

		public AbpAspNetZeroCoreModule()
			: base()
		{
		}
	}
}
