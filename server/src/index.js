const dotenv = require("dotenv");
dotenv.config();

const App = require("./frameworks/express/app");
const MongoClientAdapter = require("./infra/database/MongoClientAdapter");
const MainController = require("./interfaces/controllers/MainController");
const MovieMongoRepository = require("./interfaces/repositories/MovieMongoRepository");
const ReserveMongoRepository = require("./interfaces/repositories/ReserveMongoRepository");
const ScheduleMongoRepository = require("./interfaces/repositories/ScheduleMongoRepository");
const cronJobs = require("./infra/cronjobs/CronJobs.js");

const PORT = process.env.PORT || 3000;

const mongoClient = MongoClientAdapter().getInstance();
const movieRepository = new MovieMongoRepository(mongoClient);
const reserveRepository = new ReserveMongoRepository(mongoClient);
const scheduleRepository = new ScheduleMongoRepository(mongoClient);
const mainController = new MainController(
  movieRepository,
  reserveRepository,
  scheduleRepository
);

const controllers = [{ path: "/api", instance: mainController }];

const app = new App(controllers);

cronJobs.initCronJobs();

app.listen(PORT);
