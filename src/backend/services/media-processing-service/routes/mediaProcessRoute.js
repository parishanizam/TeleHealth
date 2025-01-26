const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const {
  processMedia,
  getProcessedMedia
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

router.post('/', upload.single('videoFile'), processMedia);
router.get('/:baseName', getProcessedMedia);

module.exports = router;
