const path = require('path');
const fs = require('fs');
const { GetObjectCommand } = require('@aws-sdk/client-s3');
const { s3Client, uploadFileToS3, uploadToS3, getVideoPresignedUrl } = require('../config/s3Config');

// IMPORT HELPERS
const { processMp4WithDeepgram } = require('../helpers/audioProcessing'); 
const { detectFacesWithPython } = require('../helpers/videoProcessing');

function combineDetections(faceData, audioData) {
  const BIAS_THRESHOLD_MS = 2000; // Allowed time difference between face and keyword
  const MIN_BIAS_INTERVAL_MS = 1500; // Ensures at least 1.5s gap between detections
  let lastBiasTimestamp = -Infinity;
  let lastBiasKeyword = null;

  const results = [];

  faceData.forEach((faceEvent) => {
    if (faceEvent.faces < 2) return; // Ignore if less than 2 faces

    audioData.forEach((audioEvent) => {
      const timeDiff = Math.abs(audioEvent.timestamp - faceEvent.timestamp);

      if (timeDiff <= BIAS_THRESHOLD_MS) {
        // Ensure at least `MIN_BIAS_INTERVAL_MS` between bias detections
        if (faceEvent.timestamp - lastBiasTimestamp >= MIN_BIAS_INTERVAL_MS) {
          
          // Avoid repeated keywords in a short period
          if (audioEvent.keyword !== lastBiasKeyword) {
            results.push({
              timestamp: faceEvent.timestamp,
              faceCount: faceEvent.faces,
              keyword: audioEvent.keyword,
            });

            lastBiasTimestamp = faceEvent.timestamp; // Update last bias timestamp
            lastBiasKeyword = audioEvent.keyword; // Track last detected keyword
          }
        }
      }
    });
  });

  return results;
}

// Environment or fallback for your S3 bucket
const MEDIA_BUCKET = process.env.MEDIA_BUCKET || 'telehealth-media-processing';

/**
 * New structured upload feature
 * - Saves videos in `{parentUsername}/{username}_{assessmentId}.mp4`
 * - Updates `{parentUsername}/{username}_history.json`
 */
exports.uploadAndProcessMedia = async (req, res) => {
  try {
    console.log("🔹 Received Upload Request");
    if (!req.file) {
      return res.status(400).json({ error: 'No video file uploaded' });
    }

    const { parentUsername, firstName, lastName, childUsername, assessmentId } = req.body;

    if (!parentUsername || !childUsername || !assessmentId) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Generate structured filenames
    const videoFileName = `${childUsername}_${assessmentId}.mp4`;
    const historyFileName = `${childUsername}_history.json`;

    // Define S3 paths
    const parentFolder = `${parentUsername}/`;
    const videoS3Key = `${parentFolder}${videoFileName}`;
    const historyS3Key = `${parentFolder}${historyFileName}`;

    // Path to uploaded file
    const tempVideoPath = req.file.path;

    // Detect faces via Python
    const faceData = await detectFacesWithPython(tempVideoPath);

    // Transcribe audio via Deepgram
    const audioKeywords = await processMp4WithDeepgram(tempVideoPath);

    // Combine detections
    const biasEvents = combineDetections(faceData, audioKeywords);

    // Upload video to S3
    await uploadFileToS3(MEDIA_BUCKET, tempVideoPath, videoS3Key);

    // Check if history JSON exists
    let existingHistory = await loadJsonFromS3(MEDIA_BUCKET, historyS3Key);
    if (!existingHistory) {
      existingHistory = {
        firstname: firstName,
        lastname: lastName,
        username: childUsername,
        assessmentVideos: []
      };
    }

    // Append new video entry
    existingHistory.assessmentVideos.push({
      assessmentId: assessmentId,
      videoFile: videoFileName,
      bias: biasEvents
    });

    // Upload updated history JSON
    await uploadToS3(MEDIA_BUCKET, historyS3Key, JSON.stringify(existingHistory), 'application/json');

    // Get a presigned URL for streaming
    const presignedUrl = await getVideoPresignedUrl(MEDIA_BUCKET, videoS3Key);

    // Clean up local file
    fs.unlinkSync(tempVideoPath);

    // Return response
    res.status(200).json({
      success: true,
      message: 'Video processed successfully',
      presignedUrl,  // 🔹 Allows frontend to stream the video
      historyFile: historyS3Key,
      biasEvents
    });
  } catch (error) {
    console.error('Error processing media:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Existing GET endpoint for retrieving presigned URL & bias data
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

exports.getMediaByFilename = async (req, res) => {
  try {
    const { parentUsername, assessmentId } = req.params;
    if (!parentUsername || !assessmentId) {
      return res.status(400).json({ error: "Parent username and assessment ID are required." });
    }

    // 🔹 Construct the correct video filename
    let videoFileName = `${parentUsername}_${assessmentId}.mp4`;

    // 🔹 Ensure it doesn't have duplicate `.mp4`
    if (videoFileName.endsWith(".mp4.mp4")) {
      videoFileName = videoFileName.replace(".mp4.mp4", ".mp4");
    }

    const videoS3Key = `${parentUsername}/${videoFileName}`;
    const historyS3Key = `${parentUsername}/${parentUsername}_history.json`;

    // 🔹 Fetch the presigned video URL
    const presignedUrl = await getVideoPresignedUrl(MEDIA_BUCKET, videoS3Key);

    // 🔹 Fetch history JSON to extract bias data
    let historyData = await loadJsonFromS3(MEDIA_BUCKET, historyS3Key);
    let biasEvents = [];

    if (historyData && historyData.assessmentVideos) {
      const assessmentEntry = historyData.assessmentVideos.find(
        (video) => video.assessmentId.toString() === assessmentId.toString()
      );

      if (assessmentEntry) {
        biasEvents = assessmentEntry.bias || [];
      }
    }

    res.status(200).json({
      success: true,
      videoFile: videoFileName,
      presignedUrl,
      bias: biasEvents, // 🔹 Now includes bias data
    });
  } catch (error) {
    console.error("Error retrieving media:", error);
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
