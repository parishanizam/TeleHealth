const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const { loadJsonFromS3, s3Client } = require('../config/s3Config');
const { GetObjectCommand } = require('@aws-sdk/client-s3');
const {
  uploadAndProcessMedia,
  getProcessedMedia,
  getMediaByFilename,  
} = require('../controllers/mediaProcessController');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});
const upload = multer({ storage });

router.post(
  '/',
  upload.fields([
    { name: 'videoFile', maxCount: 1 },   // Expect one video file
    { name: 'audioFiles', maxCount: 100 },  // Expect multiple audio files (up to 100)
  ]),
  uploadAndProcessMedia
);

// New route to fetch video by `parentUsername_assessmentId.mp4`
router.get('/:parentUsername/:folderName/:assessmentId', getMediaByFilename);

function streamToString(stream) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    stream.on('data', (chunk) => chunks.push(chunk));
    stream.on('error', reject);
    stream.on('end', () => {
      resolve(Buffer.concat(chunks).toString('utf-8'));
    });
  });
}

router.get('/history/:parentUsername', async (req, res) => {
  const { parentUsername } = req.params;
  // Construct the key for the history file (assuming it's stored as "parentUsername/parentUsername_history.json")
  const historyKey = `${parentUsername}/${parentUsername}_history.json`;
  try {
    const command = new GetObjectCommand({
      Bucket: process.env.MEDIA_BUCKET || 'telehealth-media-processing',
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
