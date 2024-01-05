const express = require("express");
const ListMovies = require("../../use_cases/ListMovies");
const ReserveMovie = require("../../use_cases/ReserveMovie");
const ConfirmSchedule = require("../../use_cases/ConfirmSchedule");
const ReturnMovie = require("../../use_cases/ReturnMovie");
const MongoClientAdapter = require("../../infra/database/MongoClientAdapter");
const MovieMongoRepository = require("../repositories/MovieMongoRepository");
const ReserveMongoRepository = require("../repositories/ReserveMongoRepository");
const ScheduleMongoRepository = require("../repositories/ScheduleMongoRepository");

const mongoClient = MongoClientAdapter().getInstance();
const movieRepository = new MovieMongoRepository(mongoClient);
const reserveRepository = new ReserveMongoRepository(mongoClient);
const scheduleRepository = new ScheduleMongoRepository(mongoClient);
const router = express.Router();

router.get("/all", async (req, res) => {
  try {
    const listMovies = new ListMovies(movieRepository);
    const movies = await listMovies.execute();
    res.status(200).json(movies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/book", async (req, res) => {
  try {
    const { movieId } = req.body;
    if (!movieId) res.status(400).json({ message: "movieId is required" });
    const reserveMovie = new ReserveMovie(movieRepository, reserveRepository);
    const output = await reserveMovie.execute(movieId);
    res.status(201).json(output);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/confirm", async (req, res) => {
  try {
    const { reserveId, customer } = req.body;

    if (!reserveId) res.status(400).json({ message: "movieId is required" });
    if (!customer.name)
      res.status(400).json({ message: "customer name is required" });
    if (!customer.email)
      res.status(400).json({ message: "customer email is required" });
    if (!customer.phone)
      res.status(400).json({ message: "customer phone is required" });

    const confirmSchedule = new ConfirmSchedule(
      scheduleRepository,
      reserveRepository,
      movieRepository
    );
    const output = await confirmSchedule.execute(reserveId, customer);
    res.status(200).json(output);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/return", async (req, res) => {
  try {
    const { scheduleId } = req.body;
    if (!scheduleId)
      res.status(400).json({ message: "scheduleId is required" });

    const returnMovie = new ReturnMovie(
      movieRepository,
      scheduleRepository,
      reserveRepository
    );

    const output = await returnMovie.execute(scheduleId);
    res.status(200).json(output);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
