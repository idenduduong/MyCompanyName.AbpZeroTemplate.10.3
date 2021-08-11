using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace MyCompanyName.AbpZeroTemplate.Migrations
{
    public partial class EditTheKhachHang1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "DataProcessStatuses",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DisplayName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    OrderNumber = table.Column<int>(type: "int", nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false),
                    IsEndProcess = table.Column<bool>(type: "bit", nullable: false),
                    IsBeginProcess = table.Column<bool>(type: "bit", nullable: false),
                    IsCallRequired = table.Column<bool>(type: "bit", nullable: false),
                    IsPhoneCommunicationRequired = table.Column<bool>(type: "bit", nullable: false),
                    IsReasonRequired = table.Column<bool>(type: "bit", nullable: false),
                    IsFileRequired = table.Column<bool>(type: "bit", nullable: false),
                    IsScheduleRequired = table.Column<bool>(type: "bit", nullable: false),
                    TrialCustomer = table.Column<bool>(type: "bit", nullable: false),
                    FullCustomer = table.Column<bool>(type: "bit", nullable: false),
                    TotalDaysLimit = table.Column<int>(type: "int", nullable: false),
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
                    table.PrimaryKey("PK_DataProcessStatuses", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "DataSources",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    DisplayName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Code = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Priority = table.Column<int>(type: "int", nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false),
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
                    table.PrimaryKey("PK_DataSources", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "DM_NgheNghieps",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DisplayName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Code = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DisplayOrder = table.Column<int>(type: "int", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
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
                    table.PrimaryKey("PK_DM_NgheNghieps", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "DM_NhomHangHoas",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TenantId = table.Column<int>(type: "int", nullable: true),
                    MaNhom = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TenNhom = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    GhiChu = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ID_Parent = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    LaNhomHangHoa = table.Column<bool>(type: "bit", nullable: false),
                    UserTao = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NgayTao = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UserSuaCuoi = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NgaySuaCuoi = table.Column<DateTime>(type: "datetime2", nullable: true),
                    HienThi_Chinh = table.Column<bool>(type: "bit", nullable: false),
                    HienThi_Phu = table.Column<bool>(type: "bit", nullable: false),
                    MayIn = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    HienThi_BanThe = table.Column<bool>(type: "bit", nullable: false),
                    MauHienThi = table.Column<int>(type: "int", nullable: true),
                    ID_DonVis = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TenDonVis = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ID_Kho = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
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
                    table.PrimaryKey("PK_DM_NhomHangHoas", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ChangeStatusFlows",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Days = table.Column<int>(type: "int", nullable: false),
                    IsEndFlow = table.Column<bool>(type: "bit", nullable: false),
                    FromStatusId = table.Column<int>(type: "int", nullable: true),
                    ToStatusId = table.Column<int>(type: "int", nullable: true),
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
                    table.PrimaryKey("PK_ChangeStatusFlows", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ChangeStatusFlows_DataProcessStatuses_FromStatusId",
                        column: x => x.FromStatusId,
                        principalTable: "DataProcessStatuses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ChangeStatusFlows_DataProcessStatuses_ToStatusId",
                        column: x => x.ToStatusId,
                        principalTable: "DataProcessStatuses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "ImportDatas",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ImportTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    InputFile = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    OutputFile = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DataType = table.Column<int>(type: "int", nullable: false),
                    TotalProcessedData = table.Column<int>(type: "int", nullable: false),
                    TotalSuccess = table.Column<int>(type: "int", nullable: false),
                    TotalInValid = table.Column<int>(type: "int", nullable: false),
                    TotalDupplicate = table.Column<int>(type: "int", nullable: false),
                    TotalIgnored = table.Column<int>(type: "int", nullable: false),
                    ImportCode = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ImportedBy = table.Column<long>(type: "bigint", nullable: true),
                    ImportedId = table.Column<long>(type: "bigint", nullable: true),
                    DataSourceId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
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
                    table.PrimaryKey("PK_ImportDatas", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ImportDatas_AbpUsers_ImportedId",
                        column: x => x.ImportedId,
                        principalTable: "AbpUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ImportDatas_DataSources_DataSourceId",
                        column: x => x.DataSourceId,
                        principalTable: "DataSources",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ChangeStatusFlows_FromStatusId",
                table: "ChangeStatusFlows",
                column: "FromStatusId");

            migrationBuilder.CreateIndex(
                name: "IX_ChangeStatusFlows_ToStatusId",
                table: "ChangeStatusFlows",
                column: "ToStatusId");

            migrationBuilder.CreateIndex(
                name: "IX_ImportDatas_DataSourceId",
                table: "ImportDatas",
                column: "DataSourceId");

            migrationBuilder.CreateIndex(
                name: "IX_ImportDatas_ImportedId",
                table: "ImportDatas",
                column: "ImportedId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ChangeStatusFlows");

            migrationBuilder.DropTable(
                name: "DM_NgheNghieps");

            migrationBuilder.DropTable(
                name: "DM_NhomHangHoas");

            migrationBuilder.DropTable(
                name: "ImportDatas");

            migrationBuilder.DropTable(
                name: "DataProcessStatuses");

            migrationBuilder.DropTable(
                name: "DataSources");
        }
    }
}
