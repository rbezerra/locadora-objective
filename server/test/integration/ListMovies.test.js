const MovieMemoryRepository = require("../../src/interfaces/repositories/MovieMemoryRepository");
const ListMovies = require("../../src/use_cases/ListMovies");

let listMovies;
let movieMemoryRepository;

beforeEach(() => {
  movieMemoryRepository = new MovieMemoryRepository();
  listMovies = new ListMovies(movieMemoryRepository);
});

test("should list movies in repository", async () => {
  const outputListMovies = await listMovies.execute();
  expect(outputListMovies).toBeDefined();
  expect(outputListMovies?.movies?.length).toBeGreaterThan(0);
});

test("should return a list of movies of certain quantity", async () => {
  const outputListMovies = await listMovies.execute(5, 0);
  expect(outputListMovies).toBeDefined();
  expect(outputListMovies?.movies?.length).toBe(5);
});

test("should return a list of available movies only", async () => {
  const outputListMovies = await listMovies.execute();
  expect(outputListMovies).toBeDefined();
  expect(outputListMovies?.movies?.length).toBe(9);
});
