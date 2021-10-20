const db = require("../api/data/db-config")

const Users = require("./users-model");

describe("users model", () => {
	afterEach(async () => {
		// this function executes and clears out the table before each test
		await db("user").truncate();
	});
	describe("addNewUser()", () => {
		it("should insert a new user into the database", async () => {
			await Users.addNewUser({
				email: "lambda@mail.com",
				password: "lambda1234",
			});
			await Users.addNewUser({ email: "webDev@mail.com", password: "developer!" });

			const users = await db("user");

			expect(users).toHaveLength(2);
		});
	});
	describe("getUserById(id)", () => {
		it("should get all users in the database", async () => {
			await Users.addNewUser({
				email: "lambda@mail.com",
				password: "lambda1234",
			});
			const user = await Users.getUserById(1);

			expect(user.email).toBe("lambda@mail.com");
		});
	});

	describe("deleteUser()", () => {
		it("should delete user", async () => {
			await Users.addNewUser({
				email: "lambda@mail.com",
				password: "lambda1234",
			});
			await Users.addNewUser({
				email: "webDev@mail.com",
				password: "developer!",
			});
			await Users.deleteUser(1);
			const user = await Users.getUserById(1);

			expect(user).toBe(undefined);
		});
	});
});
