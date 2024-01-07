const schedule = require("node-schedule");
const MongoClientAdapter = require("../database/MongoClientAdapter");
const MovieMongoRepository = require("../../interfaces/repositories/MovieMongoRepository");
const ReserveMongoRepository = require("../../interfaces/repositories/ReserveMongoRepository");
const CleanExpiredReserves = require("../../use_cases/CleanExpiredReserves");

const mongoClient = MongoClientAdapter().getInstance();
const movieRepository = new MovieMongoRepository(mongoClient);
const reserveRepository = new ReserveMongoRepository(mongoClient);
const cleanExpiredReserves = new CleanExpiredReserves(
  movieRepository,
  reserveRepository
);

exports.initCronJobs = () => {
  schedule.scheduleJob("*/1 * * * *", async () => {
    console.log("Iniciando limpeza das reservas expiradas");
    cleanedReserves = await cleanExpiredReserves.execute();
    console.log(`Foram eliminadas ${cleanedReserves} reservas expiradas`);
    console.log("Finalizando limpeza das reservas expiradas");
  });
};
