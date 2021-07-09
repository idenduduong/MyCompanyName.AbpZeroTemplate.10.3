using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace MyCompanyName.AbpZeroTemplate.Migrations
{
    public partial class Regenerated_BaseEntity4951 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "CreationTime",
                table: "BaseEntities",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<long>(
                name: "CreatorUserId",
                table: "BaseEntities",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "DeleterUserId",
                table: "BaseEntities",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DeletionTime",
                table: "BaseEntities",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "BaseEntities",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<DateTime>(
                name: "LastModificationTime",
                table: "BaseEntities",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "LastModifierUserId",
                table: "BaseEntities",
                type: "bigint",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CreationTime",
                table: "BaseEntities");

            migrationBuilder.DropColumn(
                name: "CreatorUserId",
                table: "BaseEntities");

            migrationBuilder.DropColumn(
                name: "DeleterUserId",
                table: "BaseEntities");

            migrationBuilder.DropColumn(
                name: "DeletionTime",
                table: "BaseEntities");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "BaseEntities");

            migrationBuilder.DropColumn(
                name: "LastModificationTime",
                table: "BaseEntities");

            migrationBuilder.DropColumn(
                name: "LastModifierUserId",
                table: "BaseEntities");
        }
    }
}
