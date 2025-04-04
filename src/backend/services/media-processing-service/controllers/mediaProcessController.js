/**
 * Author: Promish Kandel, Mitchell Weingust, Jasmine Sun-Hu, Parisha Nizam
 * Date: January 19, 2025
 * Purpose: Handles video and audio upload, bias processing, and retrieval for assessment media.
 */

const path = require("path");
const fs = require("fs");
const { GetObjectCommand } = require("@aws-sdk/client-s3");
const {
  s3Client,
  uploadFileToS3,
  uploadToS3,
  getVideoPresignedUrl,
} = require("../config/s3Config");
const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");
const { GetObjectCommand } = require("@aws-sdk/client-s3");
const {
  s3Client,
  uploadFileToS3,
  uploadToS3,
  getVideoPresignedUrl,
} = require("../config/s3Config");
const { exec } = require("child_process");

const ffmpegPath = require("ffmpeg-static");
const ffmpegPath = require("ffmpeg-static");

const { processMp4WithDeepgram } = require("../helpers/audioProcessing");
const { detectFacesWithPython } = require("../helpers/videoProcessing");
const { processMp4WithDeepgram } = require("../helpers/audioProcessing");
const { detectFacesWithPython } = require("../helpers/videoProcessing");

//Finds Bias by combining face detection with audio detection
//Finds Bias by combining face detection with audio detection
function combineDetections(faceData, audioData, biasThreshold = 1500) {
  const MIN_BIAS_INTERVAL_MS = 1500;
  const MIN_BIAS_INTERVAL_MS = 1500;
  let lastBiasTimestamp = -Infinity;
  let lastBiasKeyword = null;


  const results = [];


  faceData.forEach((faceEvent) => {
    // Only consider frames with at least 2 faces
    if (faceEvent.faces < 2) return;


    const faceTimeMs = faceEvent.timestamp;


    audioData.forEach((audioEvent) => {
      // Calculate the absolute time difference between the audio event and the face event
      const timeDiff = Math.abs(audioEvent.timestamp - faceTimeMs);


      if (timeDiff <= biasThreshold) {
        // Ensure at least MIN_BIAS_INTERVAL_MS between bias detections
        if (faceTimeMs - lastBiasTimestamp >= MIN_BIAS_INTERVAL_MS) {
          // Avoid repeated keywords in a short period
          if (audioEvent.keyword !== lastBiasKeyword) {
            results.push({
              timestamp: faceTimeMs,
              faceCount: faceEvent.faces,
              keyword: audioEvent.keyword,
            });

            lastBiasTimestamp = faceTimeMs;
            lastBiasKeyword = audioEvent.keyword;

            lastBiasTimestamp = faceTimeMs;
            lastBiasKeyword = audioEvent.keyword;
          }
        }
      }
    });
  });


  return results;
}

// Environment or fallback for your S3 bucket
const MEDIA_BUCKET = process.env.MEDIA_BUCKET || "telehealth-media-processing";
const MEDIA_BUCKET = process.env.MEDIA_BUCKET || "telehealth-media-processing";

exports.uploadAndProcessMedia = async (req, res) => {
  try {
    console.log("🚀 Upload request received");
    console.log("Files received:", JSON.stringify(req.files, null, 2));
    console.log("Form data received:", JSON.stringify(req.body, null, 2));

    const {
      parentUsername,
      firstName,
      lastName,
      childUsername,
      assessmentId,
      language,
      testType,
    } = req.body;

    if (!req.files || (!req.files.videoFile && !req.files.audioFiles)) {
      console.error("Missing both video and audio files");
      return res.status(400).json({
        error: "At least one of video or audio files is required.",
      });
    }

    let timestamps = req.body.timestamps;
    if (!timestamps) {
      return res.status(400).json({ error: "Timestamps are required." });
      return res.status(400).json({ error: "Timestamps are required." });
    }
    const parsedTimestamps = JSON.parse(timestamps);

    // Generate folder name with date, language, test type, and assessment ID
    // Generate folder name with date, language, test type, and assessment ID
    const currentDate = new Date();
    const dateStr = currentDate.toISOString().slice(2, 10).replace(/-/g, "");
    const dateStr = currentDate.toISOString().slice(2, 10).replace(/-/g, "");
    const folderName = `${dateStr}_${language.toLowerCase()}_${testType.toLowerCase()}_${assessmentId}`;

    // Define paths and filenames
    const parentFolder = `${parentUsername}/`;
    const assessmentFolder = `${parentFolder}${folderName}/`;
    const videoFileName = `${childUsername}_${assessmentId}.mp4`;
    const videoS3Key = `${assessmentFolder}${videoFileName}`;
    const historyFileName = `${childUsername}_history.json`;
    const historyS3Key = `${parentFolder}${historyFileName}`;

    let uploadedAudioFiles = [];
    let videoUploaded = false;

    let biasResults = [];

    // VIDEO UPLOAD
    // VIDEO UPLOAD
    if (req.files.videoFile && req.files.videoFile[0]) {
      const tempVideoPath = req.files.videoFile[0].path;
      console.log(
        "Running face detection and audio analysis for bias on local video...",
      );
      const faceData = await detectFacesWithPython(tempVideoPath, 4);
      console.log(
        "Face Detection Complete:",
        faceData.length,
        "frames analyzed.",
      );
      console.log(
        "Running face detection and audio analysis for bias on local video...",
      );
      const faceData = await detectFacesWithPython(tempVideoPath, 4);
      console.log(
        "Face Detection Complete:",
        faceData.length,
        "frames analyzed.",
      );

      const audioData = await processMp4WithDeepgram(tempVideoPath);
      console.log(
        "Audio Processing Complete:",
        audioData.length,
        "keywords detected.",
      );
      console.log(
        "Audio Processing Complete:",
        audioData.length,
        "keywords detected.",
      );

      // Combine results
      biasResults = combineDetections(faceData, audioData, 1500);
      console.log("Combined bias events found:", biasResults.length);
      console.log("Combined bias events found:", biasResults.length);

      console.log("⚙️ Converting local MP4 to faststart...");

      const faststartPath = `${tempVideoPath}-faststart.mp4`;
      const faststartPath = `${tempVideoPath}-faststart.mp4`;

      const commandFfmpegStatic = `"${ffmpegPath}" -y -i "${tempVideoPath}" \
  -c:v libx264 -c:a aac -movflags +faststart "${faststartPath}"`;
      console.log("Running FFmpeg command:", commandFfmpegStatic);

      await new Promise((resolve, reject) => {
        exec(commandFfmpegStatic, (error, stdout, stderr) => {
          if (error) {
            console.error("FFmpeg error:", error, stderr);
            return reject(error);
          }
          resolve();
        });
      });

      fs.unlinkSync(tempVideoPath);
      fs.renameSync(faststartPath, tempVideoPath);

      console.log(
        "MP4 is now faststart-optimized. Proceeding with existing upload...",
      );
      console.log(
        "MP4 is now faststart-optimized. Proceeding with existing upload...",
      );

      console.log("Uploading video file to S3...");
      await uploadFileToS3(MEDIA_BUCKET, tempVideoPath, videoS3Key);
      fs.unlinkSync(tempVideoPath);
      fs.unlinkSync(tempVideoPath);
      videoUploaded = true;
    } else {
      console.log("No video file to upload.");
    }

    //AUDIO UPLOAD
    //AUDIO UPLOAD
    if (req.files.audioFiles && req.files.audioFiles.length > 0) {
      console.log("Uploading audio files to S3...");
      for (let i = 0; i < req.files.audioFiles.length; i++) {
        const audioFile = req.files.audioFiles[i];
        const audioFileName = `${parentUsername}_question_${i + 1}.mp4`;
        const audioS3Key = `${assessmentFolder}${audioFileName}`;


        console.log(`Uploading ${audioFileName} to ${audioS3Key}...`);
        await uploadFileToS3(MEDIA_BUCKET, audioFile.path, audioS3Key);
        uploadedAudioFiles.push(audioS3Key);

        fs.unlinkSync(audioFile.path);
      }
    } else {
      console.log("No audio files to upload.");
    }

    if (!videoUploaded && uploadedAudioFiles.length === 0) {
      return res
        .status(400)
        .json({ error: "No video or audio files provided." });
      return res
        .status(400)
        .json({ error: "No video or audio files provided." });
    }

    // UPDATE JSON HISTORY
    // UPDATE JSON HISTORY
    let existingHistory = await loadJsonFromS3(MEDIA_BUCKET, historyS3Key);
    if (!existingHistory) {
      existingHistory = {
        firstname: firstName,
        lastname: lastName,
        username: childUsername,
        assessmentVideos: [],
      };
    }

    // Append new assessment data to history
    existingHistory.assessmentVideos.push({
      assessmentId: assessmentId,
      videoFile: videoUploaded ? videoFileName : undefined,
      audioFiles:
        uploadedAudioFiles.length > 0 ? uploadedAudioFiles : undefined,
      bias: [],
      audioFiles:
        uploadedAudioFiles.length > 0 ? uploadedAudioFiles : undefined,
      bias: [],
      timestamps: parsedTimestamps,
    });

    const lastIndex = existingHistory.assessmentVideos.length - 1;
    existingHistory.assessmentVideos[lastIndex].bias = biasResults;

    console.log("Uploading updated history JSON to S3...");
    await uploadToS3(
      MEDIA_BUCKET,
      historyS3Key,
      JSON.stringify(existingHistory),
      "application/json",
      "application/json",
    );

    const presignedUrl = videoUploaded
      ? await getVideoPresignedUrl(MEDIA_BUCKET, videoS3Key)
      : null;
    const presignedUrl = videoUploaded
      ? await getVideoPresignedUrl(MEDIA_BUCKET, videoS3Key)
      : null;
    res.status(200).json({
      success: true,
      message: "Media processed successfully",
      message: "Media processed successfully",
      presignedUrl,
      historyFile: historyS3Key,
      uploadedAudioFiles,
    });
  } catch (error) {
    console.error("Error processing media:", error);
    console.error("Error processing media:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getProcessedMedia = async (req, res) => {
  try {
    const baseName = req.params.baseName;
    if (!baseName) {
      return res.status(400).json({ error: "No baseName provided" });
      return res.status(400).json({ error: "No baseName provided" });
    }
    const mp4Key = `${baseName}.mp4`;
    const jsonKey = `${baseName}.json`;

    // Retrieve a presigned URL for the .mp4
    const presignedUrl = await getVideoPresignedUrl(MEDIA_BUCKET, mp4Key);

    // Load JSON from S3
    // Load JSON from S3
    const biasData = await loadJsonFromS3(MEDIA_BUCKET, jsonKey);

    res.status(200).json({
      success: true,
      videoFile: mp4Key,
      presignedUrl,
      bias: biasData?.bias || [],
      bias: biasData?.bias || [],
    });
  } catch (error) {
    console.error("Error retrieving media:", error);
    console.error("Error retrieving media:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getMediaByFilename = async (req, res) => {
  try {
    const { parentUsername, folderName, assessmentId } = req.params;
    if (!parentUsername || !assessmentId) {
      return res
        .status(400)
        .json({ error: "Parent username and assessment ID are required." });
      return res
        .status(400)
        .json({ error: "Parent username and assessment ID are required." });
    }

    //Construct the correct video filename
    //Construct the correct video filename
    let videoFileName = `${parentUsername}_${assessmentId}.mp4`;

    //Ensure it doesn't have duplicate `.mp4`
    //Ensure it doesn't have duplicate `.mp4`
    if (videoFileName.endsWith(".mp4.mp4")) {
      videoFileName = videoFileName.replace(".mp4.mp4", ".mp4");
    }

    const videoS3Key = `${parentUsername}/${folderName}/${videoFileName}`;
    const historyS3Key = `${parentUsername}/${parentUsername}_history.json`;

    //Fetch the presigned video URL
    //Fetch the presigned video URL
    const presignedUrl = await getVideoPresignedUrl(MEDIA_BUCKET, videoS3Key);

    //Fetch history JSON to extract bias data
    //Fetch history JSON to extract bias data
    let historyData = await loadJsonFromS3(MEDIA_BUCKET, historyS3Key);
    let biasEvents = [];

    if (historyData && historyData.assessmentVideos) {
      const assessmentEntry = historyData.assessmentVideos.find(
        (video) => video.assessmentId.toString() === assessmentId.toString(),
        (video) => video.assessmentId.toString() === assessmentId.toString(),
      );

      if (assessmentEntry) {
        biasEvents = assessmentEntry.bias || [];
      }
    }

    res.status(200).json({
      success: true,
      videoFile: videoFileName,
      presignedUrl,
      bias: biasEvents,
      bias: biasEvents,
    });
  } catch (error) {
    console.error("Error retrieving media:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

//Reading JSON from S3
//Reading JSON from S3
async function loadJsonFromS3(bucketName, key) {
  try {
    const command = new GetObjectCommand({ Bucket: bucketName, Key: key });
    const response = await s3Client.send(command);
    const bodyString = await streamToString(response.Body);
    return JSON.parse(bodyString);
  } catch (e) {
    console.warn("Could not load JSON:", e.message);
    console.warn("Could not load JSON:", e.message);
    return null;
  }
}

function streamToString(stream) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    stream.on("data", (chunk) => chunks.push(chunk));
    stream.on("error", reject);
    stream.on("end", () => {
      resolve(Buffer.concat(chunks).toString("utf-8"));
    stream.on("data", (chunk) => chunks.push(chunk));
    stream.on("error", reject);
    stream.on("end", () => {
      resolve(Buffer.concat(chunks).toString("utf-8"));
    });
  });
}
