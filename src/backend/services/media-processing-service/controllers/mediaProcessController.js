const path = require('path');
const fs = require('fs');
const { GetObjectCommand } = require('@aws-sdk/client-s3');
const { s3Client, uploadFileToS3, uploadToS3, getVideoPresignedUrl } = require('../config/s3Config');

// IMPORT HELPERS
const { processMp4WithDeepgram } = require('../helpers/audioprocess'); 
const { detectFacesWithPython } = require('../helpers/videoprocess');

function combineDetections(faceData, audioData) {
  const BIAS_THRESHOLD_MS = 100;  
  const results = [];

  faceData.forEach((faceEvent) => {
    if (faceEvent.faces < 2) return;
    audioData.forEach((audioEvent) => {
      if (Math.abs(audioEvent.timestamp - faceEvent.timestamp) <= BIAS_THRESHOLD_MS) {
        results.push({
          timestamp: faceEvent.timestamp,
          faceCount: faceEvent.faces,
          keyword: audioEvent.keyword,
        });
      }
    });
  });

  return results;
}

// Environment or fallback for your S3 bucket
const MEDIA_BUCKET = process.env.MEDIA_BUCKET || 'telehealth-media-processing';

exports.processMedia = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No video file uploaded' });
    }

    // Path to the uploaded temp file
    const originalFilename = req.file.originalname;
    const tempVideoPath = req.file.path;

    //Detect faces via Python/Mediapipe
    const faceData = await detectFacesWithPython(tempVideoPath);

    //Transcribe audio & detect keywords directly from MP4 via Deepgram
    const audioKeywords = await processMp4WithDeepgram(tempVideoPath);

    //Combine the results (example bias-detection logic)
    const biasEvents = combineDetections(faceData, audioKeywords);

    //Upload the .mp4 to S3
    const s3VideoKey = originalFilename;
    await uploadFileToS3(MEDIA_BUCKET, tempVideoPath, s3VideoKey);

    //Create & upload JSON summary
    const jsonKey = originalFilename.replace('.mp4', '.json');
    const jsonReport = {
      videoFile: s3VideoKey,
      bias: biasEvents
    };
    await uploadToS3(MEDIA_BUCKET, jsonKey, JSON.stringify(jsonReport), 'application/json');

    //Clean up local files
    fs.unlinkSync(tempVideoPath);

    //Return response
    res.status(200).json({
      success: true,
      message: 'Video processed successfully',
      videoKey: s3VideoKey,
      jsonKey,
      biasEvents,
    });
  } catch (error) {
    console.error('Error processing media:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

//GET endpoint for retrieving presigned URL & bias data
exports.getProcessedMedia = async (req, res) => {
  try {
    const baseName = req.params.baseName;
    if (!baseName) {
      return res.status(400).json({ error: 'No baseName provided' });
    }
    const mp4Key = `${baseName}.mp4`;
    const jsonKey = `${baseName}.json`;

    // Retrieve a presigned URL for the .mp4
    const presignedUrl = await getVideoPresignedUrl(MEDIA_BUCKET, mp4Key);

    // Load JSON from S3 (face+audio "bias" data)
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

// Utility for reading JSON from S3
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
