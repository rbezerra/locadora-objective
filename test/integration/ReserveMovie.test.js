const MovieMemoryRepository = require("../../src/interfaces/repositories/MovieMemoryRepository");
const ReserveMemoryRepository = require("../../src/interfaces/repositories/ReserveMemoryRepository");
const ReserveMovie = require("../../src/use_cases/ReserveMovie");

let reserveMovie;
let movieMemoryRepository;

beforeEach(() => {
  movieMemoryRepository = new MovieMemoryRepository();
  reserveMemoryRepository = new ReserveMemoryRepository();
  reserveMovie = new ReserveMovie(
    movieMemoryRepository,
    reserveMemoryRepository
  );
});

test("should create a new reserve", async () => {
  const input = {
    movieId: "bff5e0e3-01ef-47ec-ac39-c72b88b8a3bf",
  };

  const output = await reserveMovie.execute(input.movieId);
  expect(output).toBeDefined();
  expect(output.status).toBe("WAITING");
});

test("should throw error if movie is not available", async () => {
  const input = {
    movieId: "2d7b23f1-2ba3-480b-85f3-fab0c6fb3a874",
  };

  await expect(() => reserveMovie.execute(input.movieId)).rejects.toThrow(
    new Error("Movie is not available")
  );
});

test("should throw error if movie not found", async () => {
  const input = {
    movieId: "ABC",
  };

  await expect(() => reserveMovie.execute(input.movieId)).rejects.toThrow(
    new Error("Movie not found")
  );
});

test("should create only one reserve per movie", async () => {
  const input = {
    movieId: "4353f46f-54bf-435e-b2ce-4187a26097a5",
  };

  const output = await reserveMovie.execute(input.movieId);
  expect(output).toBeDefined();
  expect(output.status).toBe("WAITING");

  await expect(() => reserveMovie.execute(input.movieId)).rejects.toThrow(
    new Error("Movie is not available")
  );
});
