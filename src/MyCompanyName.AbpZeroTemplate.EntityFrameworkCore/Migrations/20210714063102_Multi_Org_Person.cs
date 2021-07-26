using Microsoft.EntityFrameworkCore.Migrations;

namespace MyCompanyName.AbpZeroTemplate.Migrations
{
    public partial class Multi_Org_Person : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "OrganizationUnitId",
                table: "PbPersons",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<int>(
                name: "TenantId",
                table: "PbPersons",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "OrganizationUnitId",
                table: "PbPersons");

            migrationBuilder.DropColumn(
                name: "TenantId",
                table: "PbPersons");
        }
    }
}
