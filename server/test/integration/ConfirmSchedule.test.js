const MovieMemoryRepository = require("../../src/interfaces/repositories/MovieMemoryRepository");
const ReserveMemoryRepository = require("../../src/interfaces/repositories/ReserveMemoryRepository");
const ScheduleMemoryRepository = require("../../src/interfaces/repositories/ScheduleMemoryRepository");
const ConfirmSchedule = require("../../src/use_cases/ConfirmSchedule");
const ReserveMovie = require("../../src/use_cases/ReserveMovie");

let confirmSchedule;
let reserveMovie;
let scheduleRepository;
let reserveRepository;
let movieRepository;

beforeEach(() => {
  scheduleRepository = new ScheduleMemoryRepository();
  reserveRepository = new ReserveMemoryRepository();
  movieRepository = new MovieMemoryRepository();
  reserveMovie = new ReserveMovie(movieRepository, reserveRepository);
  confirmSchedule = new ConfirmSchedule(
    scheduleRepository,
    reserveRepository,
    movieRepository
  );
});

test("should create a new schedule", async () => {
  const inputReserve = {
    movieId: "bff5e0e3-01ef-47ec-ac39-c72b88b8a3bf",
  };

  const outputReserve = await reserveMovie.execute(inputReserve.movieId);
  const inputSchedule = {
    reserveId: outputReserve.reserveId,
    customer: {
      name: "João das Neves",
      email: "joao@dasneves.com.br",
      phone: "559899999999",
    },
  };

  const outputSchedule = await confirmSchedule.execute(
    inputSchedule.reserveId,
    inputSchedule.customer.name,
    inputSchedule.customer.email,
    inputSchedule.customer.phone
  );

  expect(outputSchedule).toBeDefined();
  expect(outputSchedule.status).toBe("LEASED");
});

test("should throw error if reserve is not found", async () => {
  const inputSchedule = {
    reserveId: "ABC",
    customer: {
      name: "João das Neves",
      email: "joao@dasneves.com.br",
      phone: "559899999999",
    },
  };

  await expect(() =>
    confirmSchedule.execute(
      inputSchedule.reserveId,
      inputSchedule.customer.name,
      inputSchedule.customer.email,
      inputSchedule.customer.phone
    )
  ).rejects.toThrow(new Error("Reserve not found"));
});

test("should throw error if reserve is not waiting", async () => {
  const inputReserve = {
    movieId: "bff5e0e3-01ef-47ec-ac39-c72b88b8a3bf",
  };

  const outputReserve = await reserveMovie.execute(inputReserve.movieId);
  outputReserve.status = "FINISHED";
  await reserveRepository.update(outputReserve);
  const inputSchedule = {
    reserveId: outputReserve.reserveId,
    customer: {
      name: "João das Neves",
      email: "joao@dasneves.com.br",
      phone: "559899999999",
    },
  };
  await expect(() =>
    confirmSchedule.execute(
      inputSchedule.reserveId,
      inputSchedule.customer.name,
      inputSchedule.customer.email,
      inputSchedule.customer.phone
    )
  ).rejects.toThrow(new Error("Reserve is not available"));
});
