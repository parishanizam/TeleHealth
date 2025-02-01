const path = require('path');
const { processMp4WithDeepgram } = require('./audioProcessing');
const { detectFacesWithPython } = require('./videoProcessing');

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
(async () => {
  try {
    const videoFile = 'Nizamp_1.mp4';
    const videoPath = path.join(__dirname, '../../../uploads', videoFile);
    
    console.log(`Processing video: ${videoPath}`);

    // Run Face Detection
    console.log('Running face detection...');
    const faceData = await detectFacesWithPython(videoPath, 4); // Adjust frameSkip if needed
    console.log('✅ Face Detection Complete:', faceData.length, 'frames analyzed.');

    // Run Audio Processing
    console.log('Running audio keyword detection...');
    const audioData = await processMp4WithDeepgram(videoPath);
    console.log('✅ Audio Processing Complete:', audioData.length, 'keywords detected.');

    // Try different bias thresholds
    const thresholds = [500, 750, 1000, 1500, 2000]; // Adjust these values to test
    for (const threshold of thresholds) {
      console.log(`\n🔹 Testing Bias Threshold: ${threshold}ms`);
      const combinedResults = combineDetections(faceData, audioData, threshold);
      console.log('Detected Bias Events:', combinedResults);
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
})();
