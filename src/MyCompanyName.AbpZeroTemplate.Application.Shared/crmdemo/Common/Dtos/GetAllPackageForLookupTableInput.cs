// crmdemo.Sale.Dtos.GetAllPackageForLookupTableInput
using MyCompanyName.AbpZeroTemplate.crmdemo.Common.Dtos;

namespace MyCompanyName.AbpZeroTemplate.crmdemo.Common.Dtos
{
	public class GetAllPackageForLookupTableInput : GetAllForLookupTableInput
	{
		public string CardCode { get; set; }

		public string CustomerNameFilter { get; set; }

		public string CustomerPhoneFilter { get; set; }
	}

}