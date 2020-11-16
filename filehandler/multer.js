const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "client/src/components/uploads");
  },

  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);

    cb(null, `${file.fieldname}-${Date.now()}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 1024 * 1024 * 5 },
  fileFilter: function (req, file, cb) {
    const name = file.originalname;
    if (!name.match(/\.(png|jpeg|jpg)$/))
      return cb(new Error("Only images are allowed"));

    cb(null, true);
  },
});

module.exports = upload;
