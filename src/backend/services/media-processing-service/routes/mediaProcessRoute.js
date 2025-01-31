const express = require('express');
const router = express.Router();
const multer = require('multer');

const {
  processMedia,
  getProcessedMedia,
  uploadAndProcessMedia
} = require('../controllers/mediaProcessController');

// Set up Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});
const upload = multer({ storage });

router.post('/upload', upload.single('videoFile'), uploadAndProcessMedia);
router.get('/:baseName', getProcessedMedia);

module.exports = router;
