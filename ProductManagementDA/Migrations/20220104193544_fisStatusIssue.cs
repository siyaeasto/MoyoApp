using Microsoft.EntityFrameworkCore.Migrations;

namespace ProductManagementDA.Migrations
{
    public partial class fisStatusIssue : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "productStatus",
                table: "Product",
                newName: "ProductStatus");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ProductStatus",
                table: "Product",
                newName: "productStatus");
        }
    }
}
