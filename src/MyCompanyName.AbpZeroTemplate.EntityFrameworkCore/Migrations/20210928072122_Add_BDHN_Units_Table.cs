using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace MyCompanyName.AbpZeroTemplate.Migrations
{
    public partial class Add_BDHN_Units_Table : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "BDHN_Units",
                columns: table => new
                {
                    UnitCode = table.Column<string>(type: "nvarchar(6)", maxLength: 6, nullable: false),
                    UnitName = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    ParentUnitCode = table.Column<string>(type: "nvarchar(6)", maxLength: 6, nullable: true),
                    CommuneCode = table.Column<string>(type: "nvarchar(6)", maxLength: 6, nullable: true),
                    UnitTypeCode = table.Column<string>(type: "nvarchar(3)", maxLength: 3, nullable: true),
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
                    table.PrimaryKey("PK_BDHN_Units", x => x.UnitCode);
                    table.ForeignKey(
                        name: "FK_BDHN_Units_AbpOrganizationUnits_OrganizationUnitId",
                        column: x => x.OrganizationUnitId,
                        principalTable: "AbpOrganizationUnits",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_BDHN_Units_BDHN_Communes_CommuneCode",
                        column: x => x.CommuneCode,
                        principalTable: "BDHN_Communes",
                        principalColumn: "CommuneCode",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_BDHN_BuuCucs_UnitCode",
                table: "BDHN_BuuCucs",
                column: "UnitCode");

            migrationBuilder.CreateIndex(
                name: "IX_BDHN_Units_CommuneCode",
                table: "BDHN_Units",
                column: "CommuneCode");

            migrationBuilder.CreateIndex(
                name: "IX_BDHN_Units_OrganizationUnitId",
                table: "BDHN_Units",
                column: "OrganizationUnitId");

            migrationBuilder.AddForeignKey(
                name: "FK_BDHN_BuuCucs_BDHN_Units_UnitCode",
                table: "BDHN_BuuCucs",
                column: "UnitCode",
                principalTable: "BDHN_Units",
                principalColumn: "UnitCode",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BDHN_BuuCucs_BDHN_Units_UnitCode",
                table: "BDHN_BuuCucs");

            migrationBuilder.DropTable(
                name: "BDHN_Units");

            migrationBuilder.DropIndex(
                name: "IX_BDHN_BuuCucs_UnitCode",
                table: "BDHN_BuuCucs");
        }
    }
}
