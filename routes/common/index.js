const express = require("express");
const router = express.Router();
// const middleWares = require("../../middlewares");
const controllers = require("../../controllers");
let multer = require("multer");
const fs = require("fs");

let storage = multer.diskStorage({
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

let upload = multer({ storage: storage });

// AUTH
// router.post("/signup", controllers.common.signup);
router.post("/auth/login", controllers.common.login);
router.post("/auth/signup", controllers.common.signup);

// MUSIC
router.get("/music", controllers.common.getSongs);

module.exports = router;
