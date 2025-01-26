const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const {
  processMedia,
  getProcessedMedia
} = require('../controllers/mediaProcessController');

// Configure Multer storage (for POST uploads)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // or another temp folder
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});
const upload = multer({ storage });

// POST /  ->  Upload & process
router.post('/', upload.single('videoFile'), processMedia);

// GET /:baseName -> Retrieve presigned URL & bias info
router.get('/:baseName', getProcessedMedia);

module.exports = router;
