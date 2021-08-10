using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace MyCompanyName.AbpZeroTemplate.Migrations
{
    public partial class crmdemoTheKhachHang : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_DM_NhomDoiTuongs_TenantId",
                table: "DM_NhomDoiTuongs");

            migrationBuilder.AddColumn<long>(
                name: "CreatorUserId",
                table: "DM_NhomDoiTuongs",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "DeleterUserId",
                table: "DM_NhomDoiTuongs",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "LastModifierUserId",
                table: "DM_NhomDoiTuongs",
                type: "bigint",
                nullable: true);

            migrationBuilder.AlterColumn<Guid>(
                name: "Ma",
                table: "DM_DoiTuongs",
                type: "uniqueidentifier",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.AlterColumn<Guid>(
                name: "ID_NhomCu",
                table: "DM_DoiTuongs",
                type: "uniqueidentifier",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.AlterColumn<Guid>(
                name: "ID_NguoiGioiThieu",
                table: "DM_DoiTuongs",
                type: "uniqueidentifier",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.AddColumn<long>(
                name: "CreatorUserId",
                table: "DM_DoiTuongs",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "CustomerDataId",
                table: "DM_DoiTuongs",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "DM_NhomDoiTuongId",
                table: "DM_DoiTuongs",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "DM_QuanHuyenId",
                table: "DM_DoiTuongs",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "DM_QuocGiaId",
                table: "DM_DoiTuongs",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "DM_TinhThanhId",
                table: "DM_DoiTuongs",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "DM_TrangThaiId",
                table: "DM_DoiTuongs",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "DeleterUserId",
                table: "DM_DoiTuongs",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "LastModifierUserId",
                table: "DM_DoiTuongs",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "NgheNghiepId",
                table: "DM_DoiTuongs",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "NguonKhachHangId",
                table: "DM_DoiTuongs",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "AccountNumber",
                table: "AbpOrganizationUnits",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Address",
                table: "AbpOrganizationUnits",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "AreaId",
                table: "AbpOrganizationUnits",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "AreaName",
                table: "AbpOrganizationUnits",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Discriminator",
                table: "AbpOrganizationUnits",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Lineage",
                table: "AbpOrganizationUnits",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Phone",
                table: "AbpOrganizationUnits",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TaxCode",
                table: "AbpOrganizationUnits",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "UnitCode",
                table: "AbpOrganizationUnits",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Website",
                table: "AbpOrganizationUnits",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "DM_DacDiemKhachHangs",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TenantId = table.Column<int>(type: "int", nullable: true),
                    MaDacDiem = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TenDacDiem = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreationTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatorUserId = table.Column<long>(type: "bigint", nullable: true),
                    LastModificationTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LastModifierUserId = table.Column<long>(type: "bigint", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false),
                    DeleterUserId = table.Column<long>(type: "bigint", nullable: true),
                    DeletionTime = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DM_DacDiemKhachHangs", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "DM_HangHoas",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TenantId = table.Column<int>(type: "int", nullable: true),
                    Anh = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    MaHangHoa = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TenHangHoa = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LaHangHoa = table.Column<bool>(type: "bit", nullable: false),
                    ID_PhanLoai = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    GiaBanLe = table.Column<double>(type: "float", nullable: false),
                    TiSuatBanLe = table.Column<double>(type: "float", nullable: true),
                    GiaNhap = table.Column<double>(type: "float", nullable: false),
                    GiaBan1 = table.Column<double>(type: "float", nullable: true),
                    TiSuatTheoGiaBan1 = table.Column<int>(type: "int", nullable: true),
                    GiaBan2 = table.Column<double>(type: "float", nullable: true),
                    TiSuatTheoGiaBan2 = table.Column<int>(type: "int", nullable: true),
                    GiaBan3 = table.Column<double>(type: "float", nullable: true),
                    TiSuatTheoGiaBan3 = table.Column<int>(type: "int", nullable: true),
                    IDs_NhomKH2 = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IDs_NhomKH3 = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    MaVach = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    QuyCach = table.Column<double>(type: "float", nullable: true),
                    ID_DVTQuyCach = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    LoaiBaoHanh = table.Column<int>(type: "int", nullable: true),
                    ThoiGianBaoHanh = table.Column<int>(type: "int", nullable: true),
                    TenTGBaoHanh = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ChiPhiThucHien = table.Column<double>(type: "float", nullable: false),
                    ChiPhiTinhTheoPT = table.Column<bool>(type: "bit", nullable: false),
                    TinhCPSauChietKhau = table.Column<bool>(type: "bit", nullable: true),
                    GhiChu = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SoPhutThucHien = table.Column<int>(type: "int", nullable: true),
                    ChietKhauMD_NV = table.Column<double>(type: "float", nullable: true),
                    ChietKhauMD_NVTheoPT = table.Column<bool>(type: "bit", nullable: true),
                    ID_DonViTinhPhu1 = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    TyLeChuyenDoi1 = table.Column<double>(type: "float", nullable: true),
                    ID_DonViTinhPhu2 = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    TyLeChuyenDoi2 = table.Column<double>(type: "float", nullable: true),
                    ID_DonViTinhPhu3 = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    TyLeChuyenDoi3 = table.Column<double>(type: "float", nullable: true),
                    TinhGiaVon = table.Column<int>(type: "int", nullable: true),
                    TheoDoi = table.Column<bool>(type: "bit", nullable: false),
                    UserTao = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NgayTao = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UserSuaCuoi = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NgaySuaCuoi = table.Column<DateTime>(type: "datetime2", nullable: true),
                    TenKhac = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ChatLieu = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    KichCo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    MauSac = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TiSuat1 = table.Column<double>(type: "float", nullable: true),
                    TiSuat2 = table.Column<double>(type: "float", nullable: true),
                    TiSuat3 = table.Column<double>(type: "float", nullable: true),
                    IDs_NhomKH1 = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DM_NhomHangHoaId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    DM_QuocGiaId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    DM_DoiTuongId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    DM_ThueSuatId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    DM_DonViTinhId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    ServiceGroup = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: false),
                    IsTrial = table.Column<bool>(type: "bit", nullable: false),
                    CreationTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatorUserId = table.Column<long>(type: "bigint", nullable: true),
                    LastModificationTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LastModifierUserId = table.Column<long>(type: "bigint", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false),
                    DeleterUserId = table.Column<long>(type: "bigint", nullable: true),
                    DeletionTime = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DM_HangHoas", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "DM_KhuyenMais",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TenantId = table.Column<int>(type: "int", nullable: true),
                    IsPercentage = table.Column<bool>(type: "bit", nullable: false),
                    DisplayName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Code = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SoQuyetDinh = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    StartDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    EndDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    CreationTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatorUserId = table.Column<long>(type: "bigint", nullable: true),
                    LastModificationTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LastModifierUserId = table.Column<long>(type: "bigint", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false),
                    DeleterUserId = table.Column<long>(type: "bigint", nullable: true),
                    DeletionTime = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DM_KhuyenMais", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "DM_LienHes",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TenantId = table.Column<int>(type: "int", nullable: true),
                    MaLienHe = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TenLienHe = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ChucVu = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SoDienThoai = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    GhiChu = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UserTao = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NgayTao = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UserSuaCuoi = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NgaySuaCuoi = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DiaChi = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NgaySinh = table.Column<DateTime>(type: "datetime2", nullable: true),
                    CanNang = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ChieuCao = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ID_DoiTuong = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    CreationTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatorUserId = table.Column<long>(type: "bigint", nullable: true),
                    LastModificationTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LastModifierUserId = table.Column<long>(type: "bigint", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false),
                    DeleterUserId = table.Column<long>(type: "bigint", nullable: true),
                    DeletionTime = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DM_LienHes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "DM_NhomThes",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TenantId = table.Column<int>(type: "int", nullable: true),
                    MaNhomThe = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TenNhomThe = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    GhiChu = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UserTao = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NgayTao = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UserSuaCuoi = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NgaySuaCuoi = table.Column<DateTime>(type: "datetime2", nullable: true),
                    CreationTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatorUserId = table.Column<long>(type: "bigint", nullable: true),
                    LastModificationTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LastModifierUserId = table.Column<long>(type: "bigint", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false),
                    DeleterUserId = table.Column<long>(type: "bigint", nullable: true),
                    DeletionTime = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DM_NhomThes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "DM_TienTes",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TenantId = table.Column<int>(type: "int", nullable: true),
                    MaNgoaiTe = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TenNgoaiTe = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    GhiChu = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LaNoiTe = table.Column<bool>(type: "bit", nullable: false),
                    UserTao = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NgayTao = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UserSuaCuoi = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NgaySuaCuoi = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ID_QuocGia = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    CreationTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatorUserId = table.Column<long>(type: "bigint", nullable: true),
                    LastModificationTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LastModifierUserId = table.Column<long>(type: "bigint", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false),
                    DeleterUserId = table.Column<long>(type: "bigint", nullable: true),
                    DeletionTime = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DM_TienTes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "EntityOrders",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TenantId = table.Column<int>(type: "int", nullable: true),
                    EntityCode = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    OrderNumber = table.Column<double>(type: "float", nullable: false),
                    CreationTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatorUserId = table.Column<long>(type: "bigint", nullable: true),
                    LastModificationTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LastModifierUserId = table.Column<long>(type: "bigint", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false),
                    DeleterUserId = table.Column<long>(type: "bigint", nullable: true),
                    DeletionTime = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EntityOrders", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "HoaDonBanLes",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TenantId = table.Column<int>(type: "int", nullable: true),
                    MaHoaDon = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    NgayLapHoaDon = table.Column<DateTime>(type: "datetime2", nullable: false),
                    GioVao = table.Column<DateTime>(type: "datetime2", nullable: true),
                    GioRa = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ID_CheckIn = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    CustomerAddress = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CustomerPhone = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TyGia = table.Column<double>(type: "float", nullable: false),
                    LoaiHoaDon = table.Column<int>(type: "int", nullable: false),
                    ChoThanhToan = table.Column<bool>(type: "bit", nullable: false),
                    TongTienHang = table.Column<double>(type: "float", nullable: false),
                    TongChietKhau = table.Column<double>(type: "float", nullable: false),
                    TongTienThue = table.Column<double>(type: "float", nullable: false),
                    TongGiamGia = table.Column<double>(type: "float", nullable: false),
                    TongChiPhi = table.Column<double>(type: "float", nullable: false),
                    PhaiThanhToan = table.Column<double>(type: "float", nullable: false),
                    DienGiai = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SoLanIn = table.Column<int>(type: "int", nullable: true),
                    YeuCau = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ID_ViTri = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    Room = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ID_DoiTuong = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    ID_NgoaiTe = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    ID_DonVi = table.Column<long>(type: "bigint", nullable: true),
                    SellingOrganizationName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SellingOrganizationCode = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ID_NhanVien = table.Column<long>(type: "bigint", nullable: true),
                    EmployeeCode = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    EmployeeName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ID_DacDiemKhachHang = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    ID_DonViThucHien = table.Column<long>(type: "bigint", nullable: true),
                    PerformedOrganizationName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PerformedOrganizationCode = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LoaiChungTu = table.Column<int>(type: "int", nullable: true),
                    FileDinhKems = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Status = table.Column<int>(type: "int", nullable: false),
                    Ma = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    CSKH = table.Column<int>(type: "int", nullable: true),
                    Sale = table.Column<int>(type: "int", nullable: true),
                    KeToan = table.Column<int>(type: "int", nullable: true),
                    VeSinh = table.Column<int>(type: "int", nullable: true),
                    YKienKhachHang = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    KhongHaiLong = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NgayDanhGia = table.Column<DateTime>(type: "datetime2", nullable: true),
                    NguoiNhapKS = table.Column<long>(type: "bigint", nullable: true),
                    KSNote = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreationTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatorUserId = table.Column<long>(type: "bigint", nullable: true),
                    LastModificationTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LastModifierUserId = table.Column<long>(type: "bigint", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false),
                    DeleterUserId = table.Column<long>(type: "bigint", nullable: true),
                    DeletionTime = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HoaDonBanLes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "NhanVienThucHiens",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TenantId = table.Column<int>(type: "int", nullable: true),
                    MaChungTu = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ID_ChiTietChungTu = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    TienChietKhau = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    LaPhanTram = table.Column<bool>(type: "bit", nullable: false),
                    LaNhanVienChinh = table.Column<bool>(type: "bit", nullable: false),
                    DienGiai = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ChietKhauTheoThucThu = table.Column<bool>(type: "bit", nullable: false),
                    PTDoanhThuDuocHuong = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    DuocYeuCau = table.Column<bool>(type: "bit", nullable: false),
                    ChiPhiThucHien = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    LaPTChiPhiThucHien = table.Column<bool>(type: "bit", nullable: false),
                    LoaiChungTu = table.Column<int>(type: "int", nullable: true),
                    NhanVien = table.Column<long>(type: "bigint", nullable: true),
                    NgayThucHien = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DanhGia = table.Column<int>(type: "int", nullable: true),
                    ID_CongViec = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    StageName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ID_NhanVienChinh = table.Column<long>(type: "bigint", nullable: true),
                    EmployeeCode = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    EmployeeName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    OrganizationId = table.Column<long>(type: "bigint", nullable: true),
                    CreationTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatorUserId = table.Column<long>(type: "bigint", nullable: true),
                    LastModificationTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LastModifierUserId = table.Column<long>(type: "bigint", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false),
                    DeleterUserId = table.Column<long>(type: "bigint", nullable: true),
                    DeletionTime = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NhanVienThucHiens", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "PhieuThuChiTiets",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TenantId = table.Column<int>(type: "int", nullable: true),
                    ThuTuThe = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    TienMat = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    TienGui = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    TienThu = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    GhiChu = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ID_ChungTu = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    ChiPhiNganHang = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    LaPTChiPhiNganHang = table.Column<bool>(type: "bit", nullable: false),
                    DiaChi_KhachHang = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ThuPhiTienGui = table.Column<bool>(type: "bit", nullable: false),
                    ID_PhieuThu = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    ID_KhachHang = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    ID_NganHang = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    UserId = table.Column<long>(type: "bigint", nullable: true),
                    ID_KhoanThu = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    ID_TheThoanhToan = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    LoaiCT = table.Column<int>(type: "int", nullable: true),
                    MaChuanChi = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreationTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatorUserId = table.Column<long>(type: "bigint", nullable: true),
                    LastModificationTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LastModifierUserId = table.Column<long>(type: "bigint", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false),
                    DeleterUserId = table.Column<long>(type: "bigint", nullable: true),
                    DeletionTime = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PhieuThuChiTiets", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "TheKhachHangChiTiets",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TenantId = table.Column<int>(type: "int", nullable: true),
                    SoLuong = table.Column<int>(type: "int", nullable: false),
                    DonGia = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    PTChietKhau = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    TienChietKhau = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    ThanhToan = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    ID_LopHoc = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    GhiChu = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SoLuongTang = table.Column<int>(type: "int", nullable: false),
                    NgayTraLai = table.Column<DateTime>(type: "datetime2", nullable: true),
                    SoLuongTraLai = table.Column<int>(type: "int", nullable: false),
                    TienDaSuDung = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    TraLaiHHDV = table.Column<bool>(type: "bit", nullable: false),
                    ID_SanPhamChinh = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    LaTangKem = table.Column<bool>(type: "bit", nullable: false),
                    SoLuongDaSuDung = table.Column<int>(type: "int", nullable: false),
                    ID_TheKhachHang = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    ID_HangHoa = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    ServiceName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ServiceGroup = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsComplete = table.Column<bool>(type: "bit", nullable: false),
                    PackageOrder = table.Column<int>(type: "int", nullable: false),
                    MultipleSeller = table.Column<bool>(type: "bit", nullable: false),
                    ReleaseAmount = table.Column<int>(type: "int", nullable: false),
                    CreationTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatorUserId = table.Column<long>(type: "bigint", nullable: true),
                    LastModificationTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LastModifierUserId = table.Column<long>(type: "bigint", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false),
                    DeleterUserId = table.Column<long>(type: "bigint", nullable: true),
                    DeletionTime = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TheKhachHangChiTiets", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "TheKhachHangs",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TenantId = table.Column<int>(type: "int", nullable: true),
                    MaThe = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    NgayMua = table.Column<DateTime>(type: "datetime2", nullable: false),
                    NgayApDung = table.Column<DateTime>(type: "datetime2", nullable: false),
                    NgayHetHan = table.Column<DateTime>(type: "datetime2", nullable: true),
                    MenhGiaThe = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    PTChietKhau = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    TienChietKhau = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    PhaiThanhToan = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    TyGia = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    NgayVaoSo = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ApDungTatCaSanPham = table.Column<bool>(type: "bit", nullable: false),
                    DuocChoMuon = table.Column<bool>(type: "bit", nullable: false),
                    TheGiaTri_SoLan_GiamGia = table.Column<int>(type: "int", nullable: false),
                    GhiChu = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PTTangThem = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    TienTangThem = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    HuyThe = table.Column<bool>(type: "bit", nullable: false),
                    NgayHuy = table.Column<DateTime>(type: "datetime2", nullable: true),
                    SoLanDuocSuDung = table.Column<int>(type: "int", nullable: true),
                    MaNhanVienTuVan = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TenNhanVienTuVan = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ID_KhuyenMai = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    ID_NhomThe = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    CardType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ID_KhachHang = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    ID_TienTe = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    ID_NhanVienLap = table.Column<long>(type: "bigint", nullable: true),
                    ID_DonVi = table.Column<long>(type: "bigint", nullable: true),
                    SellingOrganizationCode = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SellingOrganizationName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ID_DonViThuHuong = table.Column<long>(type: "bigint", nullable: true),
                    ID_DonViThucHien = table.Column<long>(type: "bigint", nullable: true),
                    AuthorizedOrganizationCode = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AuthorizedOrganizationName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Status = table.Column<bool>(type: "bit", nullable: false),
                    DaThanhToan = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    SoDu = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    DaChuyenThe = table.Column<bool>(type: "bit", nullable: false),
                    ID_TheCu = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    ReleaseBalance = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    ReleasedBalance = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    VoucherId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    DiscountFromVoucher = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    VirtualBalance = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    AdjustedAmount = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    CreationTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatorUserId = table.Column<long>(type: "bigint", nullable: true),
                    LastModificationTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LastModifierUserId = table.Column<long>(type: "bigint", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false),
                    DeleterUserId = table.Column<long>(type: "bigint", nullable: true),
                    DeletionTime = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TheKhachHangs", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Vouchers",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    VoucherCode = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    VoucherValue = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    KhuyenMaiId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    CreationTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatorUserId = table.Column<long>(type: "bigint", nullable: true),
                    LastModificationTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LastModifierUserId = table.Column<long>(type: "bigint", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false),
                    DeleterUserId = table.Column<long>(type: "bigint", nullable: true),
                    DeletionTime = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Vouchers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Vouchers_DM_KhuyenMais_KhuyenMaiId",
                        column: x => x.KhuyenMaiId,
                        principalTable: "DM_KhuyenMais",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "HoaDonBanLeChiTiets",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TenantId = table.Column<int>(type: "int", nullable: true),
                    IsTempData = table.Column<bool>(type: "bit", nullable: false),
                    SoThuTu = table.Column<int>(type: "int", nullable: false),
                    ThoiGian = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ThoiGianBaoHanh = table.Column<int>(type: "int", nullable: false),
                    LoaiThoiGianBH = table.Column<int>(type: "int", nullable: true),
                    ID_MaVach = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    ChatLieu = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    MauSac = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    KichCo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SoLuong = table.Column<int>(type: "int", nullable: false),
                    DonGia = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    ThanhTien = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    PTChietKhau = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    TienChietKhau = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    TienThue = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    PTChiPhi = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    TienChiPhi = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    ThanhToan = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    GiaVon = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    GhiChu = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UserNhap = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SoLanDaIn = table.Column<int>(type: "int", nullable: false),
                    ID_TangKem = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    TangKem = table.Column<bool>(type: "bit", nullable: false),
                    ThoiGianThucHien = table.Column<int>(type: "int", nullable: false),
                    SoLuong_TL = table.Column<int>(type: "int", nullable: false),
                    SoLuong_YC = table.Column<int>(type: "int", nullable: false),
                    Chieu = table.Column<bool>(type: "bit", nullable: true),
                    Sang = table.Column<bool>(type: "bit", nullable: true),
                    PTThue = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    MaNhanVienThucHien = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TenNhanVienThucHien = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    MaNhanVienTuVan = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TenNhanVienTuVan = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    MaTheLan = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    MaTheGiaTri = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ID_HoaDon = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    ID_HangHoa = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    ID_KhoHang = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    ID_DonViTinh = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    ID_LoHang = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    ID_ThueSuat = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    CreationTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatorUserId = table.Column<long>(type: "bigint", nullable: true),
                    LastModificationTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LastModifierUserId = table.Column<long>(type: "bigint", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false),
                    DeleterUserId = table.Column<long>(type: "bigint", nullable: true),
                    DeletionTime = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HoaDonBanLeChiTiets", x => x.Id);
                    table.ForeignKey(
                        name: "FK_HoaDonBanLeChiTiets_DM_HangHoas_ID_HangHoa",
                        column: x => x.ID_HangHoa,
                        principalTable: "DM_HangHoas",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_HoaDonBanLeChiTiets_HoaDonBanLes_ID_HoaDon",
                        column: x => x.ID_HoaDon,
                        principalTable: "HoaDonBanLes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "NhatKySuDungThes",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TenantId = table.Column<int>(type: "int", nullable: true),
                    ID_ChungTu = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ID_ChiTietChungTu = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    SoLuong = table.Column<int>(type: "int", nullable: false),
                    SoTien = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Ngay = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UserName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LaSoLuongDuocTang = table.Column<bool>(type: "bit", nullable: false),
                    ID_TheKhachHang = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    ID_TheKhachHangChiTiet = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    LoaiChungTu = table.Column<int>(type: "int", nullable: true),
                    ID_NhanVien = table.Column<long>(type: "bigint", nullable: true),
                    ID_HangHoaDichVu = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    IsLastActivity = table.Column<bool>(type: "bit", nullable: false),
                    ServiceName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ServiceGroup = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreationTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatorUserId = table.Column<long>(type: "bigint", nullable: true),
                    LastModificationTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LastModifierUserId = table.Column<long>(type: "bigint", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false),
                    DeleterUserId = table.Column<long>(type: "bigint", nullable: true),
                    DeletionTime = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NhatKySuDungThes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_NhatKySuDungThes_HoaDonBanLeChiTiets_ID_ChiTietChungTu",
                        column: x => x.ID_ChiTietChungTu,
                        principalTable: "HoaDonBanLeChiTiets",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_NhatKySuDungThes_HoaDonBanLes_ID_ChungTu",
                        column: x => x.ID_ChungTu,
                        principalTable: "HoaDonBanLes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_NhatKySuDungThes_TheKhachHangChiTiets_ID_TheKhachHangChiTiet",
                        column: x => x.ID_TheKhachHangChiTiet,
                        principalTable: "TheKhachHangChiTiets",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_NhatKySuDungThes_TheKhachHangs_ID_TheKhachHang",
                        column: x => x.ID_TheKhachHang,
                        principalTable: "TheKhachHangs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_HoaDonBanLeChiTiets_ID_HangHoa",
                table: "HoaDonBanLeChiTiets",
                column: "ID_HangHoa");

            migrationBuilder.CreateIndex(
                name: "IX_HoaDonBanLeChiTiets_ID_HoaDon",
                table: "HoaDonBanLeChiTiets",
                column: "ID_HoaDon");

            migrationBuilder.CreateIndex(
                name: "IX_NhatKySuDungThes_ID_ChiTietChungTu",
                table: "NhatKySuDungThes",
                column: "ID_ChiTietChungTu");

            migrationBuilder.CreateIndex(
                name: "IX_NhatKySuDungThes_ID_ChungTu",
                table: "NhatKySuDungThes",
                column: "ID_ChungTu");

            migrationBuilder.CreateIndex(
                name: "IX_NhatKySuDungThes_ID_TheKhachHang",
                table: "NhatKySuDungThes",
                column: "ID_TheKhachHang");

            migrationBuilder.CreateIndex(
                name: "IX_NhatKySuDungThes_ID_TheKhachHangChiTiet",
                table: "NhatKySuDungThes",
                column: "ID_TheKhachHangChiTiet");

            migrationBuilder.CreateIndex(
                name: "IX_Vouchers_KhuyenMaiId",
                table: "Vouchers",
                column: "KhuyenMaiId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DM_DacDiemKhachHangs");

            migrationBuilder.DropTable(
                name: "DM_LienHes");

            migrationBuilder.DropTable(
                name: "DM_NhomThes");

            migrationBuilder.DropTable(
                name: "DM_TienTes");

            migrationBuilder.DropTable(
                name: "EntityOrders");

            migrationBuilder.DropTable(
                name: "NhanVienThucHiens");

            migrationBuilder.DropTable(
                name: "NhatKySuDungThes");

            migrationBuilder.DropTable(
                name: "PhieuThuChiTiets");

            migrationBuilder.DropTable(
                name: "Vouchers");

            migrationBuilder.DropTable(
                name: "HoaDonBanLeChiTiets");

            migrationBuilder.DropTable(
                name: "TheKhachHangChiTiets");

            migrationBuilder.DropTable(
                name: "TheKhachHangs");

            migrationBuilder.DropTable(
                name: "DM_KhuyenMais");

            migrationBuilder.DropTable(
                name: "DM_HangHoas");

            migrationBuilder.DropTable(
                name: "HoaDonBanLes");

            migrationBuilder.DropColumn(
                name: "CreatorUserId",
                table: "DM_NhomDoiTuongs");

            migrationBuilder.DropColumn(
                name: "DeleterUserId",
                table: "DM_NhomDoiTuongs");

            migrationBuilder.DropColumn(
                name: "LastModifierUserId",
                table: "DM_NhomDoiTuongs");

            migrationBuilder.DropColumn(
                name: "CreatorUserId",
                table: "DM_DoiTuongs");

            migrationBuilder.DropColumn(
                name: "CustomerDataId",
                table: "DM_DoiTuongs");

            migrationBuilder.DropColumn(
                name: "DM_NhomDoiTuongId",
                table: "DM_DoiTuongs");

            migrationBuilder.DropColumn(
                name: "DM_QuanHuyenId",
                table: "DM_DoiTuongs");

            migrationBuilder.DropColumn(
                name: "DM_QuocGiaId",
                table: "DM_DoiTuongs");

            migrationBuilder.DropColumn(
                name: "DM_TinhThanhId",
                table: "DM_DoiTuongs");

            migrationBuilder.DropColumn(
                name: "DM_TrangThaiId",
                table: "DM_DoiTuongs");

            migrationBuilder.DropColumn(
                name: "DeleterUserId",
                table: "DM_DoiTuongs");

            migrationBuilder.DropColumn(
                name: "LastModifierUserId",
                table: "DM_DoiTuongs");

            migrationBuilder.DropColumn(
                name: "NgheNghiepId",
                table: "DM_DoiTuongs");

            migrationBuilder.DropColumn(
                name: "NguonKhachHangId",
                table: "DM_DoiTuongs");

            migrationBuilder.DropColumn(
                name: "AccountNumber",
                table: "AbpOrganizationUnits");

            migrationBuilder.DropColumn(
                name: "Address",
                table: "AbpOrganizationUnits");

            migrationBuilder.DropColumn(
                name: "AreaId",
                table: "AbpOrganizationUnits");

            migrationBuilder.DropColumn(
                name: "AreaName",
                table: "AbpOrganizationUnits");

            migrationBuilder.DropColumn(
                name: "Discriminator",
                table: "AbpOrganizationUnits");

            migrationBuilder.DropColumn(
                name: "Lineage",
                table: "AbpOrganizationUnits");

            migrationBuilder.DropColumn(
                name: "Phone",
                table: "AbpOrganizationUnits");

            migrationBuilder.DropColumn(
                name: "TaxCode",
                table: "AbpOrganizationUnits");

            migrationBuilder.DropColumn(
                name: "UnitCode",
                table: "AbpOrganizationUnits");

            migrationBuilder.DropColumn(
                name: "Website",
                table: "AbpOrganizationUnits");

            migrationBuilder.AlterColumn<Guid>(
                name: "Ma",
                table: "DM_DoiTuongs",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldNullable: true);

            migrationBuilder.AlterColumn<Guid>(
                name: "ID_NhomCu",
                table: "DM_DoiTuongs",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldNullable: true);

            migrationBuilder.AlterColumn<Guid>(
                name: "ID_NguoiGioiThieu",
                table: "DM_DoiTuongs",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_DM_NhomDoiTuongs_TenantId",
                table: "DM_NhomDoiTuongs",
                column: "TenantId");
        }
    }
}
