/**
 * Author: Promish Kandel, Mitchell Weingust, Jasmine Sun-Hu, Parisha Nizam
 * Date: January 19, 2025
 * Purpose: Provides a Node.js interface to execute a Python script for face detection
 * using MediaPipe. Spawns a child process with the video path and frame skip interval,
 * and returns timestamped face detection results as parsed JSON.
 */

const { spawn } = require("child_process");
const path = require("path");

/**
 * Detect faces using Python MediaPipe script.
 * @param {string} videoPath - Path to the video file.
 * @returns {Promise<Array>} - Array of objects with timestamp and face count.
 */
function detectFacesWithPython(videoPath, frameSkip = 5) {
  return new Promise((resolve, reject) => {
    const pythonScriptPath = path.join(__dirname, "face_detection.py");
    const pythonProcess = spawn("python", [
      pythonScriptPath,
      videoPath,
      frameSkip.toString(),
    ]);

    let output = "";
    let error = "";

    pythonProcess.stdout.on("data", (data) => {
      output += data.toString();
    });

    pythonProcess.stderr.on("data", (data) => {
      error += data.toString();
    });

    pythonProcess.on("close", (code) => {
      if (code !== 0) {
        return reject(
          new Error(`Python script exited with code ${code}: ${error}`),
        );
      }
      try {
        const results = JSON.parse(output);
        resolve(results);
      } catch (err) {
        reject(
          new Error("Failed to parse Python script output: " + err.message),
        );
      }
    });
  });
}

module.exports = {
  detectFacesWithPython,
};
