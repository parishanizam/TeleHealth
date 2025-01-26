const path = require('path');
const fs = require('fs');
const { GetObjectCommand } = require('@aws-sdk/client-s3');

const { detectMultipleFaces } = require('../helpers/videoProcessing');
const { extractAudioToWav, detectKeywords } = require('../helpers/audioProcessing');
const {
  uploadFileToS3,
  uploadToS3,
  getVideoPresignedUrl,
  s3Client
} = require('../config/s3Config');

const MEDIA_BUCKET = process.env.MEDIA_BUCKET || 'telehealth-media-processing';

// POST controller
exports.processMedia = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No video file uploaded' });
    }

    // 1. Basic info
    const originalFilename = req.file.originalname;
    const tempVideoPath = req.file.path;

    // 2. Face detection
    const faceData = await detectMultipleFaces(tempVideoPath);

    // 3. Audio extraction + keyword detection
    const outputDir = path.join(__dirname, '../../tmp');
    if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);
    const wavPath = await extractAudioToWav(tempVideoPath, outputDir);
    const audioEvents = await detectKeywords(wavPath);

    // 4. Combine results into bias
    const biasTimestamps = combineDetections(faceData, audioEvents);

    // 5. Upload .mp4
    const s3VideoKey = originalFilename;
    await uploadFileToS3(MEDIA_BUCKET, tempVideoPath, s3VideoKey);

    // 6. Create & upload JSON
    const jsonReport = { videoFile: s3VideoKey, bias: biasTimestamps };
    const jsonKey = originalFilename.replace('.mp4', '.json');
    await uploadToS3(MEDIA_BUCKET, jsonKey, JSON.stringify(jsonReport), 'application/json');

    // 7. Cleanup local files
    fs.unlinkSync(tempVideoPath);
    fs.unlinkSync(wavPath);

    // 8. Respond
    res.status(200).json({
      success: true,
      message: 'Video processed successfully',
      videoKey: s3VideoKey,
      jsonKey,
      biasTimestamps
    });
  } catch (error) {
    console.error('Error processing media:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// GET controller -> Return presigned URL & bias from S3
exports.getProcessedMedia = async (req, res) => {
  try {
    const baseName = req.params.baseName;
    if (!baseName) {
      return res.status(400).json({ error: 'No baseName provided' });
    }

    // e.g., MyFile.mp4 & MyFile.json
    const mp4Key = `${baseName}.mp4`;
    const jsonKey = `${baseName}.json`;

    // 1. Get a presigned URL
    const presignedUrl = await getVideoPresignedUrl(MEDIA_BUCKET, mp4Key);

    // 2. Load JSON from S3
    const biasData = await loadJsonFromS3(MEDIA_BUCKET, jsonKey);

    res.status(200).json({
      success: true,
      videoFile: mp4Key,
      presignedUrl,
      bias: biasData?.bias || []
    });
  } catch (error) {
    console.error('Error retrieving media:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Combine face detection + audio events
function combineDetections(faceData, audioData) {
  const biasEvents = [];
  let lastBiasTime = -Infinity;
  const TIME_WINDOW = 1000; // 1s
  const GAP = 5000; // 5s gap

  faceData.sort((a, b) => a.timestamp - b.timestamp);
  audioData.sort((a, b) => a.timestamp - b.timestamp);

  faceData.forEach(faceFrame => {
    if (faceFrame.faceCount <= 2) return;

    const faceTime = faceFrame.timestamp;
    const relevantAudio = audioData.find(aEvt =>
      aEvt.timestamp >= faceTime && aEvt.timestamp <= faceTime + TIME_WINDOW
    );

    if (relevantAudio && (faceTime - lastBiasTime) > GAP) {
      biasEvents.push(faceTime);
      lastBiasTime = faceTime;
    }
  });

  return biasEvents;
}

async function loadJsonFromS3(bucketName, key) {
  try {
    const command = new GetObjectCommand({ Bucket: bucketName, Key: key });
    const response = await s3Client.send(command);
    const bodyString = await streamToString(response.Body);
    return JSON.parse(bodyString);
  } catch (e) {
    console.warn('Could not load JSON:', e.message);
    return null;
  }
}

function streamToString(stream) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    stream.on('data', chunk => chunks.push(chunk));
    stream.on('error', reject);
    stream.on('end', () => {
      resolve(Buffer.concat(chunks).toString('utf-8'));
    });
  });
}
