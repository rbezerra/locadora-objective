const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./../../../swagger.json");
class App {
  constructor(controllers) {
    this.app = express();
    this.app.use(express.json());
    this.app.use(cors());
    this.app.use("/swagger", swaggerUi.serve);
    this.app.get("/swagger", swaggerUi.setup(swaggerDocument));

    for (const controller of controllers)
      this.app.use(controller.path, controller.instance.getRouter());
  }

  async getInstance() {
    return this.app;
  }

  async listen(port) {
    return this.app.listen(port, () => {
      console.log(`Servidor iniciado na porta ${port} `);
    });
  }
}

module.exports = App;
