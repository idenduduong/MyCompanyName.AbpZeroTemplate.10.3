using System.Text.RegularExpressions;
using Abp.Extensions;

namespace Abp.AspNetZeroCore.Validation
{
	public static class ValidationHelper
	{
		public const string EmailRegex = "^\\w+([-+.']\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$";

		public static bool IsEmail(string value)
		{
			if (StringExtensions.IsNullOrEmpty(value))
			{
				return false;
			}
			return new Regex("^\\w+([-+.']\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$").IsMatch(value);
		}
	}
}
