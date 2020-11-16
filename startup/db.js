const mongoose = require("mongoose");
const { logger } = require("../logger/logger");

module.exports = function () {
  mongoose
    .connect(process.env.DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => logger.info("Connected to database"))
    .catch((err) => logger.error(err));
};
