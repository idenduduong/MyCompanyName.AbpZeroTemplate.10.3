using Microsoft.EntityFrameworkCore.Migrations;

namespace MyCompanyName.AbpZeroTemplate.Migrations
{
    public partial class Change_AbpOrganizationUnits_Table_Add_PosCode : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "PosCode",
                table: "AbpOrganizationUnits",
                type: "nvarchar(6)",
                maxLength: 6,
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_AbpOrganizationUnits_PosCode",
                table: "AbpOrganizationUnits",
                column: "PosCode");

            migrationBuilder.AddForeignKey(
                name: "FK_AbpOrganizationUnits_BDHN_BuuCucs_PosCode",
                table: "AbpOrganizationUnits",
                column: "PosCode",
                principalTable: "BDHN_BuuCucs",
                principalColumn: "POSCode",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AbpOrganizationUnits_BDHN_BuuCucs_PosCode",
                table: "AbpOrganizationUnits");

            migrationBuilder.DropIndex(
                name: "IX_AbpOrganizationUnits_PosCode",
                table: "AbpOrganizationUnits");

            migrationBuilder.DropColumn(
                name: "PosCode",
                table: "AbpOrganizationUnits");
        }
    }
}
