/**
 * Author: Promish Kandel, Mitchell Weingust, Jasmine Sun-Hu, Parisha Nizam
 * Date: January 19, 2025
 * Purpose: Defines Express routes for uploading, processing, and retrieving
 * media files (video/audio) related to assessments.
 */


const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const { loadJsonFromS3, s3Client } = require("../config/s3Config");
const { GetObjectCommand } = require("@aws-sdk/client-s3");
const {
  uploadAndProcessMedia,
  getProcessedMedia,
  getMediaByFilename,
} = require("../controllers/mediaProcessController");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

router.post(
  "/",
  upload.fields([
    { name: "videoFile", maxCount: 1 },
    { name: "audioFiles", maxCount: 100 },
  ]),
  uploadAndProcessMedia,
);

// New route to fetch video by `parentUsername_assessmentId.mp4`
router.get("/:parentUsername/:folderName/:assessmentId", getMediaByFilename);

function streamToString(stream) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    stream.on("data", (chunk) => chunks.push(chunk));
    stream.on("error", reject);
    stream.on("end", () => {
      resolve(Buffer.concat(chunks).toString("utf-8"));
    });
  });
}

router.get("/history/:parentUsername", async (req, res) => {
  const { parentUsername } = req.params;
  const historyKey = `${parentUsername}/${parentUsername}_history.json`;
  try {
    const command = new GetObjectCommand({
      Bucket: process.env.MEDIA_BUCKET || "telehealth-media-processing",
      Key: historyKey,
    });
    const response = await s3Client.send(command);
    const bodyString = await streamToString(response.Body);
    const historyData = JSON.parse(bodyString);
    res.json(historyData);
  } catch (e) {
    console.error("Error retrieving history:", e.message);
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;