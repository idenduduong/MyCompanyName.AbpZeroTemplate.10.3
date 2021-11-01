using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace MyCompanyName.AbpZeroTemplate.Migrations
{
    public partial class Add_Tool_History : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "BDHN_ToolRepairHistorys",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    RepairFrom = table.Column<DateTime>(type: "datetime2", nullable: true),
                    RepairTo = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Configuration = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    Condition = table.Column<int>(type: "int", nullable: false),
                    ToolStatus = table.Column<int>(type: "int", nullable: false),
                    Note = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    POSCode = table.Column<string>(type: "nvarchar(6)", maxLength: 6, nullable: true),
                    ToolId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    TenantId = table.Column<int>(type: "int", nullable: true),
                    OrganizationUnitId = table.Column<long>(type: "bigint", nullable: true),
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
                    table.PrimaryKey("PK_BDHN_ToolRepairHistorys", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BDHN_ToolRepairHistorys_AbpOrganizationUnits_OrganizationUnitId",
                        column: x => x.OrganizationUnitId,
                        principalTable: "AbpOrganizationUnits",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_BDHN_ToolRepairHistorys_BDHN_BuuCucs_POSCode",
                        column: x => x.POSCode,
                        principalTable: "BDHN_BuuCucs",
                        principalColumn: "POSCode",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_BDHN_ToolRepairHistorys_BDHN_Tools_ToolId",
                        column: x => x.ToolId,
                        principalTable: "BDHN_Tools",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "BDHN_ToolTransferHistorys",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    From = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    To = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    UsedFrom = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UsedTo = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Configuration = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    Condition = table.Column<int>(type: "int", nullable: false),
                    ToolStatus = table.Column<int>(type: "int", nullable: false),
                    Note = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    FromPOSCode = table.Column<string>(type: "nvarchar(6)", maxLength: 6, nullable: true),
                    ToPOSCode = table.Column<string>(type: "nvarchar(6)", maxLength: 6, nullable: true),
                    ToolId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    TenantId = table.Column<int>(type: "int", nullable: true),
                    OrganizationUnitId = table.Column<long>(type: "bigint", nullable: true),
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
                    table.PrimaryKey("PK_BDHN_ToolTransferHistorys", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BDHN_ToolTransferHistorys_AbpOrganizationUnits_OrganizationUnitId",
                        column: x => x.OrganizationUnitId,
                        principalTable: "AbpOrganizationUnits",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_BDHN_ToolTransferHistorys_BDHN_BuuCucs_FromPOSCode",
                        column: x => x.FromPOSCode,
                        principalTable: "BDHN_BuuCucs",
                        principalColumn: "POSCode",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_BDHN_ToolTransferHistorys_BDHN_BuuCucs_ToPOSCode",
                        column: x => x.ToPOSCode,
                        principalTable: "BDHN_BuuCucs",
                        principalColumn: "POSCode",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_BDHN_ToolTransferHistorys_BDHN_Tools_ToolId",
                        column: x => x.ToolId,
                        principalTable: "BDHN_Tools",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_BDHN_ToolRepairHistorys_OrganizationUnitId",
                table: "BDHN_ToolRepairHistorys",
                column: "OrganizationUnitId");

            migrationBuilder.CreateIndex(
                name: "IX_BDHN_ToolRepairHistorys_POSCode",
                table: "BDHN_ToolRepairHistorys",
                column: "POSCode");

            migrationBuilder.CreateIndex(
                name: "IX_BDHN_ToolRepairHistorys_ToolId",
                table: "BDHN_ToolRepairHistorys",
                column: "ToolId");

            migrationBuilder.CreateIndex(
                name: "IX_BDHN_ToolTransferHistorys_FromPOSCode",
                table: "BDHN_ToolTransferHistorys",
                column: "FromPOSCode");

            migrationBuilder.CreateIndex(
                name: "IX_BDHN_ToolTransferHistorys_OrganizationUnitId",
                table: "BDHN_ToolTransferHistorys",
                column: "OrganizationUnitId");

            migrationBuilder.CreateIndex(
                name: "IX_BDHN_ToolTransferHistorys_ToolId",
                table: "BDHN_ToolTransferHistorys",
                column: "ToolId");

            migrationBuilder.CreateIndex(
                name: "IX_BDHN_ToolTransferHistorys_ToPOSCode",
                table: "BDHN_ToolTransferHistorys",
                column: "ToPOSCode");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BDHN_ToolRepairHistorys");

            migrationBuilder.DropTable(
                name: "BDHN_ToolTransferHistorys");
        }
    }
}
