const crypto = require("crypto");
const Movie = require("../../src/entities/Movie");

test("should create a movie", () => {
  const movie = Movie.create(
    "The Godfather",
    "Don Vito Corleone, head of a mafia family, decides to hand over his empire to his youngest son Michael. However, his decision unintentionally puts the lives of his loved ones in grave danger",
    9.2
  );

  expect(movie.movieId).toBeDefined();
});

test("should restore a movie", () => {
  const uuid = crypto.randomUUID();
  const movie = Movie.restore(
    uuid,
    "The Godfather",
    "Don Vito Corleone, head of a mafia family, decides to hand over his empire to his youngest son Michael. However, his decision unintentionally puts the lives of his loved ones in grave danger",
    9.2
  );

  expect(movie).toBeDefined();
  expect(movie.movieId).toBe(uuid);
});
