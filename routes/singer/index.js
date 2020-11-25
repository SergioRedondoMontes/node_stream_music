const express = require("express");
const { upload } = require("../../core/multer");
const router = express.Router();
const middleWares = require("../../middlewares");
const controllers = require("../../controllers");

router.post(
  "/upload",
  middleWares.auth.checkLoggedIn,
  upload.single("song"),
  controllers.singer.uploadSong
  //   (req, res) => {
  //     res.status(201).send("file uploaded");
  //   }
);

module.exports = router;
