// crmdemo.Organizations.Event.OrganizationUnitUpdateEvent
using Abp.Events.Bus;
namespace MyCompanyName.AbpZeroTemplate.crmdemo.Organizations.Event
{
	public class OrganizationUnitUpdateEvent : EventData
	{
		public long OrganizationId { get; set; }

		public string OrganizationCode { get; set; }

		public string OrganizationName { get; set; }
	}
}
