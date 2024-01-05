const http = require("http");
const request = require("supertest");
const MovieMemoryRepository = require("../../src/interfaces/repositories/MovieMemoryRepository");
const ReserveMemoryRepository = require("../../src/interfaces/repositories/ReserveMemoryRepository");
const ScheduleMemoryRepository = require("../../src/interfaces/repositories/ScheduleMemoryRepository");
const MainController = require("../../src/interfaces/controllers/MainController");
const App = require("../../src/frameworks/express/app");

let movieRepository;
let reserveRepository;
let scheduleRepository;
let mainController;
let app;

beforeEach(() => {
  movieRepository = new MovieMemoryRepository();
  reserveRepository = new ReserveMemoryRepository();
  scheduleRepository = new ScheduleMemoryRepository();
  mainController = new MainController(
    movieRepository,
    reserveRepository,
    scheduleRepository
  );
  const controllers = [{ path: "/api", instance: mainController }];

  app = new App(controllers);
});

describe("/api/all", () => {
  it("gets a list of movies", async () => {
    const response = await request(await app.getInstance()).get("/api/all");
    expect(response.status).toBe(200);
    expect(response.body.movies.length).toBeGreaterThan(0);
  });
});

describe("/api/book", () => {
  it("create a new reserve", async () => {
    const input = {
      movieId: "bff5e0e3-01ef-47ec-ac39-c72b88b8a3bf",
    };

    const response = await request(await app.getInstance())
      .post("/api/book")
      .send(input);
    expect(response.status).toBe(201);
    expect(response.body.reserveId).toBeDefined();
    expect(response.body.status).toBe("WAITING");
  });

  it("should return error if movie is already reserved", async () => {
    const input = {
      movieId: "bff5e0e3-01ef-47ec-ac39-c72b88b8a3bf",
    };
    await request(await app.getInstance())
      .post("/api/book")
      .send(input);
    const response = await request(await app.getInstance())
      .post("/api/book")
      .send(input);

    expect(response.status).toBe(500);
    expect(response.body.error).toBe("Movie is not available");
  });
});

describe("/api/confirm", () => {
  it("should create a schedule", async () => {
    const input = {
      movieId: "bff5e0e3-01ef-47ec-ac39-c72b88b8a3bf",
    };

    const responseBook = await request(await app.getInstance())
      .post("/api/book")
      .send(input);

    const inputConfirm = {
      reserveId: responseBook.body.reserveId,
      customer: {
        name: "João das Neves",
        email: "joao@dasneves.com.br",
        phone: "559899999999",
      },
    };

    const responseConfirm = await request(await app.getInstance())
      .post("/api/confirm")
      .send(inputConfirm);
    expect(responseConfirm).toBeDefined();
    expect(responseConfirm.status).toBe(200);
    expect(responseConfirm.body.status).toBe("LEASED");
  });

  it("should return a error if reserveId is invalid", async () => {
    const inputConfirm = {
      reserveId: null,
      customer: {
        name: "João das Neves",
        email: "joao@dasneves.com.br",
        phone: "559899999999",
      },
    };

    const responseConfirm = await request(await app.getInstance())
      .post("/api/confirm")
      .send(inputConfirm);
    expect(responseConfirm).toBeDefined();
    expect(responseConfirm.status).toBe(400);
    expect(responseConfirm.body.message).toBe("reserveId is required");
  });

  it("should return a error if customer name is invalid", async () => {
    const input = {
      movieId: "bff5e0e3-01ef-47ec-ac39-c72b88b8a3bf",
    };

    const responseBook = await request(await app.getInstance())
      .post("/api/book")
      .send(input);

    const inputConfirm = {
      reserveId: responseBook.body.reserveId,
      customer: {
        name: null,
        email: "joao@dasneves.com.br",
        phone: "559899999999",
      },
    };

    const responseConfirm = await request(await app.getInstance())
      .post("/api/confirm")
      .send(inputConfirm);
    expect(responseConfirm).toBeDefined();
    expect(responseConfirm.status).toBe(400);
    expect(responseConfirm.body.message).toBe("customer name is required");
  });

  it("should return a error if customer email is invalid", async () => {
    const input = {
      movieId: "bff5e0e3-01ef-47ec-ac39-c72b88b8a3bf",
    };

    const responseBook = await request(await app.getInstance())
      .post("/api/book")
      .send(input);

    const inputConfirm = {
      reserveId: responseBook.body.reserveId,
      customer: {
        name: "João das Neves",
        email: null,
        phone: "559899999999",
      },
    };

    const responseConfirm = await request(await app.getInstance())
      .post("/api/confirm")
      .send(inputConfirm);
    expect(responseConfirm).toBeDefined();
    expect(responseConfirm.status).toBe(400);
    expect(responseConfirm.body.message).toBe("customer email is required");
  });

  it("should return a error if customer phone is invalid", async () => {
    const input = {
      movieId: "bff5e0e3-01ef-47ec-ac39-c72b88b8a3bf",
    };

    const responseBook = await request(await app.getInstance())
      .post("/api/book")
      .send(input);

    const inputConfirm = {
      reserveId: responseBook.body.reserveId,
      customer: {
        name: "João das Neves",
        email: "joao@dasneves.com.br",
        phone: null,
      },
    };

    const responseConfirm = await request(await app.getInstance())
      .post("/api/confirm")
      .send(inputConfirm);
    expect(responseConfirm).toBeDefined();
    expect(responseConfirm.status).toBe(400);
    expect(responseConfirm.body.message).toBe("customer phone is required");
  });
});

describe("/api/return", () => {
  it("should return a movie", async () => {
    const input = {
      movieId: "bff5e0e3-01ef-47ec-ac39-c72b88b8a3bf",
    };

    const responseBook = await request(await app.getInstance())
      .post("/api/book")
      .send(input);

    const inputConfirm = {
      reserveId: responseBook.body.reserveId,
      customer: {
        name: "João das Neves",
        email: "joao@dasneves.com.br",
        phone: "559899999999",
      },
    };

    const responseConfirm = await request(await app.getInstance())
      .post("/api/confirm")
      .send(inputConfirm);

    const inputReturn = {
      scheduleId: responseConfirm.body.scheduleId,
    };

    const responseReturn = await request(await app.getInstance())
      .put("/api/return")
      .send(inputReturn);

    expect(responseReturn).toBeDefined();
    expect(responseReturn.status).toBe(200);
    expect(responseReturn.body.status).toBe("RETURNED");
  });

  it("should return error if scheduleId is invalid", async () => {
    const inputReturn = {
      scheduleId: null,
    };

    const responseReturn = await request(await app.getInstance())
      .put("/api/return")
      .send(inputReturn);

    expect(responseReturn).toBeDefined();
    expect(responseReturn.status).toBe(400);
    expect(responseReturn.body.message).toBe("scheduleId is required");
  });
});
