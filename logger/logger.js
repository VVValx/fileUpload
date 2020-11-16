const winston = require("winston");
const { createLogger, format, transports } = winston;
const { combine, timestamp, prettyPrint } = format;

const logger = createLogger({
  format: combine(timestamp(), prettyPrint()),
  transports: [
    new transports.File({ filename: "logs/error.log", level: "error" }),
    new transports.File({ filename: "logs/info.log", level: "info" }),
  ],

  exceptionHandlers: [new transports.File({ filename: "logs/exception.log" })],

  rejectionHandlers: [new transports.File({ filename: "logs/rejections.log" })],
});

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new transports.Console({
      format: format.simple(),
    })
  );
}

module.exports = {
  winston,
  logger,
};
