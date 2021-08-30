// crmdemo.Categories.Dtos.GetDM_DoiTuongForEditOutput
using MyCompanyName.AbpZeroTemplate.crmdemo.Categories.Dtos;

namespace MyCompanyName.AbpZeroTemplate.crmdemo.Categories.Dtos
{
	public class GetDM_DoiTuongForEditOutput
	{
		public CreateOrEditDM_DoiTuongDto DM_DoiTuong { get; set; }

		public string DM_NhomDoiTuongTenNhom { get; set; }

		public string DM_TinhThanhTenTinhThanh { get; set; }

		public string DM_QuanHuyenTenQuanHuyen { get; set; }

		public string UserName { get; set; }

		public string NguonKhachHangTenNguonKhach { get; set; }

		public string NgheNghiepDisplayName { get; set; }

		public string DM_QuocGiaTenNuoc { get; set; }

		public string DM_TrangThaiTenTrangThai { get; set; }

		public string NguoiGioiThieu { get; set; }

		public string DonViThucHienDisplayName { get; set; }
	}

}
