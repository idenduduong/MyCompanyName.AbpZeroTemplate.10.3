using System;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Net.NetworkInformation;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Abp.Dependency;
using Abp.Json;
using Abp.Threading;
using Abp.Web.Models;
using Abp.Zero.Configuration;
using Castle.Core.Logging;
using Newtonsoft.Json;

namespace Abp.AspNetZeroCore.Licensing
{
	public sealed class AspNetZeroLicenseChecker : AspNetZeroBaseLicenseChecker, ISingletonDependency
	{
		private string _licenseCheckFilePath;

		private string _uniqueComputerId;

		public ILogger Logger { get; set; }

		public AspNetZeroLicenseChecker(AspNetZeroConfiguration configuration = null, IAbpZeroConfig abpZeroConfig = null, string configFilePath = "")
			: base(configuration, abpZeroConfig, configFilePath)
		{
			Logger = (ILogger)(object)NullLogger.Instance;
		}

		public void Check()
		{
			if (IsThereAReasonToNotCheck())
			{
				return;
			}
			Task.Run(async delegate
			{
				try
				{
					await CheckInternal();
				}
				catch (AspNetZeroLicenseException ex)
				{
					Console.WriteLine(ex.Message);
					Logger.Fatal(ex.Message, (Exception)ex);
					Environment.Exit(-42);
					throw;
				}
				catch (Exception ex2)
				{
					Console.WriteLine(ex2.Message);
					Logger.Warn(ex2.Message, ex2);
				}
			});
		}

		public void CheckSync()
		{
			try
			{
				AsyncHelper.RunSync((Func<Task>)CheckInternal);
			}
			catch (AspNetZeroLicenseException ex)
			{
				Console.WriteLine(ex.Message);
				Environment.Exit(-42);
			}
			catch (Exception ex2)
			{
				Console.WriteLine(ex2.Message);
			}
		}

		private async Task CheckInternal()
		{
			AspNetZeroLicenseChecker aspNetZeroLicenseChecker = this;
			try
			{
				aspNetZeroLicenseChecker._uniqueComputerId = GetUniqueComputerId();
				aspNetZeroLicenseChecker._licenseCheckFilePath = Path.Combine(Path.GetTempPath(), aspNetZeroLicenseChecker.GetHashedValue(aspNetZeroLicenseChecker.GetLicenseCode()) + ".tmp");
				aspNetZeroLicenseChecker.Logger.Debug(aspNetZeroLicenseChecker._licenseCheckFilePath);
			}
			catch
			{
				return;
			}
			try
			{
				if (!aspNetZeroLicenseChecker.IsProjectNameValid())
				{
					throw new AspNetZeroLicenseException("Failed to validate project name. Should not rename a project downloaded from aspnetzero.com. You can contact to info@aspnetzero.com if you are using a licensed product.");
				}
				if (aspNetZeroLicenseChecker.CheckedBefore())
				{
					return;
				}
			}
			catch (Exception ex)
			{
				aspNetZeroLicenseChecker.Logger.Fatal("Failed to validate project name. Should not rename a project downloaded from aspnetzero.com. You can contact to info@aspnetzero.com if you are using a licensed product." + Environment.NewLine + ex.Message, ex);
				Environment.Exit(-42);
			}
			await aspNetZeroLicenseChecker.ValidateLicenseOnServer();
		}

		private bool CheckedBefore()
		{
			if (!File.Exists(_licenseCheckFilePath))
			{
				return false;
			}
			string lastLicenseCheckDate = GetLastLicenseCheckDate();
			if (GetHashedValue(GetTodayAsString()) == lastLicenseCheckDate || GetHashedValue(GetLicenseExpiredString()) == lastLicenseCheckDate)
			{
				return true;
			}
			File.Delete(_licenseCheckFilePath);
			return false;
		}

		private bool IsProjectNameValid()
		{
			return CompareProjectName(GetHashedProjectName());
		}

		private string GetHashedProjectName()
		{
			return GetLicenseCode().Substring(GetLicenseCode().Length - 32, 32);
		}

		private async Task ValidateLicenseOnServer()
		{
			LicenseValidationResult obj = await ValidateLicense(GetLicenseCodeWithoutProjectNameHash());
			if (!obj.Success)
			{
				throw new AspNetZeroLicenseException();
			}
			if (obj.LastRequest)
			{
				MarkAsLastRequest();
			}
			else
			{
				UpdateLastLicenseCheckDate();
			}
		}

		private string GetLicenseCodeWithoutProjectNameHash()
		{
			return GetLicenseCode().Substring(0, GetLicenseCode().Length - 32);
		}

		private async Task<LicenseValidationResult> ValidateLicense(string licenseCode)
		{
			AspNetZeroLicenseChecker zeroLicenseChecker = this;
			LicenseValidationResult result;
			using (HttpClient httpClient = new HttpClient())
			{
				httpClient.BaseAddress = new Uri("https://www.aspnetzero.com/");
				httpClient.DefaultRequestHeaders.Accept.Clear();
				httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
				LicenseCheckInfo licenseInfo = new LicenseCheckInfo
				{
					LicenseCode = licenseCode,
					UniqueComputerId = zeroLicenseChecker._uniqueComputerId,
					ComputerName = GetComputerName(),
					ControlCode = Guid.NewGuid().ToString(),
					DateOfClient = DateTime.Now,
					ProjectAssemblyName = zeroLicenseChecker.GetAssemblyName(),
					LicenseController = zeroLicenseChecker.GetLicenseController()
				};
				HttpResponseMessage obj = await httpClient.PostAsync("LicenseManagement/CheckLicense", new StringContent(JsonExtensions.ToJsonString((object)licenseInfo, false, false), Encoding.UTF8, "application/json"));
				if (!obj.IsSuccessStatusCode)
				{
					throw new AbpException("Failed on license check");
				}
				AjaxResponse<LicenseValidationResult> val = JsonConvert.DeserializeObject<AjaxResponse<LicenseValidationResult>>(await obj.Content.ReadAsStringAsync());
				//if (!((AjaxResponseBase)val).get_Success() || val.get_Result() == null)
				if (!((AjaxResponseBase)val).Success || val.Result == null)
				{
					//ErrorInfo error = ((AjaxResponseBase)val).get_Error();
					ErrorInfo error = ((AjaxResponseBase)val).Error;
					//string text = ((error != null && error.get_Message() != null) ? error.get_Message() : "Failed on license check");
					string text = ((error != null && error.Message != null) ? error.Message : "Failed on license check");
					throw new AbpException(text);
				}
				//if (zeroLicenseChecker.GetHashedValue(licenseInfo.ControlCode) != val.get_Result().ControlCode)
				if (zeroLicenseChecker.GetHashedValue(licenseInfo.ControlCode) != val.Result.ControlCode)
				{
					throw new AspNetZeroLicenseException("Failed on license check");
				}
				//result = val.get_Result();
				result = val.Result;
			}
			return result;
		}

		private void UpdateLastLicenseCheckDate()
		{
			File.WriteAllText(_licenseCheckFilePath, GetHashedValue(GetTodayAsString()));
		}

		private void MarkAsLastRequest()
		{
			File.WriteAllText(_licenseCheckFilePath, GetHashedValue(GetLicenseExpiredString()));
		}

		private string GetLastLicenseCheckDate()
		{
			return File.ReadAllText(_licenseCheckFilePath);
		}

		private static string GetUniqueComputerId()
		{
			return (from nic in NetworkInterface.GetAllNetworkInterfaces()
				where nic.OperationalStatus == OperationalStatus.Up
				select nic.GetPhysicalAddress().ToString()).FirstOrDefault();
		}

		private static string GetComputerName()
		{
			return Environment.MachineName;
		}

		private static string GetTodayAsString()
		{
			return DateTime.Now.ToString("yyyy-MM-dd");
		}

		private string GetHashedValue(string str)
		{
			MD5CryptoServiceProvider mD5CryptoServiceProvider = new MD5CryptoServiceProvider();
			try
			{
				return EncodeBase64(((HashAlgorithm)(object)mD5CryptoServiceProvider).ComputeHash(Encoding.UTF8.GetBytes(str + _uniqueComputerId + GetSalt())));
			}
			finally
			{
				((IDisposable)(object)mD5CryptoServiceProvider)?.Dispose();
			}
		}

		protected override string GetSalt()
		{
			return StringGeneratorFromInteger(new int[20]
			{
				1040716, 800845, 530130, 1070016, 1150778, 561680, 610543, 1100661, 850465, 701962,
				720252, 450500, 1041016, 580023, 1060241, 670061, 1190528, 580670, 620222, 1070077
			});
		}

		private static string GetLicenseExpiredString()
		{
			return StringGeneratorFromInteger(new int[29]
			{
				1400382, 1103131, 973808, 360813, 1240081, 1210727, 1092451, 1070315, 1281862, 1270461,
				400917, 1310564, 1760086, 1220024, 1471866, 1142506, 1020320, 622427, 1591867, 630063,
				1160906, 320602, 1101332, 1240054, 1140016, 480081, 1160031, 1260050, 1540058
			});
		}

		private static string StringGeneratorFromInteger(int[] letters)
		{
			string text = "";
			char[] array = new char[letters.Length];
			int[] array2 = new int[letters.Length];
			int num = 0;
			foreach (int num2 in letters)
			{
				for (int j = 0; j < num; j++)
				{
					array2[j]--;
					if (array2[j] == 0)
					{
						text += array[j];
						for (int k = j; k < num; k++)
						{
							array2[k]--;
						}
						j = -1;
					}
				}
				int num3 = num2 / 10000 - num2 % 100 / 10 - num2 % 10 * (num2 % 100 / 10);
				int num4 = num2 % 10000 / 100;
				if (num4 != 0)
				{
					array[num] = (char)num3;
					array2[num] = num4;
					num++;
				}
				text += (char)num3;
			}
			for (int l = 0; l < num; l++)
			{
				array2[l]--;
				if (array2[l] == 0)
				{
					text += array[l];
					for (int m = l; m < num; m++)
					{
						array2[m]--;
					}
					l = -1;
				}
			}
			return text;
		}

		protected override string GetHashedValueWithoutUniqueComputerId(string str)
		{
			MD5CryptoServiceProvider mD5CryptoServiceProvider = new MD5CryptoServiceProvider();
			try
			{
				return EncodeBase64(((HashAlgorithm)(object)mD5CryptoServiceProvider).ComputeHash(Encoding.UTF8.GetBytes(str + GetSalt())));
			}
			finally
			{
				((IDisposable)(object)mD5CryptoServiceProvider)?.Dispose();
			}
		}

		private static string EncodeBase64(byte[] ba)
		{
			StringBuilder stringBuilder = new StringBuilder(ba.Length * 2);
			foreach (byte b in ba)
			{
				stringBuilder.AppendFormat("{0:x2}", b);
			}
			return stringBuilder.ToString();
		}
	}
}
