const express = require("express");
const router = express.Router();
const upload = require("../filehandler/multer");
const { Image } = require("../model/images");

router.post("/upload", upload.single("avatar"), async (req, res) => {
  let image = await Image.findOne({ originalname: req.file.originalname });
  if (image) return res.status(400).send("Image already in database");

  if (!req.file || Object.keys(req.file).length === 0)
    return res.status(400).send("No image selected");

  const { originalname, filename, path, size } = req.file;

  image = new Image({
    originalname,
    filename,
    path,
    size,
  });

  image = await image.save();

  res.send({
    _id: image._id,
    filename: image.filename,
  });
});

module.exports = router;
