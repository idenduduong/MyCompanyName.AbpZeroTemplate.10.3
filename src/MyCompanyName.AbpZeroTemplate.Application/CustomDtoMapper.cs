using MyCompanyName.AbpZeroTemplate.BaseNamespace.Dtos;
using MyCompanyName.AbpZeroTemplate.BaseNamespace;
using MyCompanyName.AbpZeroTemplate.ChildNamespace1.Dtos;
using MyCompanyName.AbpZeroTemplate.ChildNamespace1;
using MyCompanyName.AbpZeroTemplate.Products.Dtos;
using MyCompanyName.AbpZeroTemplate.Products;
//using MyCompanyName.AbpZeroTemplate.DM_DoiTuongs.Dtos;
//using MyCompanyName.AbpZeroTemplate.DM_DoiTuongs;
using MyCompanyName.AbpZeroTemplate.MyCompanyName.AbpZeroTemplate.DM_NhomDoiTuongs.Dtos;
using MyCompanyName.AbpZeroTemplate.MyCompanyName.AbpZeroTemplate.DM_NhomDoiTuongs;
using MyCompanyName.AbpZeroTemplate.Phones.Dtos;
using MyCompanyName.AbpZeroTemplate.Phones;
using Abp.Application.Editions;
using Abp.Application.Features;
using Abp.Auditing;
using Abp.Authorization;
using Abp.Authorization.Users;
using Abp.DynamicEntityProperties;
using Abp.EntityHistory;
using Abp.Localization;
using Abp.Notifications;
using Abp.Organizations;
using Abp.UI.Inputs;
using Abp.Webhooks;
using AutoMapper;
using IdentityServer4.Extensions;
using MyCompanyName.AbpZeroTemplate.Auditing.Dto;
using MyCompanyName.AbpZeroTemplate.Authorization.Accounts.Dto;
using MyCompanyName.AbpZeroTemplate.Authorization.Delegation;
using MyCompanyName.AbpZeroTemplate.Authorization.Permissions.Dto;
using MyCompanyName.AbpZeroTemplate.Authorization.Roles;
using MyCompanyName.AbpZeroTemplate.Authorization.Roles.Dto;
using MyCompanyName.AbpZeroTemplate.Authorization.Users;
using MyCompanyName.AbpZeroTemplate.Authorization.Users.Delegation.Dto;
using MyCompanyName.AbpZeroTemplate.Authorization.Users.Dto;
using MyCompanyName.AbpZeroTemplate.Authorization.Users.Importing.Dto;
using MyCompanyName.AbpZeroTemplate.Authorization.Users.Profile.Dto;
using MyCompanyName.AbpZeroTemplate.Chat;
using MyCompanyName.AbpZeroTemplate.Chat.Dto;
using MyCompanyName.AbpZeroTemplate.DynamicEntityProperties.Dto;
using MyCompanyName.AbpZeroTemplate.Editions;
using MyCompanyName.AbpZeroTemplate.Editions.Dto;
using MyCompanyName.AbpZeroTemplate.Friendships;
using MyCompanyName.AbpZeroTemplate.Friendships.Cache;
using MyCompanyName.AbpZeroTemplate.Friendships.Dto;
using MyCompanyName.AbpZeroTemplate.Localization.Dto;
using MyCompanyName.AbpZeroTemplate.MultiTenancy;
using MyCompanyName.AbpZeroTemplate.MultiTenancy.Dto;
using MyCompanyName.AbpZeroTemplate.MultiTenancy.HostDashboard.Dto;
using MyCompanyName.AbpZeroTemplate.MultiTenancy.Payments;
using MyCompanyName.AbpZeroTemplate.MultiTenancy.Payments.Dto;
using MyCompanyName.AbpZeroTemplate.Notifications.Dto;
using MyCompanyName.AbpZeroTemplate.Organizations.Dto;
using MyCompanyName.AbpZeroTemplate.Sessions.Dto;
using MyCompanyName.AbpZeroTemplate.WebHooks.Dto;
using MyCompanyName.AbpZeroTemplate.Persons.Dtos;
using MyCompanyName.AbpZeroTemplate.Persons;
using MyCompanyName.AbpZeroTemplate.AppTasks.Dtos;
using MyCompanyName.AbpZeroTemplate.AppTasks;
using MyCompanyName.AbpZeroTemplate.crmdemo.Organizations.Dto;
using MyCompanyName.AbpZeroTemplate.crmdemo.Categories;
using MyCompanyName.AbpZeroTemplate.crmdemo.Accounting;
using MyCompanyName.AbpZeroTemplate.crmdemo.Sale.TheKhachHangs;
using MyCompanyName.AbpZeroTemplate.crmdemo.Sale;
using MyCompanyName.AbpZeroTemplate.crmdemo.Categories.Dtos;
using MyCompanyName.AbpZeroTemplate.crmdemo.OrganizationUnits;
using MyCompanyName.AbpZeroTemplate.crmdemo.Sale.Dtos;

namespace MyCompanyName.AbpZeroTemplate
{
    internal static class CustomDtoMapper
    {
        public static void CreateMappings(IMapperConfigurationExpression configuration)
        {
			//  crmdemo

			//configuration.CreateMap<CreateOrEditReleaseDto, Release>();
			//configuration.CreateMap<Release, ReleaseDto>();
			//configuration.CreateMap<CreateOrEditRoleProcessStatusDto, RoleProcessStatus>();
			//configuration.CreateMap<RoleProcessStatus, RoleProcessStatusDto>();
			//configuration.CreateMap<CreateOrEditRecallDataLogDto, RecallDataLog>();
			//configuration.CreateMap<RecallDataLog, RecallDataLogDto>();
			//configuration.CreateMap<CreateOrEditDueDateRenewDto, DueDateRenew>();
			//configuration.CreateMap<DueDateRenew, DueDateRenewDto>();
			//configuration.CreateMap<CreateOrEditAssigneBulkleDataLogDto, AssigneBulkleDataLog>();
			//configuration.CreateMap<AssigneBulkleDataLog, AssigneBulkleDataLogDto>();
			//configuration.CreateMap<CreateOrEditAssignDataLogDto, AssignDataLog>();
			//configuration.CreateMap<AssignDataLog, AssignDataLogDto>();
			//configuration.CreateMap<CreateOrEditDataChangeStatusLogDto, DataChangeStatusLog>();
			//configuration.CreateMap<DataChangeStatusLog, DataChangeStatusLogDto>();
			//configuration.CreateMap<CreateOrEditPhoneLogDto, PhoneLog>();
			//configuration.CreateMap<PhoneLog, PhoneLogDto>();
			//configuration.CreateMap<CreateOrEditCustomerDataRawDto, CustomerDataRaw>();
			//configuration.CreateMap<CustomerDataRaw, CustomerDataRawDto>();
			//configuration.CreateMap<CreateOrEditCustomerDataDto, CustomerData>();
			//configuration.CreateMap<CustomerData, CustomerDataDto>();
			//configuration.CreateMap<CreateOrEditChangeStatusFlowDto, ChangeStatusFlow>();
			//configuration.CreateMap<ChangeStatusFlow, ChangeStatusFlowDto>();
			//configuration.CreateMap<CreateOrEditReasonDto, Reason>();
			//configuration.CreateMap<Reason, ReasonDto>();
			//configuration.CreateMap<CreateOrEditDataProcessStatusDto, DataProcessStatus>();
			//configuration.CreateMap<DataProcessStatus, DataProcessStatusDto>();
			//configuration.CreateMap<CreateOrEditDataSourceDto, DataSource>();
			configuration.CreateMap<DataSource, DataSourceDto>();
			//configuration.CreateMap<CreateOrEditImportDataDto, ImportData>();
			//configuration.CreateMap<ImportData, ImportDataDto>();
			//configuration.CreateMap<CreateOrEditReportDataDto, ReportData>();
			//configuration.CreateMap<ReportData, ReportDataDto>();
			//configuration.CreateMap<CreateOrEditPackageReleaseDto, PackageRelease>();
			//configuration.CreateMap<PackageRelease, PackageReleaseDto>();
			//configuration.CreateMap<CreateOrEditBalanceReleaseDto, BalanceRelease>();
			//configuration.CreateMap<BalanceRelease, BalanceReleaseDto>();
			//configuration.CreateMap<CreateOrEditScheduleDto, Schedule>();
			//configuration.CreateMap<Schedule, ScheduleDto>();
			//configuration.CreateMap<CreateOrEditSatisfactionLevelDto, SatisfactionLevel>();
			//configuration.CreateMap<SatisfactionLevel, SatisfactionLevelDto>();
			//configuration.CreateMap<CreateOrEditVoucherDto, Voucher>();
			//configuration.CreateMap<Voucher, VoucherDto>();
			//configuration.CreateMap<CreateOrEditDM_NgheNghiepDto, DM_NgheNghiep>();
			//configuration.CreateMap<DM_NgheNghiep, DM_NgheNghiepDto>();
			configuration.CreateMap<CustomOrganizationUnit, CustomOrganizationUnitDto>();
			//configuration.CreateMap<CreateOrEditQuanLyKhieuNaiDto, QuanLyKhieuNai>();
			//configuration.CreateMap<QuanLyKhieuNai, QuanLyKhieuNaiDto>();
			//configuration.CreateMap<CreateOrEditHappyCallDto, HappyCall>();
			//configuration.CreateMap<HappyCall, CreateOrEditHappyCallDto>().ForMember((CreateOrEditHappyCallDto x) => x.TheKhachHang_DichVuId, delegate (IMemberConfigurationExpression<HappyCall, CreateOrEditHappyCallDto, string> opt)
			//{
			//	opt.Ignore();
			//});
			//configuration.CreateMap<HappyCall, HappyCallDto>();
			//configuration.CreateMap<CreateOrEditDM_KhuyenMaiDto, DM_KhuyenMai>();
			//configuration.CreateMap<DM_KhuyenMai, DM_KhuyenMaiDto>();
			//configuration.CreateMap<CreateOrEditDichVuCongDoanDto, DichVuCongDoan>();
			//configuration.CreateMap<DichVuCongDoan, DichVuCongDoanDto>();
			//configuration.CreateMap<CreateOrEditCongDoanDto, CongDoan>();
			//configuration.CreateMap<CongDoan, CongDoanDto>();
			//configuration.CreateMap<CreateOrEditNhanVienTuVanDto, NhanVienTuVan>();
			//configuration.CreateMap<NhanVienTuVan, NhanVienTuVanDto>();
			//configuration.CreateMap<CreateOrEditNhanVienThucHienDto, NhanVienThucHien>().ForMember((NhanVienThucHien x) => x.OrganizationId, delegate (IMemberConfigurationExpression<CreateOrEditNhanVienThucHienDto, NhanVienThucHien, long?> opt)
			//{
			//	opt.Ignore();
			//});
			//configuration.CreateMap<NhanVienThucHien, NhanVienThucHienDto>();
			//configuration.CreateMap<CreateOrEditNhatKySuDungTheDto, NhatKySuDungThe>();
			//configuration.CreateMap<NhatKySuDungThe, NhatKySuDungTheDto>();
			
			//configuration.CreateMap<CreateOrEditHoaDonBanLe_DacDiemKhachHangDto, HoaDonBanLe_DacDiemKhachHang>();
			//configuration.CreateMap<HoaDonBanLe_DacDiemKhachHang, HoaDonBanLe_DacDiemKhachHangDto>();
			//configuration.CreateMap<CreateOrEditHoaDonBanLeChiTietDto, HoaDonBanLeChiTiet>();
			//configuration.CreateMap<HoaDonBanLeChiTiet, CreateOrEditHoaDonBanLeChiTietDto>().ForMember((CreateOrEditHoaDonBanLeChiTietDto x) => x.ID_TheKhachHang, delegate (IMemberConfigurationExpression<HoaDonBanLeChiTiet, CreateOrEditHoaDonBanLeChiTietDto, Guid?> opt)
			//{
			//	opt.Ignore();
			//}).ForMember((CreateOrEditHoaDonBanLeChiTietDto x) => x.MaThe, delegate (IMemberConfigurationExpression<HoaDonBanLeChiTiet, CreateOrEditHoaDonBanLeChiTietDto, string> opt)
			//{
			//	opt.Ignore();
			//});
			//configuration.CreateMap<HoaDonBanLeChiTiet, HoaDonBanLeChiTietDto>();
			//configuration.CreateMap<CreateOrEditHoaDonBanLeDto, HoaDonBanLe>();
			//configuration.CreateMap<HoaDonBanLe, CreateOrEditHoaDonBanLeDto>().ForMember((CreateOrEditHoaDonBanLeDto x) => x.TempId, delegate (IMemberConfigurationExpression<HoaDonBanLe, CreateOrEditHoaDonBanLeDto, Guid?> opt)
			//{
			//	opt.Ignore();
			//});
			//configuration.CreateMap<HoaDonBanLe, HoaDonBanLeDto>();
			//configuration.CreateMap<CreateOrEditTuVanKhachHangDto, TuVanKhachHang>();
			//configuration.CreateMap<TuVanKhachHang, TuVanKhachHangDto>();
			//configuration.CreateMap<CreateOrEditTheKhachHang_DonViSuDungDto, TheKhachHang_DonViSuDung>();
			//configuration.CreateMap<TheKhachHang_DonViSuDung, TheKhachHang_DonViSuDungDto>();
			//configuration.CreateMap<CreateOrEditTheKhachHangChiTietDto, TheKhachHangChiTiet>().ForMember((TheKhachHangChiTiet x) => x.SoLuongDaSuDung, delegate (IMemberConfigurationExpression<CreateOrEditTheKhachHangChiTietDto, TheKhachHangChiTiet, int> opt)
			//{
			//	opt.Ignore();
			//}).ForMember((TheKhachHangChiTiet x) => x.TienDaSuDung, delegate (IMemberConfigurationExpression<CreateOrEditTheKhachHangChiTietDto, TheKhachHangChiTiet, decimal> opt)
			//{
			//	opt.Ignore();
			//});
			//configuration.CreateMap<TheKhachHangChiTiet, TheKhachHangChiTietDto>();
			//configuration.CreateMap<CreateOrEditDM_LienHeDto, DM_LienHe>();
			//configuration.CreateMap<DM_LienHe, DM_LienHeDto>();
			//configuration.CreateMap<CreateOrEditTheKhachHangDto, TheKhachHang>().ForMember((TheKhachHang /x) /=> x.DaChuyenThe, delegate (IMemberConfigurationExpression<CreateOrEditTheKhachHangDto, //TheKhachHang, bool> opt)
			//{
			//	opt.Ignore();
			//}).ForMember((TheKhachHang x) => x.SoDu, delegate //(IMemberConfigurationExpression<CreateOrEditTheKhachHangDto, TheKhachHang, decimal> opt)
			//{
			//	opt.Ignore();
			//})
			//	.ForMember((TheKhachHang x) => x.DaThanhToan, delegate //(IMemberConfigurationExpression<CreateOrEditTheKhachHangDto, TheKhachHang, decimal> opt)
			//	{
			//		opt.Ignore();
			//	})
			//	.ForMember((TheKhachHang x) => x.SoDu, delegate //(IMemberConfigurationExpression<CreateOrEditTheKhachHangDto, TheKhachHang, decimal> opt)
			//	{
			//		opt.Ignore();
			//	});
			//configuration.CreateMap<TheKhachHang, CreateOrEditTheKhachHangDto>().ForMember//((CreateOrEditTheKhachHangDto x) => x.TempId, delegate //(IMemberConfigurationExpression<TheKhachHang, CreateOrEditTheKhachHangDto, Guid?> option)
			//{
			//	option.Ignore();
			//});
			configuration.CreateMap<TheKhachHang, TheKhachHangDto>();
			//configuration.CreateMap<CreateOrEditKhoanThuChi_ChiPhiDoanhThuDto, KhoanThuChi_ChiPhiDoanhThu>/();
			//configuration.CreateMap<KhoanThuChi_ChiPhiDoanhThu, KhoanThuChi_ChiPhiDoanhThuDto>();
			//configuration.CreateMap<CreateOrEditKhoanChiPhi_DoanhThuDto, KhoanChiPhi_DoanhThu>();
			//configuration.CreateMap<KhoanChiPhi_DoanhThu, KhoanChiPhi_DoanhThuDto>();
			//configuration.CreateMap<CreateOrEditKhoanThuChiDto, KhoanThuChi>();
			//configuration.CreateMap<KhoanThuChi, KhoanThuChiDto>();
			//configuration.CreateMap<CreateOrEditMaChungTuDto, MaChungTu>();
			//configuration.CreateMap<MaChungTu, MaChungTuDto>();
			//configuration.CreateMap<CreateOrEditDoiTuong_DacDiemDto, DoiTuong_DacDiem>();
			//configuration.CreateMap<DoiTuong_DacDiem, DoiTuong_DacDiemDto>();
			//configuration.CreateMap<CreateOrEditDM_DacDiemKhachHangDto, DM_DacDiemKhachHang>();
			//configuration.CreateMap<DM_DacDiemKhachHang, DM_DacDiemKhachHangDto>();
			//configuration.CreateMap<CreateOrEditDM_LoaiChungTuDto, DM_LoaiChungTu>();
			//configuration.CreateMap<DM_LoaiChungTu, DM_LoaiChungTuDto>();
			//configuration.CreateMap<CreateOrEditPhieuThuChiTietDto, PhieuThuChiTiet>();
			//configuration.CreateMap<PhieuThuChiTiet, CreateOrEditPhieuThuChiTietDto>().ForMember//((CreateOrEditPhieuThuChiTietDto x) => x.DiscountFromVoucher, delegate //(IMemberConfigurationExpression<PhieuThuChiTiet, CreateOrEditPhieuThuChiTietDto, double?> opt)
			//{
			//	opt.Ignore();
			//});
			//configuration.CreateMap<PhieuThuChiTiet, PhieuThuChiTietDto>();
			//configuration.CreateMap<CreateOrEditPhieuThuDto, PhieuThu>();
			//configuration.CreateMap<PhieuThu, CreateOrEditPhieuThuDto>().ForMember/((CreateOrEditPhieuThuDto /x) => x.TienGui, delegate (IMemberConfigurationExpression<PhieuThu, /CreateOrEditPhieuThuDto, /decimal> opt)
			//{
			//	opt.Ignore();
			//}).ForMember((CreateOrEditPhieuThuDto x) => x.TienMat, delegate //(IMemberConfigurationExpression<PhieuThu, CreateOrEditPhieuThuDto, decimal> opt)
			//{
			//	opt.Ignore();
			//})
			//	.ForMember((CreateOrEditPhieuThuDto x) => x.TienThu, delegate //(IMemberConfigurationExpression<PhieuThu, CreateOrEditPhieuThuDto, decimal> opt)
			//	{
			//		opt.Ignore();
			//	})
			//	.ForMember((CreateOrEditPhieuThuDto x) => x.ID_ChungTu, delegate //(IMemberConfigurationExpression<PhieuThu, CreateOrEditPhieuThuDto, Guid?> opt)
			//	{
			//		opt.Ignore();
			//	})
			//	.ForMember((CreateOrEditPhieuThuDto x) => x.LoaiCT, delegate //(IMemberConfigurationExpression<PhieuThu, CreateOrEditPhieuThuDto, int> opt)
			//	{
			//		opt.Ignore();
			//	})
			//	.ForMember((CreateOrEditPhieuThuDto x) => x.ID_KhachHang, delegate //(IMemberConfigurationExpression<PhieuThu, CreateOrEditPhieuThuDto, Guid?> opt)
			//	{
			//		opt.Ignore();
			//	})
			//	.ForMember((CreateOrEditPhieuThuDto x) => x.MaChuanChi, delegate //(IMemberConfigurationExpression<PhieuThu, CreateOrEditPhieuThuDto, string> opt)
			//	{
			//		opt.Ignore();
			//	});
			//configuration.CreateMap<PhieuThu, PhieuThuDto>();
			//configuration.CreateMap<CreateOrEditCongDoan_DichVuDto, CongDoan_DichVu>();
			//configuration.CreateMap<CongDoan_DichVu, CongDoan_DichVuDto>();
			//configuration.CreateMap<CreateOrEditDonViQuiDoiDto, DonViQuiDoi>();
			//configuration.CreateMap<DonViQuiDoi, DonViQuiDoiDto>();
			//configuration.CreateMap<CreateOrEditViTriHangTrongKhoDto, ViTriHangTrongKho>();
			//configuration.CreateMap<ViTriHangTrongKho, ViTriHangTrongKhoDto>();
			//configuration.CreateMap<CreateOrEditTonToiThieuDto, TonToiThieu>();
			//configuration.CreateMap<TonToiThieu, TonToiThieuDto>();
			//configuration.CreateMap<CreateOrEditChietKhauMacDinh_NhanVienDto, ChietKhauMacDinh_NhanVien>();
			//configuration.CreateMap<ChietKhauMacDinh_NhanVien, ChietKhauMacDinh_NhanVienDto>();
			//configuration.CreateMap<CreateOrEditDM_LoHangDto, DM_LoHang>();
			//configuration.CreateMap<DM_LoHang, DM_LoHangDto>();
			//configuration.CreateMap<CreateOrEditDM_HangHoaDto, DM_HangHoa>();
			//configuration.CreateMap<DM_HangHoa, DM_HangHoaDto>();
			//configuration.CreateMap<CreateOrEditDM_DoiTuongDto, DM_DoiTuong>().ForMember((DM_DoiTuong x) /=> /x.Anh, delegate (IMemberConfigurationExpression<CreateOrEditDM_DoiTuongDto, DM_DoiTuong, //string> opt)
			//{
			//	opt.Ignore();
			//}).ForMember((DM_DoiTuong x) => x.MaDoiTuong, delegate //(IMemberConfigurationExpression<CreateOrEditDM_DoiTuongDto, DM_DoiTuong, string> opt)
			//{
			//	opt.Ignore();
			//});
			//configuration.CreateMap<DM_DoiTuong, DM_DoiTuongDto>();
			//configuration.CreateMap<CreateOrEditNhomHangHoa_DonViDto, NhomHangHoa_DonVi>();
			//configuration.CreateMap<NhomHangHoa_DonVi, NhomHangHoa_DonViDto>();
			//configuration.CreateMap<CreateOrEditKho_DonViDto, Kho_DonVi>();
			//configuration.CreateMap<Kho_DonVi, Kho_DonViDto>();
			//configuration.CreateMap<CreateOrEditPositionDto, Position>();
			//configuration.CreateMap<Position, PositionDto>();
			//configuration.CreateMap<CreateOrEditDM_ViTriDto, DM_ViTri>();
			//configuration.CreateMap<DM_ViTri, DM_ViTriDto>();
			//configuration.CreateMap<CreateOrEditNguonKhachHangDto, NguonKhachHang>();
			//configuration.CreateMap<NguonKhachHang, NguonKhachHangDto>();
			//configuration.CreateMap<CreateOrEditDM_TyGiaDto, DM_TyGia>();
			//configuration.CreateMap<DM_TyGia, DM_TyGiaDto>();
			//configuration.CreateMap<CreateOrEditDM_TrangThaiDto, DM_TrangThai>();
			//configuration.CreateMap<DM_TrangThai, DM_TrangThaiDto>();
			//configuration.CreateMap<CreateOrEditDM_TienTeDto, DM_TienTe>();
			//configuration.CreateMap<DM_TienTe, DM_TienTeDto>();
			//configuration.CreateMap<CreateOrEditDM_ThueSuatDto, DM_ThueSuat>();
			//configuration.CreateMap<DM_ThueSuat, DM_ThueSuatDto>();
			//configuration.CreateMap<CreateOrEditDM_QuanHuyenDto, DM_QuanHuyen>();
			//configuration.CreateMap<DM_QuanHuyen, DM_QuanHuyenDto>();
			//configuration.CreateMap<CreateOrEditDM_PhanLoaiHangHoaDichVuDto, DM_PhanLoaiHangHoaDichVu>();
			//configuration.CreateMap<DM_PhanLoaiHangHoaDichVu, DM_PhanLoaiHangHoaDichVuDto>();
			//configuration.CreateMap<CreateOrEditDM_NhomTheDto, DM_NhomThe>();
			//configuration.CreateMap<DM_NhomThe, DM_NhomTheDto>();
			//configuration.CreateMap<CreateOrEditDM_NhomHangHoaDto, DM_NhomHangHoa>();
			//configuration.CreateMap<DM_NhomHangHoa, DM_NhomHangHoaDto>();
			//configuration.CreateMap<CreateOrEditDM_NhomDoiTuongDto, DM_NhomDoiTuong>();
			//configuration.CreateMap<DM_NhomDoiTuong, DM_NhomDoiTuongDto>();
			//configuration.CreateMap<CreateOrEditDM_KhoDto, DM_Kho>();
			//configuration.CreateMap<DM_Kho, DM_KhoDto>();
			//configuration.CreateMap<CreateOrEditDM_HinhThucVanChuyenDto, DM_HinhThucVanChuyen>();
			//configuration.CreateMap<DM_HinhThucVanChuyen, DM_HinhThucVanChuyenDto>();
			//configuration.CreateMap<CreateOrEditDM_DonViTinhDto, DM_DonViTinh>();
			//configuration.CreateMap<DM_DonViTinh, DM_DonViTinhDto>();
			//configuration.CreateMap<CreateOrEditDM_DonViDto, DM_DonVi>();
			//configuration.CreateMap<DM_DonVi, DM_DonViDto>();
			//configuration.CreateMap<CreateOrEditDM_TinhThanhDto, DM_TinhThanh>();
			//configuration.CreateMap<DM_TinhThanh, DM_TinhThanhDto>();
			//configuration.CreateMap<CreateOrEditDM_VungMienDto, DM_VungMien>();
			//configuration.CreateMap<DM_VungMien, DM_VungMienDto>();
			//configuration.CreateMap<CreateOrEditDM_KhuVucDto, DM_KhuVuc>();
			//configuration.CreateMap<DM_KhuVuc, DM_KhuVucDto>();
			//configuration.CreateMap<CreateOrEditDM_LoaiPhongDto, DM_LoaiPhong>();
			//configuration.CreateMap<DM_LoaiPhong, DM_LoaiPhongDto>();
			//configuration.CreateMap<CreateOrEditDM_QuocGiaDto, DM_QuocGia>();
			//configuration.CreateMap<DM_QuocGia, DM_QuocGiaDto>();
			//configuration.CreateMap<CreateOrEditDM_NganHangDto, DM_NganHang>();
            //configuration.CreateMap<DM_NganHang, DM_NganHangDto>();
            ////configuration.CreateMap<CheckboxInputType, FeatureInputTypeDto>();
            ////configuration.CreateMap<SingleLineStringInputType, FeatureInputTypeDto>();
            ////configuration.CreateMap<ComboboxInputType, FeatureInputTypeDto>();
            ////configuration.CreateMap<IInputType, FeatureInputTypeDto>().Include<CheckboxInputType, FeatureInputTypeDto>().Include<SingleLineStringInputType, FeatureInputTypeDto>()
            ////	.Include<ComboboxInputType, FeatureInputTypeDto>();
            ////configuration.CreateMap<StaticLocalizableComboboxItemSource, LocalizableComboboxItemSourceDto>();
            ////configuration.CreateMap<ILocalizableComboboxItemSource, LocalizableComboboxItemSourceDto>().Include<StaticLocalizableComboboxItemSource, LocalizableComboboxItemSourceDto>();
            ////configuration.CreateMap<LocalizableComboboxItem, LocalizableComboboxItemDto>();
            ////configuration.CreateMap<ILocalizableComboboxItem, LocalizableComboboxItemDto>().Include<LocalizableComboboxItem, LocalizableComboboxItemDto>();
            ////configuration.CreateMap<ChatMessage, ChatMessageDto>();
            ////configuration.CreateMap<FlatFeatureSelectDto, Feature>().ReverseMap();
            ////configuration.CreateMap<Feature, FlatFeatureDto>();
            ////configuration.CreateMap<RoleEditDto, Role>().ReverseMap();
            ////configuration.CreateMap<Role, RoleListDto>();
            ////configuration.CreateMap<UserRole, UserListRoleDto>();
            ////configuration.CreateMap<EditionEditDto, SubscribableEdition>().ReverseMap();
            ////configuration.CreateMap<EditionSelectDto, SubscribableEdition>().ReverseMap();
            ////configuration.CreateMap<SubscribableEdition, EditionInfoDto>();
            ////configuration.CreateMap<Edition, EditionInfoDto>().Include<SubscribableEdition, EditionInfoDto>();
            ////configuration.CreateMap<Edition, EditionListDto>();
            ////configuration.CreateMap<Edition, EditionEditDto>();
            ////configuration.CreateMap<Edition, SubscribableEdition>();
            ////configuration.CreateMap<Edition, EditionSelectDto>();
            ////configuration.CreateMap<SubscriptionPaymentDto, SubscriptionPayment>().ReverseMap();
            ////configuration.CreateMap<SubscriptionPaymentListDto, SubscriptionPayment>().ReverseMap();
            ////configuration.CreateMap<SubscriptionPayment, SubscriptionPaymentInfoDto>();
            ////configuration.CreateMap<Permission, FlatPermissionDto>();
            ////configuration.CreateMap<Permission, FlatPermissionWithLevelDto>();
            ////configuration.CreateMap<ApplicationLanguage, ApplicationLanguageEditDto>();
            ////configuration.CreateMap<ApplicationLanguage, ApplicationLanguageListDto>();
            ////configuration.CreateMap<NotificationDefinition, NotificationSubscriptionWithDisplayNameDto>();
            ////configuration.CreateMap<ApplicationLanguage, ApplicationLanguageEditDto>().ForMember((ApplicationLanguageEditDto ldto) => ldto.IsEnabled, delegate (IMemberConfigurationExpression<ApplicationLanguage, ApplicationLanguageEditDto, bool> options)
            ////{
            ////	options.MapFrom((ApplicationLanguage l) => !l.IsDisabled);
            ////});
            ////configuration.CreateMap<Tenant, RecentTenant>();
            ////configuration.CreateMap<Tenant, TenantLoginInfoDto>();
            ////configuration.CreateMap<Tenant, TenantListDto>();
            ////configuration.CreateMap<TenantEditDto, Tenant>().ReverseMap();
            ////configuration.CreateMap<CurrentTenantInfoDto, Tenant>().ReverseMap();
            configuration.CreateMap<User, UserEditDto>().ForMember((UserEditDto dto) => dto.Password, delegate (IMemberConfigurationExpression<User, UserEditDto, string> options)
            {
                options.Ignore();
            }).ReverseMap()
                .ForMember((User user) => user.Password, delegate (IMemberConfigurationExpression<UserEditDto, User, string> options)
                {
                    options.Ignore();
                });
            ////configuration.CreateMap<User, UserLoginInfoDto>();
            ////configuration.CreateMap<User, UserListDto>();
            ////configuration.CreateMap<User, ChatUserDto>();
            ////configuration.CreateMap<User, OrganizationUnitUserListDto>();
            ////configuration.CreateMap<CurrentUserProfileEditDto, User>().ReverseMap();
            ////configuration.CreateMap<UserLoginAttemptDto, UserLoginAttempt>().ReverseMap();
            ////configuration.CreateMap<AuditLog, AuditLogListDto>();
            ////configuration.CreateMap<EntityChange, EntityChangeListDto>();
            ////configuration.CreateMap<Friendship, FriendDto>();
            ////configuration.CreateMap<FriendCacheItem, FriendDto>();
            configuration.CreateMap<OrganizationUnit, CustomOrganizationUnitDto>();

			//////////////////////////////////////////////////////

			//  datdd
			configuration.CreateMap<GetAllTasksInput, AppTask>().ReverseMap();
            configuration.CreateMap<TaskListDto, AppTask>().ReverseMap();

            configuration.CreateMap<EditPersonInput, Person>().ReverseMap();
            configuration.CreateMap<CreatePersonInput, Person>().ReverseMap();
            configuration.CreateMap<PersonListDto, Person>().ReverseMap();
            configuration.CreateMap<CreateOrEditBaseEntityDto, BaseEntity>().ReverseMap();
            configuration.CreateMap<BaseEntityDto, BaseEntity>().ReverseMap();
            configuration.CreateMap<CreateOrEditChildDto, Child>().ReverseMap();
            configuration.CreateMap<ChildDto, Child>().ReverseMap();
            configuration.CreateMap<CreateOrEditProductDto, Product>().ReverseMap();
            configuration.CreateMap<ProductDto, Product>().ReverseMap();
            //configuration.CreateMap<CreateOrEditDM_DoiTuongDto, DM_DoiTuong>().ReverseMap();
            //configuration.CreateMap<DM_DoiTuongDto, DM_DoiTuong>().ReverseMap();
            //configuration.CreateMap<CreateOrEditDM_NhomDoiTuongsDto, MyCompanyName.AbpZeroTemplate.DM_NhomDoiTuongs.DM_NhomDoiTuongs>().ReverseMap();
            //configuration.CreateMap<DM_NhomDoiTuongsDto, MyCompanyName.AbpZeroTemplate.DM_NhomDoiTuongs.DM_NhomDoiTuongs>().ReverseMap();
            configuration.CreateMap<CreateOrEditPhoneDto, Phone>().ReverseMap();
            configuration.CreateMap<PhoneDto, Phone>().ReverseMap();
            //Inputs
            configuration.CreateMap<CheckboxInputType, FeatureInputTypeDto>();
            configuration.CreateMap<SingleLineStringInputType, FeatureInputTypeDto>();
            configuration.CreateMap<ComboboxInputType, FeatureInputTypeDto>();
            configuration.CreateMap<IInputType, FeatureInputTypeDto>()
                .Include<CheckboxInputType, FeatureInputTypeDto>()
                .Include<SingleLineStringInputType, FeatureInputTypeDto>()
                .Include<ComboboxInputType, FeatureInputTypeDto>();
            configuration.CreateMap<StaticLocalizableComboboxItemSource, LocalizableComboboxItemSourceDto>();
            configuration.CreateMap<ILocalizableComboboxItemSource, LocalizableComboboxItemSourceDto>()
                .Include<StaticLocalizableComboboxItemSource, LocalizableComboboxItemSourceDto>();
            configuration.CreateMap<LocalizableComboboxItem, LocalizableComboboxItemDto>();
            configuration.CreateMap<ILocalizableComboboxItem, LocalizableComboboxItemDto>()
                .Include<LocalizableComboboxItem, LocalizableComboboxItemDto>();

            //Chat
            configuration.CreateMap<ChatMessage, ChatMessageDto>();
            configuration.CreateMap<ChatMessage, ChatMessageExportDto>();

            //Feature
            configuration.CreateMap<FlatFeatureSelectDto, Feature>().ReverseMap();
            configuration.CreateMap<Feature, FlatFeatureDto>();

            //Role
            configuration.CreateMap<RoleEditDto, Role>().ReverseMap();
            configuration.CreateMap<Role, RoleListDto>();
            configuration.CreateMap<UserRole, UserListRoleDto>();

            //Edition
            configuration.CreateMap<EditionEditDto, SubscribableEdition>().ReverseMap();
            configuration.CreateMap<EditionCreateDto, SubscribableEdition>();
            configuration.CreateMap<EditionSelectDto, SubscribableEdition>().ReverseMap();
            configuration.CreateMap<SubscribableEdition, EditionInfoDto>();

            configuration.CreateMap<Edition, EditionInfoDto>().Include<SubscribableEdition, EditionInfoDto>();

            configuration.CreateMap<SubscribableEdition, EditionListDto>();
            configuration.CreateMap<Edition, EditionEditDto>();
            configuration.CreateMap<Edition, SubscribableEdition>();
            configuration.CreateMap<Edition, EditionSelectDto>();

            //Payment
            configuration.CreateMap<SubscriptionPaymentDto, SubscriptionPayment>().ReverseMap();
            configuration.CreateMap<SubscriptionPaymentListDto, SubscriptionPayment>().ReverseMap();
            configuration.CreateMap<SubscriptionPayment, SubscriptionPaymentInfoDto>();

            //Permission
            configuration.CreateMap<Permission, FlatPermissionDto>();
            configuration.CreateMap<Permission, FlatPermissionWithLevelDto>();

            //Language
            configuration.CreateMap<ApplicationLanguage, ApplicationLanguageEditDto>();
            configuration.CreateMap<ApplicationLanguage, ApplicationLanguageListDto>();
            configuration.CreateMap<NotificationDefinition, NotificationSubscriptionWithDisplayNameDto>();
            configuration.CreateMap<ApplicationLanguage, ApplicationLanguageEditDto>()
                .ForMember(ldto => ldto.IsEnabled, options => options.MapFrom(l => !l.IsDisabled));

            //Tenant
            configuration.CreateMap<Tenant, RecentTenant>();
            configuration.CreateMap<Tenant, TenantLoginInfoDto>();
            configuration.CreateMap<Tenant, TenantListDto>();
            configuration.CreateMap<TenantEditDto, Tenant>().ReverseMap();
            configuration.CreateMap<CurrentTenantInfoDto, Tenant>().ReverseMap();

            //User
            configuration.CreateMap<User, UserEditDto>()
                .ForMember(dto => dto.Password, options => options.Ignore())
                .ReverseMap()
                .ForMember(user => user.Password, options => options.Ignore());
            configuration.CreateMap<User, UserLoginInfoDto>();
            configuration.CreateMap<User, UserListDto>();
            configuration.CreateMap<User, ChatUserDto>();
            configuration.CreateMap<User, OrganizationUnitUserListDto>();
            configuration.CreateMap<Role, OrganizationUnitRoleListDto>();
            configuration.CreateMap<CurrentUserProfileEditDto, User>().ReverseMap();
            configuration.CreateMap<UserLoginAttemptDto, UserLoginAttempt>().ReverseMap();
            configuration.CreateMap<ImportUserDto, User>();

            //AuditLog
            configuration.CreateMap<AuditLog, AuditLogListDto>();
            configuration.CreateMap<EntityChange, EntityChangeListDto>();
            configuration.CreateMap<EntityPropertyChange, EntityPropertyChangeDto>();

            //Friendship
            configuration.CreateMap<Friendship, FriendDto>();
            configuration.CreateMap<FriendCacheItem, FriendDto>();

            //OrganizationUnit
            configuration.CreateMap<OrganizationUnit, OrganizationUnitDto>();

            //Webhooks
            configuration.CreateMap<WebhookSubscription, GetAllSubscriptionsOutput>();
            configuration.CreateMap<WebhookSendAttempt, GetAllSendAttemptsOutput>()
                .ForMember(webhookSendAttemptListDto => webhookSendAttemptListDto.WebhookName,
                    options => options.MapFrom(l => l.WebhookEvent.WebhookName))
                .ForMember(webhookSendAttemptListDto => webhookSendAttemptListDto.Data,
                    options => options.MapFrom(l => l.WebhookEvent.Data));

            configuration.CreateMap<WebhookSendAttempt, GetAllSendAttemptsOfWebhookEventOutput>();

            configuration.CreateMap<DynamicProperty, DynamicPropertyDto>().ReverseMap();
            configuration.CreateMap<DynamicPropertyValue, DynamicPropertyValueDto>().ReverseMap();
            configuration.CreateMap<DynamicEntityProperty, DynamicEntityPropertyDto>()
                .ForMember(dto => dto.DynamicPropertyName,
                    options => options.MapFrom(entity => entity.DynamicProperty.DisplayName.IsNullOrEmpty() ? entity.DynamicProperty.PropertyName : entity.DynamicProperty.DisplayName));
            configuration.CreateMap<DynamicEntityPropertyDto, DynamicEntityProperty>();

            configuration.CreateMap<DynamicEntityPropertyValue, DynamicEntityPropertyValueDto>().ReverseMap();

            //User Delegations
            configuration.CreateMap<CreateUserDelegationDto, UserDelegation>();

            /* ADD YOUR OWN CUSTOM AUTOMAPPER MAPPINGS HERE */
        }
    }
}