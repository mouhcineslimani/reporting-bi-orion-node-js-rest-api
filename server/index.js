const express = require("express");
const cors = require("cors");
const chartsRouter = require("./routes/charts-router");
class Server {
  constructor(port = 8080) {
    this.port = port;
    this.app = express();
    this.config();
    this.routing();
  }

  config() {
    this.app.use(express.static("webapp/public"));
    this.app.use(cors());
  }

  routing() {
    this.app.use("/orion/charts", chartsRouter);
  }

  start() {
    this.app.listen(this.port, () => {
      console.log("Server is running ...");
    });
  }
}

module.exports = Server;
