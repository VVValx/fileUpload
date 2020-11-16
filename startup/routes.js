const express = require("express");
const images = require("../routes/images");
const errors = require("../middlewares/errors");

module.exports = function (app) {
  app.use(express.json());

  //calling routes
  app.use("/images", images);
  app.use(errors);
};
