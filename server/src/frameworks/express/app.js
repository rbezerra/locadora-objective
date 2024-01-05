const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./../../../swagger.json");
const mainController = require("../../interfaces/controllers/MainController");

dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api", mainController);
app.use("/swagger", swaggerUi.serve);
app.get("/swagger", swaggerUi.setup(swaggerDocument));

app.listen(PORT, () => {
  console.log(`Servidor iniciado na porta ${PORT} `);
});

module.exports = app;
