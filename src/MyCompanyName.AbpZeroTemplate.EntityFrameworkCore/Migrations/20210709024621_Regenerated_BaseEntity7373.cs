using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace MyCompanyName.AbpZeroTemplate.Migrations
{
    public partial class Regenerated_BaseEntity7373 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "BaseEntityId",
                table: "Childs",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "BaseEntities",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TenantId = table.Column<int>(type: "int", nullable: true),
                    BaseProp1 = table.Column<string>(type: "nvarchar(max)", nullable: true),
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
                    table.PrimaryKey("PK_BaseEntities", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BaseEntities_AbpOrganizationUnits_OrganizationUnitId",
                        column: x => x.OrganizationUnitId,
                        principalTable: "AbpOrganizationUnits",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Childs_BaseEntityId",
                table: "Childs",
                column: "BaseEntityId");

            migrationBuilder.CreateIndex(
                name: "IX_BaseEntities_OrganizationUnitId",
                table: "BaseEntities",
                column: "OrganizationUnitId");

            migrationBuilder.CreateIndex(
                name: "IX_BaseEntities_TenantId",
                table: "BaseEntities",
                column: "TenantId");

            migrationBuilder.AddForeignKey(
                name: "FK_Childs_BaseEntities_BaseEntityId",
                table: "Childs",
                column: "BaseEntityId",
                principalTable: "BaseEntities",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Childs_BaseEntities_BaseEntityId",
                table: "Childs");

            migrationBuilder.DropTable(
                name: "BaseEntities");

            migrationBuilder.DropIndex(
                name: "IX_Childs_BaseEntityId",
                table: "Childs");

            migrationBuilder.DropColumn(
                name: "BaseEntityId",
                table: "Childs");
        }
    }
}
