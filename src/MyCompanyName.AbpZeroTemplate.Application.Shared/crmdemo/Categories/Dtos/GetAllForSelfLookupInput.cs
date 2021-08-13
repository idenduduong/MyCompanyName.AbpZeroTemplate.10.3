// crmdemo.Categories.Dtos.GetAllForSelfLookupInput<T>
using MyCompanyName.AbpZeroTemplate.crmdemo.Common.Dtos;

namespace MyCompanyName.AbpZeroTemplate.crmdemo.Categories.Dtos
{
	public class GetAllForSelfLookupInput<T> : GetAllForLookupTableInput
	{
		public T CurrentId { get; set; }
	}
}
