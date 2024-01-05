const Reserve = require("../../src/entities/Reserve");
const Schedule = require("../../src/entities/Schedule");

test("should create a schedule", () => {
  const reserve = Reserve.create("4353f46f-54bf-435e-b2ce-4187a26097a5");
  const schedule = Schedule.create(reserve.reserveId, {
    name: "João das Neves",
    email: "joao@dasneves.com.br",
    phone: "559899999999",
  });

  expect(schedule).toBeDefined()
  expect(schedule.status).toBe('LEASED')
});
