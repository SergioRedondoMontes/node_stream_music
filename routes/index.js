const express = require("express");
const router = express.Router();

const common = require("./common");
// const admin = require("./admin");
const singer = require("./singer");
// const start = require("./start");

router.use("/api", common);
// router.use("/admin", admin);
router.use("/api/singer", singer);
// router.use("/start", start);

module.exports = router;
