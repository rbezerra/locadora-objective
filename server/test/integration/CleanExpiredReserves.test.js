const Reserve = require("../../src/entities/Reserve");
const MovieMemoryRepository = require("../../src/interfaces/repositories/MovieMemoryRepository");
const ReserveMemoryRepository = require("../../src/interfaces/repositories/ReserveMemoryRepository");
const CleanExpiredReserves = require("../../src/use_cases/CleanExpiredReserves");
const ReserveMovie = require("../../src/use_cases/ReserveMovie");

let cleanExpiredReserves;
let reserveMovie;
let movieRepository;
let reserveRepository;

beforeEach(() => {
  reserveRepository = new ReserveMemoryRepository();
  movieRepository = new MovieMemoryRepository();
  reserveMovie = new ReserveMovie(movieRepository, reserveRepository);
  cleanExpiredReserves = new CleanExpiredReserves(
    movieRepository,
    reserveRepository
  );
});

test("should remove the expired reserves", async () => {
  const movieId = "bff5e0e3-01ef-47ec-ac39-c72b88b8a3bf";
  const expiredReserve = Reserve.create(movieId);
  expiredReserve.expireAt = new Date();
  expiredReserve.expireAt.setHours(expiredReserve.expireAt.getHours() - 4);
  await reserveRepository.save(expiredReserve);

  const outputCleanExpiredReserves = await cleanExpiredReserves.execute();
  const outputMovie = await movieRepository.getById(
    "bff5e0e3-01ef-47ec-ac39-c72b88b8a3bf"
  );
  const outputReserve = await reserveRepository.getById(
    expiredReserve.reserveId
  );

  expect(outputCleanExpiredReserves).toBe(1);
  expect(outputMovie.isAvailable).toBeTruthy();
  expect(outputReserve.status).toBe("EXPIRED");
});
