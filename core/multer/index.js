const multer = require("multer");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const path = `./public/tmp`;
    fs.mkdir(path, (error) => {
      cb(null, path);
    });
  },
  filename: (req, file, cb) => {
    cb(
      null,
      new Date().getTime() +
        "." +
        file.originalname.split(".")[file.originalname.split(".").length - 1]
    );
  },
});

exports.upload = multer({ storage: storage });
