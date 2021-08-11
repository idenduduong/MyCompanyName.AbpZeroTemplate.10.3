using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace MyCompanyName.AbpZeroTemplate.Migrations
{
    public partial class EditTheKhachHang : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CMT",
                table: "AbpUsers",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DiaChi",
                table: "AbpUsers",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DiaChiTamTru",
                table: "AbpUsers",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "EmployeeStatus",
                table: "AbpUsers",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "GhiChu",
                table: "AbpUsers",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "GioiTinh",
                table: "AbpUsers",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "MaNhanVien",
                table: "AbpUsers",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "NgayCap",
                table: "AbpUsers",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "NgaySinh",
                table: "AbpUsers",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "NoiCap",
                table: "AbpUsers",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "NoiSinh",
                table: "AbpUsers",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "PTCKBanThe",
                table: "AbpUsers",
                type: "float",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SoBHXH",
                table: "AbpUsers",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "UserType",
                table: "AbpUsers",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CMT",
                table: "AbpUsers");

            migrationBuilder.DropColumn(
                name: "DiaChi",
                table: "AbpUsers");

            migrationBuilder.DropColumn(
                name: "DiaChiTamTru",
                table: "AbpUsers");

            migrationBuilder.DropColumn(
                name: "EmployeeStatus",
                table: "AbpUsers");

            migrationBuilder.DropColumn(
                name: "GhiChu",
                table: "AbpUsers");

            migrationBuilder.DropColumn(
                name: "GioiTinh",
                table: "AbpUsers");

            migrationBuilder.DropColumn(
                name: "MaNhanVien",
                table: "AbpUsers");

            migrationBuilder.DropColumn(
                name: "NgayCap",
                table: "AbpUsers");

            migrationBuilder.DropColumn(
                name: "NgaySinh",
                table: "AbpUsers");

            migrationBuilder.DropColumn(
                name: "NoiCap",
                table: "AbpUsers");

            migrationBuilder.DropColumn(
                name: "NoiSinh",
                table: "AbpUsers");

            migrationBuilder.DropColumn(
                name: "PTCKBanThe",
                table: "AbpUsers");

            migrationBuilder.DropColumn(
                name: "SoBHXH",
                table: "AbpUsers");

            migrationBuilder.DropColumn(
                name: "UserType",
                table: "AbpUsers");
        }
    }
}
