import database from "infra/database";

const cleanDatabase = async () => {
  await database.query("drop schema public cascade; create schema public");
};
beforeAll(cleanDatabase);
test("Get test /api/migrations should return status 405", async () => {
  const response = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "DELETE",
  });


  expect(response.status).toBe(405);
  expect(process.env.POSTGRES_HOST).toEqual("localhost");
});
