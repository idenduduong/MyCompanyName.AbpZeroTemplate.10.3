using Microsoft.EntityFrameworkCore.Migrations;

namespace MyCompanyName.AbpZeroTemplate.Migrations
{
    public partial class Update_BuuCucs_Table : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "ProvinceCode",
                table: "BDHN_BuuCucs",
                type: "nvarchar(3)",
                maxLength: 3,
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(3)",
                oldMaxLength: 3,
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_BDHN_BuuCucs_ProvinceCode",
                table: "BDHN_BuuCucs",
                column: "ProvinceCode");

            migrationBuilder.AddForeignKey(
                name: "FK_BDHN_BuuCucs_BDHN_Provinces_ProvinceCode",
                table: "BDHN_BuuCucs",
                column: "ProvinceCode",
                principalTable: "BDHN_Provinces",
                principalColumn: "ProvinceCode",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BDHN_BuuCucs_BDHN_Provinces_ProvinceCode",
                table: "BDHN_BuuCucs");

            migrationBuilder.DropIndex(
                name: "IX_BDHN_BuuCucs_ProvinceCode",
                table: "BDHN_BuuCucs");

            migrationBuilder.AlterColumn<string>(
                name: "ProvinceCode",
                table: "BDHN_BuuCucs",
                type: "nvarchar(3)",
                maxLength: 3,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(3)",
                oldMaxLength: 3);
        }
    }
}
