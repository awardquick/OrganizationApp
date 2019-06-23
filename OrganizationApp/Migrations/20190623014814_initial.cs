using Microsoft.EntityFrameworkCore.Migrations;

namespace OrganizationApp.Migrations
{
    public partial class initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Organization",
                columns: table => new
                {
                    OrganizationID = table.Column<int>(nullable: false),
                    Name = table.Column<string>(unicode: false, maxLength: 20, nullable: false),
                    City = table.Column<string>(unicode: false, maxLength: 20, nullable: false),
                    Address = table.Column<string>(unicode: false, maxLength: 20, nullable: false),
                    State = table.Column<string>(nullable: false),
                    Zip = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Organization", x => x.OrganizationID);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    UserID = table.Column<int>(nullable: false),
                    UserStatus = table.Column<string>(unicode: false, maxLength: 20, nullable: false),
                    FirstName = table.Column<string>(unicode: false, maxLength: 20, nullable: false),
                    LastName = table.Column<string>(unicode: false, maxLength: 20, nullable: false),
                    Email = table.Column<string>(unicode: false, maxLength: 20, nullable: false),
                    UserRole = table.Column<string>(unicode: false, maxLength: 20, nullable: false),
                    OrganizationId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Users__1788CCAC8BC37DDC", x => x.UserID);
                    table.ForeignKey(
                        name: "FK__Users__Organizat__398D8EEE",
                        column: x => x.OrganizationId,
                        principalTable: "Organization",
                        principalColumn: "OrganizationID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Users_OrganizationId",
                table: "Users",
                column: "OrganizationId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "Organization");
        }
    }
}
