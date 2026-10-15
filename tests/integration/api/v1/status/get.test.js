test("Get test to return status 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const responseBody = await response.json();
  console.log(responseBody);

  expect(responseBody.updated_at).toBeTruthy();
  expect(responseBody.dependencies.database.max_conections).toBeTruthy();
  expect(responseBody.dependencies.database.version).toBeTruthy();
  expect(responseBody.dependencies.database.opened_connections).toBeTruthy();

  const unitDate = new Date(responseBody.updated_at).toISOString();
  expect(responseBody.updated_at).toEqual(unitDate);
  expect(responseBody.dependencies.database.version).toEqual("16.0");
  expect(responseBody.dependencies.database.max_conections).toEqual(100);
  expect(responseBody.dependencies.database.opened_connections).toEqual(1);
});
