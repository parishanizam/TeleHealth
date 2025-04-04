/**
 * Author: Promish Kandel, Mitchell Weingust, Jasmine Sun-Hu, Parisha Nizam
 * Date: January 19, 2025
 * Purpose: Test script that runs face detection and audio keyword detection on a local MP4 video.
 * Combines both results using varying bias thresholds to identify potential biased moments,
 * defined by overlapping face presence and specific audio cues.
 */

const path = require("path");
const { processMp4WithDeepgram } = require("./audioProcessing");
const { detectFacesWithPython } = require("./videoProcessing");

/**
 * Combines face detection and audio keyword events based on a bias threshold.
 * Converts face detection timestamps (in seconds) to milliseconds to match the audio event timestamps.
 *
 * @param {Array} faceData - Array of face detection events.
 *   Each event should be in the form: { timestamp: Number (seconds), faces: Number }.
 * @param {Array} audioData - Array of audio keyword events.
 *   Each event should be in the form: { timestamp: Number (milliseconds), keyword: String }.
 * @param {number} biasThreshold - Allowed time difference (in ms) between face and keyword events.
 * @returns {Array} - Combined detection events.
 */
function combineDetections(faceData, audioData, biasThreshold = 2000) {
  const MIN_BIAS_INTERVAL_MS = 1500; // Ensures at least 1.5s gap between detections
  let lastBiasTimestamp = -Infinity;
  let lastBiasKeyword = null;

  const results = [];

  faceData.forEach((faceEvent) => {
    // Only consider frames with at least 2 faces
    if (faceEvent.faces < 2) return;

    // Convert face detection timestamp from seconds to milliseconds
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
          }
        }
      }
    });
  });

  return results;
}

(async () => {
  try {
    const videoFile = "jasminesunhu_18.mp4";
    const videoPath = path.join(__dirname, "../../../uploads", videoFile);

    console.log(`Processing video: ${videoPath}`);

    // Run Face Detection
    console.log("Running face detection...");
    const faceData = await detectFacesWithPython(videoPath, 4);
    console.log(
      "Face Detection Complete:",
      faceData.length,
      "frames analyzed.",
    );

    // Run Audio Processing
    console.log("Running audio keyword detection...");
    const audioData = await processMp4WithDeepgram(videoPath);
    console.log(audioData);
    console.log(
      "Audio Processing Complete:",
      audioData.length,
      "keywords detected.",
    );

    // Test with different bias thresholds (in milliseconds)
    const thresholds = [10, 50, 100, 200, 300, 500, 750, 1000, 1500, 2000];
    thresholds.forEach((threshold) => {
      console.log(`\n🔹 Testing Bias Threshold: ${threshold}ms`);
      const combinedResults = combineDetections(faceData, audioData, threshold);
      console.log(`Detected Bias Events: ${combinedResults.length}`);
      combinedResults.forEach((result) => {
        console.log(
          `- Timestamp: ${result.timestamp}ms, Face Count: ${result.faceCount}, Keyword: ${result.keyword}`,
        );
      });
    });
  } catch (error) {
    console.error("Error:", error.message);
  }
})();
