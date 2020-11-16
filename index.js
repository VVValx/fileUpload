const express = require("express");
require("express-async-errors");
const app = express();
const { logger } = require("./logger/logger");
require("dotenv").config();
require("./startup/db")();
require("./startup/routes")(app);

//defining port
const port = process.env.PORT;

app.listen(port, () => logger.info(`Listening to port ${port}`));
