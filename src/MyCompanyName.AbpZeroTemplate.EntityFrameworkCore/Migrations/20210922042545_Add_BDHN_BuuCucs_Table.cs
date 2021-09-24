using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace MyCompanyName.AbpZeroTemplate.Migrations
{
    public partial class Add_BDHN_BuuCucs_Table : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<long>(
                name: "OrganizationUnitId",
                table: "AbpUsers",
                type: "bigint",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.CreateTable(
                name: "BDHN_BuuCucs",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    POSCode = table.Column<string>(type: "nvarchar(6)", maxLength: 6, nullable: false),
                    POSName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Address = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true),
                    AddressCode = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    Tel = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    Fax = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    IP = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    DatabaseServer = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    DatabaseUsername = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    DatabasePassword = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    POSTypeCode = table.Column<string>(type: "nvarchar(2)", maxLength: 2, nullable: true),
                    ProvinceCode = table.Column<string>(type: "nvarchar(3)", maxLength: 3, nullable: true),
                    ServiceServer = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    ServicePort = table.Column<int>(type: "int", nullable: true),
                    POSLevelCode = table.Column<string>(type: "nvarchar(3)", maxLength: 3, nullable: true),
                    CommuneCode = table.Column<string>(type: "nvarchar(6)", maxLength: 6, nullable: true),
                    IsOffline = table.Column<bool>(type: "bit", nullable: true),
                    UnitCode = table.Column<string>(type: "nvarchar(6)", maxLength: 6, nullable: true),
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
                    table.PrimaryKey("PK_BDHN_BuuCucs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BDHN_BuuCucs_AbpOrganizationUnits_OrganizationUnitId",
                        column: x => x.OrganizationUnitId,
                        principalTable: "AbpOrganizationUnits",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AbpOrganizationUnits_TenantId",
                table: "AbpOrganizationUnits",
                column: "TenantId");

            migrationBuilder.CreateIndex(
                name: "IX_BDHN_BuuCucs_OrganizationUnitId",
                table: "BDHN_BuuCucs",
                column: "OrganizationUnitId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BDHN_BuuCucs");

            migrationBuilder.DropIndex(
                name: "IX_AbpOrganizationUnits_TenantId",
                table: "AbpOrganizationUnits");

            migrationBuilder.AlterColumn<int>(
                name: "OrganizationUnitId",
                table: "AbpUsers",
                type: "int",
                nullable: true,
                oldClrType: typeof(long),
                oldType: "bigint",
                oldNullable: true);
        }
    }
}
