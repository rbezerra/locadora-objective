const Reserve = require("../../src/entities/Reserve");

test("should create a reserve", () => {
  const reserve = Reserve.create("4353f46f-54bf-435e-b2ce-4187a26097a5");

  expect(reserve).toBeDefined();
  expect(reserve.status).toBe("WAITING");
});
