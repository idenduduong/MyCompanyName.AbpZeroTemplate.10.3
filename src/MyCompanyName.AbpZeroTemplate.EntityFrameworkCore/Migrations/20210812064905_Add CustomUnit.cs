using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace MyCompanyName.AbpZeroTemplate.Migrations
{
    public partial class AddCustomUnit : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "AccountNumber",
                table: "AbpOrganizationUnits",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Address",
                table: "AbpOrganizationUnits",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "AreaId",
                table: "AbpOrganizationUnits",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "AreaName",
                table: "AbpOrganizationUnits",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Discriminator",
                table: "AbpOrganizationUnits",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Lineage",
                table: "AbpOrganizationUnits",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Phone",
                table: "AbpOrganizationUnits",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TaxCode",
                table: "AbpOrganizationUnits",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "UnitCode",
                table: "AbpOrganizationUnits",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Website",
                table: "AbpOrganizationUnits",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AccountNumber",
                table: "AbpOrganizationUnits");

            migrationBuilder.DropColumn(
                name: "Address",
                table: "AbpOrganizationUnits");

            migrationBuilder.DropColumn(
                name: "AreaId",
                table: "AbpOrganizationUnits");

            migrationBuilder.DropColumn(
                name: "AreaName",
                table: "AbpOrganizationUnits");

            migrationBuilder.DropColumn(
                name: "Discriminator",
                table: "AbpOrganizationUnits");

            migrationBuilder.DropColumn(
                name: "Lineage",
                table: "AbpOrganizationUnits");

            migrationBuilder.DropColumn(
                name: "Phone",
                table: "AbpOrganizationUnits");

            migrationBuilder.DropColumn(
                name: "TaxCode",
                table: "AbpOrganizationUnits");

            migrationBuilder.DropColumn(
                name: "UnitCode",
                table: "AbpOrganizationUnits");

            migrationBuilder.DropColumn(
                name: "Website",
                table: "AbpOrganizationUnits");
        }
    }
}
