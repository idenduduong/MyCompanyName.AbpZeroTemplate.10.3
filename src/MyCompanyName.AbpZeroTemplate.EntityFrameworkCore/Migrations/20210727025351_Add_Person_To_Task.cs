using Microsoft.EntityFrameworkCore.Migrations;

namespace MyCompanyName.AbpZeroTemplate.Migrations
{
    public partial class Add_Person_To_Task : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "AssignedPersonId",
                table: "AppTasks",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_AppTasks_AssignedPersonId",
                table: "AppTasks",
                column: "AssignedPersonId");

            migrationBuilder.AddForeignKey(
                name: "FK_AppTasks_PbPersons_AssignedPersonId",
                table: "AppTasks",
                column: "AssignedPersonId",
                principalTable: "PbPersons",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AppTasks_PbPersons_AssignedPersonId",
                table: "AppTasks");

            migrationBuilder.DropIndex(
                name: "IX_AppTasks_AssignedPersonId",
                table: "AppTasks");

            migrationBuilder.DropColumn(
                name: "AssignedPersonId",
                table: "AppTasks");
        }
    }
}
