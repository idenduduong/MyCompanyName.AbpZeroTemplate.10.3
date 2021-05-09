using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace MyCompanyName.AbpZeroTemplate.Migrations
{
    public partial class dm_doi_tuong : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "DM_DoiTuongs",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TenantId = table.Column<int>(type: "int", nullable: true),
                    LoaiDoiTuong = table.Column<int>(type: "int", nullable: false),
                    LaCaNhan = table.Column<bool>(type: "bit", nullable: false),
                    MaDoiTuong = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TenDoiTuong = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DienThoai = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Fax = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Website = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Anh = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    MaSoThue = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TaiKhoanNganHang = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    GioiHanCongNo = table.Column<double>(type: "float", nullable: true),
                    GhiChu = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NgaySinh_NgayTLap = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ChiaSe = table.Column<bool>(type: "bit", nullable: false),
                    TheoDoi = table.Column<bool>(type: "bit", nullable: false),
                    ID_Index = table.Column<int>(type: "int", nullable: true),
                    TheoDoiVanTay = table.Column<bool>(type: "bit", nullable: false),
                    NgayDoiNhom = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DiemKhoiTao = table.Column<double>(type: "float", nullable: true),
                    DoanhSoKhoiTao = table.Column<double>(type: "float", nullable: true),
                    ID_NguoiGioiThieu = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CapTai_DKKD = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DiaChi = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    GioiTinhNam = table.Column<bool>(type: "bit", nullable: false),
                    NganHang = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NgayCapCMTND_DKKD = table.Column<DateTime>(type: "datetime2", nullable: true),
                    NoiCapCMTND_DKKD = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SDT_CoQuan = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SDT_NhaRieng = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SoCMTND_DKKD = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ThuongTru = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    XungHo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NgayGiaoDichGanNhat = table.Column<DateTime>(type: "datetime2", nullable: true),
                    TenNguonKhach = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TenNhom = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ChucVu = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LinhVuc = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TenKhac = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DiaChiKhac = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NgaySuaTrangThai = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ID_DonViQuanLy = table.Column<long>(type: "bigint", nullable: true),
                    CustomerManagementOrganizationCode = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CustomerManagementOrganizationName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ID_NhomCu = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ID_NhanVienPhuTrach = table.Column<long>(type: "bigint", nullable: true),
                    TongDiem = table.Column<double>(type: "float", nullable: false),
                    FileDinhKems = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Ma = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Profile = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsNewCustomer = table.Column<bool>(type: "bit", nullable: false),
                    Order = table.Column<int>(type: "int", nullable: false),
                    CreationTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    LastModificationTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false),
                    DeletionTime = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DM_DoiTuongs", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "DM_NhomDoiTuongs",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TenantId = table.Column<int>(type: "int", nullable: true),
                    LoaiDoiTuong = table.Column<int>(type: "int", nullable: false),
                    MaNhom = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TenNhom = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    MucDiem = table.Column<double>(type: "float", nullable: false),
                    GhiChu = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UserTao = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NgayTao = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UserSuaCuoi = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NgaySuaCuoi = table.Column<DateTime>(type: "datetime2", nullable: true),
                    CreationTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    LastModificationTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false),
                    DeletionTime = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DM_NhomDoiTuongs", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_DM_DoiTuongs_TenantId",
                table: "DM_DoiTuongs",
                column: "TenantId");

            migrationBuilder.CreateIndex(
                name: "IX_DM_NhomDoiTuongs_TenantId",
                table: "DM_NhomDoiTuongs",
                column: "TenantId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DM_DoiTuongs");

            migrationBuilder.DropTable(
                name: "DM_NhomDoiTuongs");
        }
    }
}
