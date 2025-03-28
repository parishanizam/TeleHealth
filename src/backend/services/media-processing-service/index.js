const express = require("express");
const router = express.Router();
const mediaProcessRoute = require("./routes/mediaProcessRoute");

router.use("/", mediaProcessRoute);

module.exports = router;
