using Abp.AspNetCore.Mvc.Authorization;
using Abp.Domain.Repositories;
using Abp.UI;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Primitives;
using MyCompanyName.AbpZeroTemplate.Common;
using MyCompanyName.AbpZeroTemplate.crmdemo.Categories;
using MyCompanyName.AbpZeroTemplate.crmdemo.Categories.Dtos;
using MyCompanyName.AbpZeroTemplate.IO;
using MyCompanyName.AbpZeroTemplate.Storage;
using MyCompanyName.AbpZeroTemplate.Web.Areas.qlnv.Models.DM_DoiTuongs;
using MyCompanyName.AbpZeroTemplate.Web.Controllers;
using MyCompanyName.AbpZeroTemplate.Web.crmdemo.Helpers;
using MyCompanyName.AbpZeroTemplate.Web.Helpers;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace MyCompanyName.AbpZeroTemplate.Web.Areas.qlnv.Controllers
{
	[Area("qlnv")]
	//[AbpMvcAuthorize(new string[] { "Pages.DM_DoiTuongs" })]
	public class DM_DoiTuongsController : AbpZeroTemplateControllerBase
	{
		private readonly IDM_DoiTuongsAppService _dM_DoiTuongsAppService;

		private const int MaxDoiTuongImagePictureSize = 5242880;

		private readonly IAppFolders _appFolders;

		private readonly IBinaryObjectManager _binaryObjectManager;

		private readonly IHostingEnvironment _hostingEnvironment;

		private readonly IRepository<DM_DoiTuong, Guid> _dmDoiTuongRepository;

		private readonly ICommonLookupAppService _commonLookupAppService;

		private readonly string path = "/wwwroot/Temp/Downloads/";

		private string tempPath = "/" + DateTime.Now.Year + "/";

		private string serverMapPath = "~/wwwroot/Temp/Downloads/";

		private string StorageRoot;

		private string UrlBase = "/wwwroot/Temp/Downloads/";

		private string DeleteURL = "/crm/DM_DoiTuongs/DeleteFile/?file=";

		private string DeleteType = "GET";

		private FilesHelper filesHelper;

		public DM_DoiTuongsController(IHostingEnvironment hostingEnvironment, ICommonLookupAppService commonLookupAppService, IRepository<DM_DoiTuong, Guid> dmDoiTuongRepository, IDM_DoiTuongsAppService dM_DoiTuongsAppService, IAppFolders appFolders, IBinaryObjectManager binaryObjectManager)
		{
			_dM_DoiTuongsAppService = dM_DoiTuongsAppService;
			_appFolders = appFolders;
			_binaryObjectManager = binaryObjectManager;
			_dmDoiTuongRepository = dmDoiTuongRepository;
			_hostingEnvironment = hostingEnvironment;
			_commonLookupAppService = commonLookupAppService;
		}

		public ActionResult Index()
		{
			DM_DoiTuongsViewModel model = new DM_DoiTuongsViewModel
			{
				FilterText = ""
			};
			return View(model);
		}

		#region
		//[AbpMvcAuthorize(new string[] { "Pages.DM_DoiTuongs.Create", "Pages.DM_DoiTuongs.Edit" })]
		//public async Task<PartialViewResult> CreateOrEditModal(Guid? id)
		//{
		//	GetDM_DoiTuongForEditOutput getDM_DoiTuongForEditOutput;
		//	if (id.HasValue)
		//	{
		//		getDM_DoiTuongForEditOutput = await _dM_DoiTuongsAppService.GetDM_DoiTuongForEdit(new EntityDto<Guid>
		//		{
		//			Id = id.Value
		//		});
		//	}
		//	else
		//	{
		//		getDM_DoiTuongForEditOutput = new GetDM_DoiTuongForEditOutput
		//		{
		//			DM_DoiTuong = new CreateOrEditDM_DoiTuongDto()
		//		};
		//		getDM_DoiTuongForEditOutput.DM_DoiTuong.Ma = Guid.NewGuid();
		//		CustomOrganizationUnitDto currentOrg = await _commonLookupAppService.GetCurrentUserOrganization();
		//		if (currentOrg == null)
		//		{
		//			throw new UserFriendlyException("Thao tác không hợp lệ");
		//		}
		//		getDM_DoiTuongForEditOutput.DM_DoiTuong.ID_DonViQuanLy = currentOrg.Id;
		//		getDM_DoiTuongForEditOutput.DonViThucHienDisplayName = currentOrg.DisplayName;
		//	}
		//	CreateOrEditDM_DoiTuongModalViewModel viewModel = new CreateOrEditDM_DoiTuongModalViewModel
		//	{
		//		DM_DoiTuong = getDM_DoiTuongForEditOutput.DM_DoiTuong,
		//		DM_NhomDoiTuongTenNhom = getDM_DoiTuongForEditOutput.DM_NhomDoiTuongTenNhom,
		//		DM_TinhThanhTenTinhThanh = getDM_DoiTuongForEditOutput.DM_TinhThanhTenTinhThanh,
		//		DM_QuanHuyenTenQuanHuyen = getDM_DoiTuongForEditOutput.DM_QuanHuyenTenQuanHuyen,
		//		NgheNghiepDisplayName = getDM_DoiTuongForEditOutput.NgheNghiepDisplayName,
		//		UserName = getDM_DoiTuongForEditOutput.UserName,
		//		NguonKhachHangTenNguonKhach = getDM_DoiTuongForEditOutput.NguonKhachHangTenNguonKhach,
		//		DM_QuocGiaTenNuoc = getDM_DoiTuongForEditOutput.DM_QuocGiaTenNuoc,
		//		DM_TrangThaiTenTrangThai = getDM_DoiTuongForEditOutput.DM_TrangThaiTenTrangThai,
		//		NguoiGioiThieu = getDM_DoiTuongForEditOutput.NguoiGioiThieu,
		//		DonViQuanLyDisplayName = getDM_DoiTuongForEditOutput.DonViThucHienDisplayName
		//	};
		//	return PartialView("_CreateOrEditModal", viewModel);
		//}

		//[AbpMvcAuthorize(new string[] { "Pages.DM_DoiTuongs.Create", "Pages.DM_DoiTuongs.Edit" })]
		//public PartialViewResult DM_NhomDoiTuongLookupTableModal(Guid? id, string displayName)
		//{
		//	DM_NhomDoiTuongLookupTableViewModel viewModel = new DM_NhomDoiTuongLookupTableViewModel
		//	{
		//		Id = id.ToString(),
		//		DisplayName = displayName,
		//		FilterText = ""
		//	};
		//	return PartialView("_DM_NhomDoiTuongLookupTableModal", viewModel);
		//}

		//[AbpMvcAuthorize(new string[] { "Pages.DM_DoiTuongs.Create", "Pages.DM_DoiTuongs.Edit" })]
		//public PartialViewResult DM_TinhThanhLookupTableModal(Guid? id, string displayName)
		//{
		//	DM_TinhThanhLookupTableViewModel viewModel = new DM_TinhThanhLookupTableViewModel
		//	{
		//		Id = id.ToString(),
		//		DisplayName = displayName,
		//		FilterText = ""
		//	};
		//	return PartialView("_DM_TinhThanhLookupTableModal", viewModel);
		//}

		//[AbpMvcAuthorize(new string[] { "Pages.DM_DoiTuongs.Create", "Pages.DM_DoiTuongs.Edit" })]
		//public PartialViewResult DM_QuanHuyenLookupTableModal(Guid? id, Guid? iDTinhThanh, string displayName)
		//{
		//	DM_QuanHuyenLookupTableViewModel viewModel = new DM_QuanHuyenLookupTableViewModel
		//	{
		//		Id = id.ToString(),
		//		ID_TinhThanh = iDTinhThanh.ToString(),
		//		DisplayName = displayName,
		//		FilterText = ""
		//	};
		//	return PartialView("_DM_QuanHuyenLookupTableModal", viewModel);
		//}

		//[AbpMvcAuthorize(new string[] { "Pages.DM_DoiTuongs.Create", "Pages.DM_DoiTuongs.Edit" })]
		//public PartialViewResult UserLookupTableModal(long? id, string displayName)
		//{
		//	UserLookupTableViewModel viewModel = new UserLookupTableViewModel
		//	{
		//		Id = id,
		//		DisplayName = displayName,
		//		FilterText = ""
		//	};
		//	return PartialView("_UserLookupTableModal", viewModel);
		//}

		//[AbpMvcAuthorize(new string[] { "Pages.DM_DoiTuongs.Create", "Pages.DM_DoiTuongs.Edit" })]
		//public PartialViewResult NguonKhachHangLookupTableModal(Guid? id, string displayName)
		//{
		//	NguonKhachHangLookupTableViewModel viewModel = new NguonKhachHangLookupTableViewModel
		//	{
		//		Id = id.ToString(),
		//		DisplayName = displayName,
		//		FilterText = ""
		//	};
		//	return PartialView("_NguonKhachHangLookupTableModal", viewModel);
		//}

		//[AbpMvcAuthorize(new string[] { "Pages.DM_DoiTuongs.Create", "Pages.DM_DoiTuongs.Edit" })]
		//public PartialViewResult DM_QuocGiaLookupTableModal(Guid? id, string displayName)
		//{
		//	DM_QuocGiaLookupTableViewModel viewModel = new DM_QuocGiaLookupTableViewModel
		//	{
		//		Id = id.ToString(),
		//		DisplayName = displayName,
		//		FilterText = ""
		//	};
		//	return PartialView("_DM_QuocGiaLookupTableModal", viewModel);
		//}

		//[AbpMvcAuthorize(new string[] { "Pages.DM_DoiTuongs.Create", "Pages.DM_DoiTuongs.Edit" })]
		//public PartialViewResult DM_NgheNghiepLookupTableModal(Guid? id, string displayName)
		//{
		//	DM_QuocGiaLookupTableViewModel viewModel = new DM_QuocGiaLookupTableViewModel
		//	{
		//		Id = id.ToString(),
		//		DisplayName = displayName,
		//		FilterText = ""
		//	};
		//	return PartialView("_DM_QuocGiaLookupTableModal", viewModel);
		//}

		//[AbpMvcAuthorize(new string[] { "Pages.DM_DoiTuongs.Create", "Pages.DM_DoiTuongs.Edit" })]
		//public PartialViewResult DM_TrangThaiLookupTableModal(int? id, string displayName)
		//{
		//	DM_TrangThaiLookupTableViewModel viewModel = new DM_TrangThaiLookupTableViewModel
		//	{
		//		Id = id,
		//		DisplayName = displayName,
		//		FilterText = ""
		//	};
		//	return PartialView("_DM_TrangThaiLookupTableModal", viewModel);
		//}

		//[AbpMvcAuthorize(new string[] { "Pages.DM_DoiTuongs.Create", "Pages.DM_DoiTuongs.Edit" })]
		//public PartialViewResult DM_DoiTuongSelfLookupTableModal(int? id, string displayName, Guid? currentId)
		//{
		//	DM_DoiTuongSelfLookupTableViewModel viewModel = new DM_DoiTuongSelfLookupTableViewModel
		//	{
		//		Id = id,
		//		DisplayName = displayName,
		//		CurrentId = currentId,
		//		FilterText = ""
		//	};
		//	return PartialView("_DM_DoiTuongSelfLookupTableModal", viewModel);
		//}

		//[AbpMvcAuthorize(new string[] { "Pages.DM_DoiTuongs.Create", "Pages.DM_DoiTuongs.Edit" })]
		//public PartialViewResult OrganizationUnitLookupTableModal(long? id, string displayName)
		//{
		//	OrganizationUnitLookupTableViewModel viewModel = new OrganizationUnitLookupTableViewModel
		//	{
		//		Id = id,
		//		DisplayName = displayName,
		//		FilterText = ""
		//	};
		//	return PartialView("_OrganizationUnitLookupTableModal", viewModel);
		//}

		//[AbpMvcAuthorize(new string[] { "Pages.DM_DoiTuongs.Create", "Pages.DM_DoiTuongs.Edit" })]
		//public PartialViewResult ChangeImageModal(Guid? id)
		//{
		//	base.ViewBag.DoiTuongId = id;
		//	return PartialView("_ChangeImageModal");
		//}

		//public UploadHangHoaImageOutput UploadDoiTuongImage()
		//{
		//	try
		//	{
		//		IFormFile doiTuongImageFile = base.Request.Form.Files.First();
		//		StringValues doiTuongId = base.Request.Form["dM_DoiTuongId"];
		//		if (doiTuongImageFile == null)
		//		{
		//			throw new UserFriendlyException(L("ProfilePicture_Change_Error"));
		//		}
		//		if (doiTuongImageFile.Length > 5242880)
		//		{
		//			throw new UserFriendlyException(L("ProfilePicture_Warn_SizeLimit", 5));
		//		}
		//		byte[] fileBytes;
		//		using (Stream stream = doiTuongImageFile.OpenReadStream())
		//		{
		//			fileBytes = stream.GetAllBytes();
		//		}
		//		if (!ImageFormatHelper.GetRawImageFormat(fileBytes).IsIn(ImageFormat.Jpeg, ImageFormat.Png, ImageFormat.Gif))
		//		{
		//			throw new Exception("Uploaded file is not an accepted image file !");
		//		}
		//		AppFileHelper.DeleteFilesInFolderIfExists(_appFolders.TempFileDownloadFolder, "doiTuongImage_" + doiTuongId);
		//		FileInfo fileInfo = new FileInfo(doiTuongImageFile.FileName);
		//		string tempFileName = string.Concat("doiTuongImage_", doiTuongId, fileInfo.Extension);
		//		string tempFilePath = Path.Combine(_appFolders.TempFileDownloadFolder, tempFileName);
		//		System.IO.File.WriteAllBytes(tempFilePath, fileBytes);
		//		using Bitmap bmpImage = new Bitmap(tempFilePath);
		//		return new UploadHangHoaImageOutput
		//		{
		//			FileName = tempFileName,
		//			Width = bmpImage.Width,
		//			Height = bmpImage.Height
		//		};
		//	}
		//	catch (UserFriendlyException ex)
		//	{
		//		return new UploadHangHoaImageOutput(new ErrorInfo(ex.Message));
		//	}
		//}

		//public async Task<FileResult> GetDoiTuongImageByDoiTuongId(string doiTuongId)
		//{
		//	if (string.IsNullOrEmpty(doiTuongId))
		//	{
		//		return GetDefaultDoiTuongImage();
		//	}
		//	return File(Convert.FromBase64String((await _dM_DoiTuongsAppService.GetDoiTuongImage(Guid.Parse(doiTuongId))).Image), "image/jpeg");
		//}

		//public async Task<FileResult> GetDoiTuongImageById(string id = "")
		//{
		//	if (id.IsNullOrEmpty())
		//	{
		//		return GetDefaultDoiTuongImage();
		//	}
		//	return await GetDoiTuongImageById(Guid.Parse(id));
		//}

		//private FileResult GetDefaultDoiTuongImage()
		//{
		//	return File("Common\\Images\\default-profile-picture.png", "image/png");
		//}

		//private async Task<FileResult> GetDoiTuongImageById(Guid profilePictureId)
		//{
		//	BinaryObject file = await _binaryObjectManager.GetOrNullAsync(profilePictureId);
		//	if (file == null)
		//	{
		//		return GetDefaultDoiTuongImage();
		//	}
		//	return File(file.Bytes, "image/jpeg");
		//}

		//[HttpGet]
		//[DontWrapResult]
		//public JsonResult GetFileList(Guid? id)
		//{
		//	JsonSerializerSettings sa = new JsonSerializerSettings();
		//	if (id != Guid.Empty)
		//	{
		//		StorageRoot = Path.Combine(_hostingEnvironment.ContentRootPath, "/wwwroot/Temp/Downloads/".Substring(1).Replace('/', '\\'));
		//		filesHelper = new FilesHelper(DeleteURL, DeleteType, StorageRoot, UrlBase, tempPath, serverMapPath);
		//		JsonFiles list = GetAllFileList(id);
		//		return Json(list, sa);
		//	}
		//	return Json(null);
		//}

		//[HttpGet]
		//public JsonResult DeleteFile(string file)
		//{
		//	StorageRoot = Path.Combine(_hostingEnvironment.ContentRootPath, "/wwwroot/Temp/Downloads/".Substring(1).Replace('/', '\\'));
		//	filesHelper = new FilesHelper(DeleteURL, DeleteType, StorageRoot, UrlBase, tempPath, serverMapPath);
		//	JsonSerializerSettings sa = new JsonSerializerSettings();
		//	filesHelper.DeleteFile(file);
		//	return Json("OK", sa);
		//}

		//[HttpPost]
		//[DontWrapResult]
		//public JsonResult Upload(CreateOrEditDM_DoiTuongDto model)
		//{
		//	StorageRoot = Path.Combine(_hostingEnvironment.ContentRootPath, "/wwwroot/Temp/Downloads/".Substring(1).Replace('/', '\\'));
		//	filesHelper = new FilesHelper(DeleteURL, DeleteType, StorageRoot, UrlBase, tempPath, serverMapPath);
		//	List<ViewDataUploadFilesResult> resultList = new List<ViewDataUploadFilesResult>();
		//	try
		//	{
		//		IFormFileCollection file = base.Request.Form.Files;
		//		if (model.Ma == Guid.Empty)
		//		{
		//			model.Ma = default(Guid);
		//		}
		//		string ma = model.Ma.ToString();
		//		filesHelper.UploadAndShowResults(file, resultList, ma);
		//	}
		//	catch (Exception)
		//	{
		//	}
		//	if (resultList.Count <= 0)
		//	{
		//		return Json("Error ");
		//	}
		//	JsonFiles files = new JsonFiles(resultList);
		//	return Json(files);
		//}

		//public JsonFiles GetAllFileList(Guid? id)
		//{
		//	try
		//	{
		//		List<ViewDataUploadFilesResult> r = new List<ViewDataUploadFilesResult>();
		//		if (id != Guid.Empty)
		//		{
		//			string folderName = "";
		//			string filesName = "";
		//			string fullPath = Path.Combine(StorageRoot);
		//			DM_DoiTuong item = _dmDoiTuongRepository.Get(id.Value);
		//			if (!string.IsNullOrEmpty(item.FileDinhKems))
		//			{
		//				filesName = item.FileDinhKems.Split(';')[0].Split('/')[4];
		//				fullPath += item.FileDinhKems.Split(';')[0].Split('/')[3];
		//				folderName = item.FileDinhKems.Split(';')[0].Split('/')[3];
		//				if (Directory.Exists(fullPath))
		//				{
		//					DirectoryInfo dir = new DirectoryInfo(fullPath);
		//					FileInfo[] files = dir.GetFiles();
		//					foreach (FileInfo file in files)
		//					{
		//						int SizeInt = (int)file.Length;
		//						r.Add(filesHelper.UploadResult(file.Name, SizeInt, file.FullName, folderName));
		//					}
		//				}
		//			}
		//		}
		//		return new JsonFiles(r);
		//	}
		//	catch (Exception)
		//	{
		//		return null;
		//	}
		//}
		#endregion
	}
}
