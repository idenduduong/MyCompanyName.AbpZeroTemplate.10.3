using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace MyCompanyName.AbpZeroTemplate.Migrations
{
    public partial class DM_DoiTuong_Add : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "DM_QuanHuyens",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TenantId = table.Column<int>(type: "int", nullable: true),
                    MaQuanHuyen = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TenQuanHuyen = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    GhiChu = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UserTao = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NgayTao = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UserSuaCuoi = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NgaySuaCuoi = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ID_TinhThanh = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    AreaId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    AreaName = table.Column<string>(type: "nvarchar(max)", nullable: true),
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
                    table.PrimaryKey("PK_DM_QuanHuyens", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "DM_QuocGias",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TenantId = table.Column<int>(type: "int", nullable: true),
                    MaNuoc = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TenNuoc = table.Column<string>(type: "nvarchar(max)", nullable: false),
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
                    table.PrimaryKey("PK_DM_QuocGias", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "DM_TinhThanhs",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TenantId = table.Column<int>(type: "int", nullable: true),
                    MaTinhThanh = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TenTinhThanh = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    GhiChu = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UserTao = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NgayTao = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UserSuaCuoi = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NgaySuaCuoi = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ID_QuocGia = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    ID_VungMien = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
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
                    table.PrimaryKey("PK_DM_TinhThanhs", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "DM_TrangThais",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TenantId = table.Column<int>(type: "int", nullable: true),
                    TenTrangThai = table.Column<string>(type: "nvarchar(max)", nullable: true),
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
                    table.PrimaryKey("PK_DM_TrangThais", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "NguonKhachHangs",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TenantId = table.Column<int>(type: "int", nullable: true),
                    TenNguonKhach = table.Column<string>(type: "nvarchar(max)", nullable: false),
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
                    table.PrimaryKey("PK_NguonKhachHangs", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "CustomerDatas",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PrimaryPhone = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SecondaryPhone = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IndentifyNumber = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DateOfBirth = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Gender = table.Column<bool>(type: "bit", nullable: false),
                    Address = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Note = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NationId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    NationString = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ProvinceId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    ProvinceString = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DistrictId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    DistrictString = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AreaId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    CareerId = table.Column<int>(type: "int", nullable: true),
                    CareerString = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TargetOrganizationUnitId = table.Column<long>(type: "bigint", nullable: true),
                    TargetServiceId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    ImportDataId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    ImportCode = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CustomerId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    CustomerId1 = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    CustomerCode = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DataGroup = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    IsInUse = table.Column<bool>(type: "bit", nullable: false),
                    DataSourceId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    DataSource = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DataType = table.Column<int>(type: "int", nullable: false),
                    IsImported = table.Column<bool>(type: "bit", nullable: false),
                    BelongsToSeller = table.Column<bool>(type: "bit", nullable: false),
                    BelongsToSellerId = table.Column<long>(type: "bigint", nullable: true),
                    BelongsToSellerName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DataActiveTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ActivedByUserId = table.Column<long>(type: "bigint", nullable: true),
                    ActivedByUserName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    RecallType = table.Column<int>(type: "int", nullable: true),
                    RecalledBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    RecalledReason = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AuthorizedEmployeeId = table.Column<long>(type: "bigint", nullable: true),
                    AuthorizedEmployee = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AuthorizedOrganizationId = table.Column<long>(type: "bigint", nullable: true),
                    AuthorizedOrganization = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DataProcessStatusId = table.Column<int>(type: "int", nullable: true),
                    DataProcessStatus = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsRecalled = table.Column<bool>(type: "bit", nullable: false),
                    AuthorizedOrganizations = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TargetOrganizationName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TargetServiceName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LastChangeStatusTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ConsultingFiles = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CurrentSchedule = table.Column<DateTime>(type: "datetime2", nullable: true),
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
                    table.PrimaryKey("PK_CustomerDatas", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CustomerDatas_AbpOrganizationUnits_TargetOrganizationUnitId",
                        column: x => x.TargetOrganizationUnitId,
                        principalTable: "AbpOrganizationUnits",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_CustomerDatas_DM_DoiTuongs_CustomerId1",
                        column: x => x.CustomerId1,
                        principalTable: "DM_DoiTuongs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_CustomerDatas_DM_HangHoas_TargetServiceId",
                        column: x => x.TargetServiceId,
                        principalTable: "DM_HangHoas",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_CustomerDatas_DM_NgheNghieps_CareerId",
                        column: x => x.CareerId,
                        principalTable: "DM_NgheNghieps",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_CustomerDatas_DM_QuanHuyens_DistrictId",
                        column: x => x.DistrictId,
                        principalTable: "DM_QuanHuyens",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_CustomerDatas_DM_QuocGias_NationId",
                        column: x => x.NationId,
                        principalTable: "DM_QuocGias",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_CustomerDatas_DM_TinhThanhs_ProvinceId",
                        column: x => x.ProvinceId,
                        principalTable: "DM_TinhThanhs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_CustomerDatas_ImportDatas_ImportDataId",
                        column: x => x.ImportDataId,
                        principalTable: "ImportDatas",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_CustomerDatas_CareerId",
                table: "CustomerDatas",
                column: "CareerId");

            migrationBuilder.CreateIndex(
                name: "IX_CustomerDatas_CustomerId1",
                table: "CustomerDatas",
                column: "CustomerId1");

            migrationBuilder.CreateIndex(
                name: "IX_CustomerDatas_DistrictId",
                table: "CustomerDatas",
                column: "DistrictId");

            migrationBuilder.CreateIndex(
                name: "IX_CustomerDatas_ImportDataId",
                table: "CustomerDatas",
                column: "ImportDataId");

            migrationBuilder.CreateIndex(
                name: "IX_CustomerDatas_NationId",
                table: "CustomerDatas",
                column: "NationId");

            migrationBuilder.CreateIndex(
                name: "IX_CustomerDatas_ProvinceId",
                table: "CustomerDatas",
                column: "ProvinceId");

            migrationBuilder.CreateIndex(
                name: "IX_CustomerDatas_TargetOrganizationUnitId",
                table: "CustomerDatas",
                column: "TargetOrganizationUnitId");

            migrationBuilder.CreateIndex(
                name: "IX_CustomerDatas_TargetServiceId",
                table: "CustomerDatas",
                column: "TargetServiceId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CustomerDatas");

            migrationBuilder.DropTable(
                name: "DM_TrangThais");

            migrationBuilder.DropTable(
                name: "NguonKhachHangs");

            migrationBuilder.DropTable(
                name: "DM_QuanHuyens");

            migrationBuilder.DropTable(
                name: "DM_QuocGias");

            migrationBuilder.DropTable(
                name: "DM_TinhThanhs");
        }
    }
}
