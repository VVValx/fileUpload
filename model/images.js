const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema(
  {
    originalname: { type: String, required: true },
    filename: { type: String, required: true },
    path: { type: String, required: true },
    size: { type: Number, required: true },
  },
  { timestamps: true }
);

const Image = mongoose.model("Image", imageSchema);

module.exports = {
  Image,
};
