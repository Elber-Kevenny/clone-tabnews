import database from "infra/database";


const cleanDatabase = async () => {
  await database.query("drop schema public cascade; create schema public")
}
beforeAll(cleanDatabase);
test("Get test /api/migrations should return status 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/migrations");

  const responseBody = await response.json();

  expect(response.status).toBe(200);
  expect(process.env.POSTGRES_HOST).toEqual("localhost");
  expect(Array.isArray(responseBody)).toBe(true);
  expect(responseBody.length).toBeGreaterThan(0);
});
