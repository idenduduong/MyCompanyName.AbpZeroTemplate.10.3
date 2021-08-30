// crmdemo.Sale.Event.TransactionCreattionEvent
using System;
using Abp.Events.Bus;

namespace MyCompanyName.AbpZeroTemplate.crmdemo.Sale.Event
{
	public class TransactionCreattionEvent : EventData
	{
		public Guid CustomerDataId { get; set; }

		public string CustomerCode { get; set; }

		public bool IsTrial { get; set; }

		public Guid CustomerId { get; set; }
	}
}
