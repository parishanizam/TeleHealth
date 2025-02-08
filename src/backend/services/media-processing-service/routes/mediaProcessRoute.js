const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

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
    { name: 'audioFiles', maxCount: 10 },  // Expect multiple audio files (up to 10)
  ]),
  uploadAndProcessMedia
);

// 🔹 New route to fetch video by `parentUsername_assessmentId.mp4`
router.get('/:parentUsername/:assessmentId', getMediaByFilename);

module.exports = router;
