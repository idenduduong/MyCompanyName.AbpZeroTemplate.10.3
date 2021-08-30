// crmdemo.CodeGenerateHelper.CodeGenerator
using System;
using System.Linq;

namespace MyCompanyName.AbpZeroTemplate.crmdemo.CodeGenerateHelper
{
	public static class CodeGenerator
	{
		public static string Genrerate(string trungTamCode, double orderNumber, string separator)
		{
			return string.Join(separator, trungTamCode, DateTime.Now.ToString("yyyy"), orderNumber.ToString("00000"));
		}

		public static string GetOrderNumber(string code, char separator)
		{
			return code.Split(separator).Last();
		}
	}

}
