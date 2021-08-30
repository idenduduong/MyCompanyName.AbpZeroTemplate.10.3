// crmdemo.Web.Helpers.FilesHelper
using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Web;
//using System.Web.Hosting;
using Microsoft.AspNetCore.Hosting;
using Abp.IO.Extensions;
using MyCompanyName.AbpZeroTemplate.crmdemo;
using MyCompanyName.AbpZeroTemplate.Web.crmdemo.Helpers;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Hosting.Internal;

namespace MyCompanyName.AbpZeroTemplate.Web.crmdemo.Helpers
{
	public class FilesHelper
	{
		private readonly IAppFolders _appFolders;

		private string DeleteURL;

		private string DeleteType;

		private string StorageRoot;

		private string UrlBase;

		private string tempPath;

		private string serverMapPath;

		public FilesHelper(string DeleteURL, string DeleteType, string StorageRoot, string UrlBase, string tempPath, string serverMapPath)
		{
			this.DeleteURL = DeleteURL;
			this.DeleteType = DeleteType;
			this.StorageRoot = StorageRoot;
			this.UrlBase = UrlBase.Replace("/wwwroot", "");
			this.tempPath = tempPath;
			this.serverMapPath = serverMapPath;
		}

		public void DeleteFiles(string pathToDelete)
		{
            string path = AppDomain.CurrentDomain.BaseDirectory; //HostingEnvironment.MapPath(pathToDelete);
            if (Directory.Exists(path))
            {
                DirectoryInfo di = new DirectoryInfo(path);
                FileInfo[] files = di.GetFiles();
                for (int i = 0; i < files.Length; i++)
                {
                    File.Delete(files[i].FullName);
                }
                di.Delete(recursive: true);
            }
        }

		public string DeleteFile(string file)
		{
			string fullPath = Path.Combine(StorageRoot, file);
			_ = "/" + file + ".80x80.jpg";
			string partThumb2 = Path.Combine(Path.Combine(StorageRoot, "thumbs"), file + ".80x80.jpg");
			if (File.Exists(fullPath))
			{
				if (File.Exists(partThumb2))
				{
					File.Delete(partThumb2);
				}
				try
				{
					File.Delete(fullPath);
				}
				catch (IOException)
				{
				}
				return "Ok";
			}
			return "Error Delete";
		}

		public JsonFiles GetFileList()
		{
			List<ViewDataUploadFilesResult> r = new List<ViewDataUploadFilesResult>();
			string fullPath = Path.Combine(StorageRoot);
			if (Directory.Exists(fullPath))
			{
				FileInfo[] files = new DirectoryInfo(fullPath).GetFiles();
				for (int i = 0; i < files.Length; i++)
				{
					_ = files[i].Length;
				}
			}
			return new JsonFiles(r);
		}

		public void UploadAndShowResults(IFormFileCollection ContentBase, List<ViewDataUploadFilesResult> resultList, string folderName)
		{
			string text = "wwwroot/Temp/Downloads/" + folderName;
			Directory.CreateDirectory(text);
			Directory.CreateDirectory(text + "/thumbs/");
			UploadWholeFile(ContentBase, resultList, folderName);
		}

		private void UploadWholeFile(IFormFileCollection request, List<ViewDataUploadFilesResult> statuses, string folderName)
		{
			foreach (IFormFile file in request)
			{
				string pathOnServer = Path.Combine(StorageRoot + folderName + "/");
				string fullPath = Path.Combine(pathOnServer, Path.GetFileName(file.FileName));
				UploadPartialFile(file.FileName, file, statuses, folderName);
				string[] imageArray = file.FileName.Split('.');
				if (imageArray.Length == 0)
				{
					continue;
				}
				string extansion = imageArray[imageArray.Length - 1];
				if (!(extansion != "jpg") || !(extansion != "png"))
				{
					string path = Path.Combine(pathOnServer, "thumbs");
					string fileThumb = file.FileName + ".120x120.jpg";
					string ThumbfullPath2 = Path.Combine(path, fileThumb);
					Image.FromFile(fullPath).GetThumbnailImage(120, 120, () => false, IntPtr.Zero).Save(ThumbfullPath2);
				}
			}
		}

		public void UploadPartialFile(string fileName, IFormFile file, List<ViewDataUploadFilesResult> statuses, string folderName)
		{
			using Stream inputStream = file.OpenReadStream();
			string fullName = Path.Combine(Path.Combine(StorageRoot + folderName + "/"), Path.GetFileName(file.FileName));
			Path.Combine(fullName, Path.GetFileName(file.FileName));
			try
			{
				File.WriteAllBytes(fullName, inputStream.GetAllBytes());
				ImageHandler imageHandler = new ImageHandler();
				Bitmap imagebit = ImageHandler.LoadImage(fullName);
				imageHandler.Save(imagebit, 1920, 1080, 50, fullName);
				using (FileStream fs = new FileStream(fullName, FileMode.Append, FileAccess.Write))
				{
					byte[] buffer = new byte[1024];
					for (int i = inputStream.Read(buffer, 0, 1024); i > 0; i = inputStream.Read(buffer, 0, 1024))
					{
						fs.Write(buffer, 0, i);
					}
					fs.Flush();
					fs.Close();
				}
				statuses.Add(UploadResult(file.FileName, (int)file.Length, file.FileName, folderName));
			}
			catch (Exception)
			{
			}
		}

		public ViewDataUploadFilesResult UploadResult(string FileName, int fileSize, string FileFullPath, string folderName)
		{
			string getType = "image/jpg";	//MimeMapping.GetMimeMapping(FileFullPath);
			return new ViewDataUploadFilesResult
			{
				name = FileName,
				size = fileSize,
				type = getType,
				url = UrlBase + folderName + "/" + FileName,
				deleteUrl = DeleteURL + folderName + "/" + FileName,
				thumbnailUrl = CheckThumb(getType, FileName, folderName),
				deleteType = DeleteType
			};
		}

		public string CheckThumb(string type, string FileName, string folderName)
		{
			if (type.Split('/').Length == 2)
			{
				string extansion = Path.GetExtension(FileName);
				if (extansion.Equals(".jpeg") || extansion.Equals(".jpg") || extansion.Equals(".png") || extansion.Equals(".gif"))
				{
					return UrlBase.Replace("/wwwroot", "") + folderName + "/thumbs/" + FileName + ".120x120.jpg";
				}
				if (extansion.Equals("octet-stream"))
				{
					return "/Content/Free-file-icons/48px/exe.png";
				}
				if (extansion.Contains("zip"))
				{
					return "/Common/Images/zip.png";
				}
				if (extansion.Contains("doc"))
				{
					return "/Common/Images/doc.png";
				}
				if (extansion.Contains("xls") || extansion.Contains("excel"))
				{
					return "/Common/Images/xls.png";
				}
				if (extansion.Contains("pdf"))
				{
					return "/Common/Images/pdf.png";
				}
				return "/Common/Images/png.png";
			}
			return UrlBase + folderName + "/thumbs/" + FileName + ".80x80.jpg";
		}

		public List<string> FilesList()
		{
            List<string> Filess = new List<string>();
			string path = AppDomain.CurrentDomain.BaseDirectory; // HostingEnvironment.MapPath(serverMapPath);
            if (Directory.Exists(path))
            {
                FileInfo[] files = new DirectoryInfo(path).GetFiles();
                foreach (FileInfo fi in files)
                {
                    Filess.Add(fi.Name);
                }
            }
            return Filess;
            return new List<string>();
		}
	}

}
