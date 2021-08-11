// crmdemo.Sale.Dtos.GetAllValueCardForLookupTableInput
using MyCompanyName.AbpZeroTemplate.crmdemo.Common.Dtos;

namespace MyCompanyName.AbpZeroTemplate.crmdemo.Common.Dtos
{
	public class GetAllValueCardForLookupTableInput : GetAllForLookupTableInput
	{
		public string CardCode { get; set; }

		public string CustomerNameFilter { get; set; }

		public string CustomerPhoneFilter { get; set; }
	}
}
