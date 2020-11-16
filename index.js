const express = require("express");
const app = express();
const { logger } = require("./logger/logger");
require("dotenv").config();
require("./startup/db")();

const port = process.env.PORT;

app.listen(port, () => logger.info(`Listening to port ${port}`));
