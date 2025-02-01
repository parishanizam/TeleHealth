const path = require('path');
const { detectFacesWithPython } = require('./videoProcessing');

(async () => {
  const videoPath = path.join(__dirname, '../../../uploads', 'Nizamp_1.mp4');
  const frameSkip = 4; // Change this to process every Nth frame
  console.log('Starting face detection test...');
  console.log('Video file path:', videoPath);

  try {
    const results = await detectFacesWithPython(videoPath, frameSkip);
    console.log('Detected Faces:', results);
  } catch (err) {
    console.error('Error:', err.message);
  }
})();
