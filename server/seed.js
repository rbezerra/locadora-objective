const fs = require("fs");
const dotenv = require("dotenv");
const MongoClientAdapter = require("./src/infra/database/MongoClientAdapter");

dotenv.config();
const movies = fs.readFileSync("./movies-seed.json");
const jsonMovies = JSON.parse(movies);

const dbClient = MongoClientAdapter().getInstance();

const insertMovie = async (movie, collection) => {
  const result = await collection.insertOne(movie);
  console.log(`Filme ${movie.name} inserido com o id: ${result.insertedId}`);
};

const main = async () => {
  try {
    const database = await dbClient.db("locadora");
    const movies = await database.collection("movies");

    if ((await movies.count()) > 0) {
      console.log("Banco já populado");
      process.exit();
    }

    for (const movie of jsonMovies) {
      await insertMovie(movie, movies);
    }
  } catch (err) {
    console.log("ERRO", err);
  } finally {
    await dbClient.close();
    console.log("conexão encerrada");
    process.exit();
  }
};

main();
