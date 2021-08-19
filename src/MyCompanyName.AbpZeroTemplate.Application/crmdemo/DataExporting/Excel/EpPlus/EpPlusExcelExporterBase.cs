// crmdemo.DataExporting.Excel.EpPlus.EpPlusExcelExporterBase
using System;
using System.Collections.Generic;
using System.IO;
using Abp.Collections.Extensions;
using Abp.Dependency;
using MyCompanyName.AbpZeroTemplate.crmdemo;
using MyCompanyName.AbpZeroTemplate.crmdemo.Dto;
using MyCompanyName.AbpZeroTemplate.Dto;
using OfficeOpenXml;

namespace MyCompanyName.AbpZeroTemplate.crmdemo.DataExporting.Excel.EpPlus
{
	public abstract class EpPlusExcelExporterBase : AbpZeroTemplateAppServiceBase, ITransientDependency
	{
		public IAppFolders AppFolders { get; set; }

		protected FileDto CreateExcelPackage(string fileName, Action<ExcelPackage> creator)
		{
			FileDto file = new FileDto(fileName, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
			using (ExcelPackage excelPackage = new ExcelPackage())
			{
				creator(excelPackage);
				Save(excelPackage, file);
				return file;
			}
		}

		protected FileDto CreateExcelPackage(string fileName, ExcelPackage excelPackage)
		{
			FileDto file = new FileDto(fileName, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
			Save(excelPackage, file);
			return file;
		}

		protected void AddHeader(ExcelWorksheet sheet, params string[] headerTexts)
		{
			if (!headerTexts.IsNullOrEmpty())
			{
				for (int i = 0; i < headerTexts.Length; i++)
				{
					AddHeader(sheet, i + 1, headerTexts[i]);
				}
			}
		}

		protected void AddHeader(ExcelWorksheet sheet, int columnIndex, string headerText)
		{
			sheet.Cells[1, columnIndex].Value = headerText;
			sheet.Cells[1, columnIndex].Style.Font.Bold = true;
		}

		protected void AddObjects<T>(ExcelWorksheet sheet, int startRowIndex, IList<T> items, params Func<T, object>[] propertySelectors)
		{
			if (items.IsNullOrEmpty() || propertySelectors.IsNullOrEmpty())
			{
				return;
			}
			for (int i = 0; i < items.Count; i++)
			{
				for (int j = 0; j < propertySelectors.Length; j++)
				{
					sheet.Cells[i + startRowIndex, j + 1].Value = propertySelectors[j](items[i]);
				}
			}
		}

		protected void Save(ExcelPackage excelPackage, FileDto file)
		{
			string filePath = Path.Combine(AppFolders.TempFileDownloadFolder, file.FileToken);
			excelPackage.SaveAs(new FileInfo(filePath));
		}
	}

}
