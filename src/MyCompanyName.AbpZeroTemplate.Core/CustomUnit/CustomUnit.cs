using Abp.Organizations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyCompanyName.AbpZeroTemplate.CustomUnits
{
    public class CustomUnit : OrganizationUnit
	{
		public virtual string UnitCode { get; set; }

		public virtual string Website { get; set; }

		public virtual string Address { get; set; }

		public virtual string TaxCode { get; set; }

		public virtual string AccountNumber { get; set; }

		public virtual string Phone { get; set; }

		public string Lineage { get; set; }

		public Guid? AreaId { get; set; }

		public string AreaName { get; set; }
	}
}
