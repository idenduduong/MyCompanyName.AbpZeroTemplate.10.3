// crmdemo.Categories.Dtos.GetDM_DoiTuongForView
using AutoMapper;
using MyCompanyName.AbpZeroTemplate.crmdemo.Categories.Dtos;
using System;

namespace MyCompanyName.AbpZeroTemplate.crmdemo.Categories.Dtos
{
	public class GetDM_DoiTuongForView
	{
		public DateTime? CreateTime { get; set; }

		public DateTime? LastModificationTime { get; set; }

		public DM_DoiTuongDto DM_DoiTuong { get; set; }

		public string DM_NhomDoiTuongTenNhom { get; set; }

		public string DM_TinhThanhTenTinhThanh { get; set; }

		public string DM_QuanHuyenTenQuanHuyen { get; set; }

		public string UserName { get; set; }

		public string NguonKhachHangTenNguonKhach { get; set; }

		public string DM_QuocGiaTenNuoc { get; set; }

		public string DM_TrangThaiTenTrangThai { get; set; }

		public string NguoiGioiThieu { get; set; }

		public string DonViQuanLy { get; set; }

		public string TenNguoiTao { get; set; }

		public string TenNguoiSuaCuoi { get; set; }

		public string NgheNghiepDisplayName { get; set; }
	}

	public class GetDM_DoiTuongForView2 : DM_DoiTuongDto
	{
		public DateTime? CreateTime { get; set; }

		//public DateTime? LastModificationTime { get; set; }
		
		public string DM_NhomDoiTuongTenNhom { get; set; }

		//public string TenNhom { get; set; }

		public string DM_TinhThanhTenTinhThanh { get; set; }

		public string DM_QuanHuyenTenQuanHuyen { get; set; }

		public string UserName { get; set; }

		public string NguonKhachHangTenNguonKhach { get; set; }

		public string DM_QuocGiaTenNuoc { get; set; }

		public string DM_TrangThaiTenTrangThai { get; set; }

		public string NguoiGioiThieu { get; set; }

		public string DonViQuanLy { get; set; }

		public string TenNguoiTao { get; set; }

		public string TenNguoiSuaCuoi { get; set; }

		public string NgheNghiepDisplayName { get; set; }
	}
}
