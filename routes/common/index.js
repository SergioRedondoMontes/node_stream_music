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
router.get("/auth/login", (req, res) => {
  res.send("hola");
});
router.post("/auth/login", controllers.common.login);
router.post("/auth/signup", controllers.common.signup);

// TO IMPLEMENT
// router.get(
//   "/profile",
//   middleWares.auth.checkLoggedIn,
//   controllers.common.getProfile
// );

// router.post(
//   "/profile",
//   middleWares.auth.checkLoggedIn,
//   controllers.common.updateUser
// );

// router.get(
//   "/profile/delete",
//   middleWares.auth.checkLoggedIn,
//   controllers.common.deleteUser
// );

// router.get(
//   "/challenges",
//   middleWares.auth.checkLoggedIn,
//   middleWares.auth.checkAuthChallenger,
//   controllers.common.getMyChallenges
// );

// router.get(
//   "/challenges/:challengeId",
//   middleWares.auth.checkExistsLoggedIn,
//   controllers.common.getChallenge
// );

// router.get(
//   "/challenges/:challengeId/edit",
//   middleWares.auth.checkLoggedIn,
//   middleWares.auth.checkAuthChallenger,
//   middleWares.challenge.checkAccessActionChallenge("update"),
//   controllers.common.getMyChallenge
// );

// router.get(
//   "/challenges/:challengeId/delete",
//   middleWares.auth.checkLoggedIn,
//   middleWares.auth.checkAuthChallenger,
//   middleWares.challenge.checkAccessActionChallenge("update"),
//   controllers.common.deleteChallenge
// );

// router.post(
//   "/challenges/:challengeId/edit",
//   middleWares.auth.checkLoggedIn,
//   middleWares.auth.checkAuthChallenger,
//   middleWares.challenge.checkAccessActionChallenge("update"),
//   controllers.common.updateChallenge
// );

// router.post(
//   "/challenges",
//   middleWares.auth.checkLoggedIn,
//   upload.fields([{ name: "base" }, { name: "example" }]),
//   controllers.common.postChallenge
// );

// router.put("/challenges/:challengeId", controllers.common.updateChallenge);

// router.delete("/challenges/:challengeId", controllers.common.deleteChallenge);

// router.post(
//   "/challenges/:challengeId/participants",
//   middleWares.auth.checkLoggedIn,
//   controllers.common.updateParticipants
// );

// router.put(
//   "/challenges/:challengeId/ranking",
//   middleWares.auth.checkLoggedIn,
//   controllers.common.updateRanking
// );

// router.get("/signout", (req, res) => {
//   res.clearCookie("authorization-kaggle");
//   res.redirect("/");
// });

// router.post(
//   "/challenges/:challengeId/uploadPredictions",
//   upload.single("competition"),
//   controllers.common.loginBeforePredictions,
//   controllers.common.uploadPredictions
// );

// router.post(
//   "/testUpload",
//   upload.fields([{ name: "uploaded_file" }, { name: "uploaded_file2" }]),
//   controllers.common.testUpload,
//   (req, res) => {
//     res.send("guardado");
//   }
// );

module.exports = router;
