const { spawn } = require('child_process');
const path = require('path');

/**
 * Detect faces using Python MediaPipe script.
 * @param {string} videoPath - Path to the video file.
 * @returns {Promise<Array>} - Array of objects with timestamp and face count.
 */
function detectFacesWithPython(videoPath, frameSkip = 5) {
  return new Promise((resolve, reject) => {
    const pythonScriptPath = path.join(__dirname, 'face_detection.py');
    const pythonProcess = spawn('python', [pythonScriptPath, videoPath, frameSkip.toString()]);

    let output = '';
    let error = '';

    pythonProcess.stdout.on('data', (data) => {
      output += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
      error += data.toString();
    });

    pythonProcess.on('close', (code) => {
      if (code !== 0) {
        return reject(new Error(`Python script exited with code ${code}: ${error}`));
      }
      try {
        const results = JSON.parse(output);
        resolve(results);
      } catch (err) {
        reject(new Error('Failed to parse Python script output: ' + err.message));
      }
    });
  });
}

module.exports = {
  detectFacesWithPython,
};
