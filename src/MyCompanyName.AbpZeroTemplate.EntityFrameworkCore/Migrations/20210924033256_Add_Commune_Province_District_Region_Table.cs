using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace MyCompanyName.AbpZeroTemplate.Migrations
{
    public partial class Add_Commune_Province_District_Region_Table : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_BDHN_BuuCucs",
                table: "BDHN_BuuCucs");

            migrationBuilder.AddPrimaryKey(
                name: "PK_BDHN_BuuCucs",
                table: "BDHN_BuuCucs",
                column: "POSCode");

            migrationBuilder.CreateTable(
                name: "BDHN_Regions",
                columns: table => new
                {
                    RegionCode = table.Column<string>(type: "nvarchar(2)", maxLength: 2, nullable: false),
                    RegionName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    TenantId = table.Column<int>(type: "int", nullable: true),
                    OrganizationUnitId = table.Column<long>(type: "bigint", nullable: true),
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
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
                    table.PrimaryKey("PK_BDHN_Regions", x => x.RegionCode);
                    table.ForeignKey(
                        name: "FK_BDHN_Regions_AbpOrganizationUnits_OrganizationUnitId",
                        column: x => x.OrganizationUnitId,
                        principalTable: "AbpOrganizationUnits",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "BDHN_Provinces",
                columns: table => new
                {
                    ProvinceCode = table.Column<string>(type: "nvarchar(3)", maxLength: 3, nullable: false),
                    ProvinceName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: false),
                    RegionCode = table.Column<string>(type: "nvarchar(2)", maxLength: 2, nullable: false),
                    ProvinceListCode = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    TenantId = table.Column<int>(type: "int", nullable: true),
                    OrganizationUnitId = table.Column<long>(type: "bigint", nullable: true),
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
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
                    table.PrimaryKey("PK_BDHN_Provinces", x => x.ProvinceCode);
                    table.ForeignKey(
                        name: "FK_BDHN_Provinces_AbpOrganizationUnits_OrganizationUnitId",
                        column: x => x.OrganizationUnitId,
                        principalTable: "AbpOrganizationUnits",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_BDHN_Provinces_BDHN_Regions_RegionCode",
                        column: x => x.RegionCode,
                        principalTable: "BDHN_Regions",
                        principalColumn: "RegionCode",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "BDHN_Districts",
                columns: table => new
                {
                    DistrictCode = table.Column<string>(type: "nvarchar(4)", maxLength: 4, nullable: false),
                    DistrictName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    ProvinceCode = table.Column<string>(type: "nvarchar(3)", maxLength: 3, nullable: false),
                    TenantId = table.Column<int>(type: "int", nullable: true),
                    OrganizationUnitId = table.Column<long>(type: "bigint", nullable: true),
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
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
                    table.PrimaryKey("PK_BDHN_Districts", x => x.DistrictCode);
                    table.ForeignKey(
                        name: "FK_BDHN_Districts_AbpOrganizationUnits_OrganizationUnitId",
                        column: x => x.OrganizationUnitId,
                        principalTable: "AbpOrganizationUnits",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_BDHN_Districts_BDHN_Provinces_ProvinceCode",
                        column: x => x.ProvinceCode,
                        principalTable: "BDHN_Provinces",
                        principalColumn: "ProvinceCode",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "BDHN_Communes",
                columns: table => new
                {
                    CommuneCode = table.Column<string>(type: "nvarchar(6)", maxLength: 6, nullable: false),
                    CommuneName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    DistrictCode = table.Column<string>(type: "nvarchar(4)", maxLength: 4, nullable: false),
                    TenantId = table.Column<int>(type: "int", nullable: true),
                    OrganizationUnitId = table.Column<long>(type: "bigint", nullable: true),
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
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
                    table.PrimaryKey("PK_BDHN_Communes", x => x.CommuneCode);
                    table.ForeignKey(
                        name: "FK_BDHN_Communes_AbpOrganizationUnits_OrganizationUnitId",
                        column: x => x.OrganizationUnitId,
                        principalTable: "AbpOrganizationUnits",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_BDHN_Communes_BDHN_Districts_DistrictCode",
                        column: x => x.DistrictCode,
                        principalTable: "BDHN_Districts",
                        principalColumn: "DistrictCode",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_BDHN_BuuCucs_CommuneCode",
                table: "BDHN_BuuCucs",
                column: "CommuneCode");

            migrationBuilder.CreateIndex(
                name: "IX_BDHN_Communes_DistrictCode",
                table: "BDHN_Communes",
                column: "DistrictCode");

            migrationBuilder.CreateIndex(
                name: "IX_BDHN_Communes_OrganizationUnitId",
                table: "BDHN_Communes",
                column: "OrganizationUnitId");

            migrationBuilder.CreateIndex(
                name: "IX_BDHN_Districts_OrganizationUnitId",
                table: "BDHN_Districts",
                column: "OrganizationUnitId");

            migrationBuilder.CreateIndex(
                name: "IX_BDHN_Districts_ProvinceCode",
                table: "BDHN_Districts",
                column: "ProvinceCode");

            migrationBuilder.CreateIndex(
                name: "IX_BDHN_Provinces_OrganizationUnitId",
                table: "BDHN_Provinces",
                column: "OrganizationUnitId");

            migrationBuilder.CreateIndex(
                name: "IX_BDHN_Provinces_RegionCode",
                table: "BDHN_Provinces",
                column: "RegionCode");

            migrationBuilder.CreateIndex(
                name: "IX_BDHN_Regions_OrganizationUnitId",
                table: "BDHN_Regions",
                column: "OrganizationUnitId");

            migrationBuilder.AddForeignKey(
                name: "FK_BDHN_BuuCucs_BDHN_Communes_CommuneCode",
                table: "BDHN_BuuCucs",
                column: "CommuneCode",
                principalTable: "BDHN_Communes",
                principalColumn: "CommuneCode",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BDHN_BuuCucs_BDHN_Communes_CommuneCode",
                table: "BDHN_BuuCucs");

            migrationBuilder.DropTable(
                name: "BDHN_Communes");

            migrationBuilder.DropTable(
                name: "BDHN_Districts");

            migrationBuilder.DropTable(
                name: "BDHN_Provinces");

            migrationBuilder.DropTable(
                name: "BDHN_Regions");

            migrationBuilder.DropPrimaryKey(
                name: "PK_BDHN_BuuCucs",
                table: "BDHN_BuuCucs");

            migrationBuilder.DropIndex(
                name: "IX_BDHN_BuuCucs_CommuneCode",
                table: "BDHN_BuuCucs");

            migrationBuilder.AddPrimaryKey(
                name: "PK_BDHN_BuuCucs",
                table: "BDHN_BuuCucs",
                column: "Id");
        }
    }
}
