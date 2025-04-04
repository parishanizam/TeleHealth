/**
 * Author: Promish Kandel, Mitchell Weingust, Jasmine Sun-Hu, Parisha Nizam
 * Date: January 19, 2025
 * Purpose: Standalone test script to run face detection using the Python script via Node.js.
 * Loads a local MP4 file, skips frames for efficiency, and logs timestamped face detection results.
 */

const path = require('path');
const { detectFacesWithPython } = require('./videoProcessing');

(async () => {
  const videoPath = path.join(__dirname, '../../../uploads', 'mitchelllogin_14.mp4');
  const frameSkip = 4; 
  console.log('Starting face detection test...');
  console.log('Video file path:', videoPath);

  try {
    const results = await detectFacesWithPython(videoPath, frameSkip);
    console.log('Detected Faces:', results);
  } catch (err) {
    console.error('Error:', err.message);
  }
})();