const { logger } = require("../logger/logger");
module.exports = function (error, req, res, next) {
  res.status(500).send(error);
  logger.error(error);
};
