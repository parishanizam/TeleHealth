/**
 * Author: Promish Kandel, Mitchell Weingust, Jasmine Sun-Hu, Parisha Nizam
 * Date: January 19, 2025
 * Purpose: Sets up and exports the base route for media processing features,
 * including uploading, processing, and retrieving video/audio files and assessment history.
 */

const express = require("express");
const router = express.Router();
const mediaProcessRoute = require("./routes/mediaProcessRoute");

router.use("/", mediaProcessRoute);

module.exports = router;
