const MovieMemoryRepository = require("../../src/interfaces/repositories/MovieMemoryRepository");
const ReserveMemoryRepository = require("../../src/interfaces/repositories/ReserveMemoryRepository");
const ScheduleMemoryRepository = require("../../src/interfaces/repositories/ScheduleMemoryRepository");
const ConfirmSchedule = require("../../src/use_cases/ConfirmSchedule");
const ReserveMovie = require("../../src/use_cases/ReserveMovie");
const ReturnMovie = require("../../src/use_cases/ReturnMovie");

let returnMovie;
let reserveMovie;
let movieRepository;
let scheduleRepository;
let reserveRepository;
let confirmSchedule;

beforeEach(() => {
  movieRepository = new MovieMemoryRepository();
  scheduleRepository = new ScheduleMemoryRepository();
  reserveRepository = new ReserveMemoryRepository();
  reserveMovie = new ReserveMovie(movieRepository, reserveRepository);
  returnMovie = new ReturnMovie(
    movieRepository,
    scheduleRepository,
    reserveRepository
  );
  confirmSchedule = new ConfirmSchedule(
    scheduleRepository,
    reserveRepository,
    movieRepository
  );
});

test("should return movie", async () => {
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
    inputSchedule.customer
  );
  const inputReturnMovie = {
    scheduleId: outputSchedule.scheduleId,
  };
  const outputReturnMovie = await returnMovie.execute(
    inputReturnMovie.scheduleId
  );
  expect(outputReturnMovie).toBeDefined();
  expect(outputReturnMovie.status).toBe("RETURNED");
});

test("should throw error if the schedule not exists", async () => {
  const inputReturnMovie = {
    scheduleId: "ABC",
  };

  await expect(() =>
    returnMovie.execute(inputReturnMovie.scheduleId)
  ).rejects.toThrow(new Error("Schedule not found"));
});

test("should throw error if a schedule is already finished", async () => {
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
    inputSchedule.customer
  );
  const inputReturnMovie = {
    scheduleId: outputSchedule.scheduleId,
  };
  const outputReturnMovie = await returnMovie.execute(
    inputReturnMovie.scheduleId
  );
  await expect(() =>
    returnMovie.execute(inputReturnMovie.scheduleId)
  ).rejects.toThrow(new Error("Schedule already finished"));
});
