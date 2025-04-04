/**
 * Author: Promish Kandel, Mitchell Weingust, Jasmine Sun-Hu, Parisha Nizam
 * Date: January 19, 2025
 * Purpose: Standalone test script to process a local MP4 file using Deepgram's transcription API.
 * Extracts and logs bias-related keywords with their timestamps for verification.
 */

const path = require('path');
const { processMp4WithDeepgram } = require('./audioProcessing');

(async () => {
  try {
    // Path to your MP4 file
    const mp4FilePath = path.join(__dirname, '../../../uploads', 'mitchelllogin_14.mp4');

    console.log(`Processing file: ${mp4FilePath}`);

    // Process the MP4 file
    const results = await processMp4WithDeepgram(mp4FilePath);

    // Output the detected keywords
    console.log('Detected Keywords:', results);
  } catch (error) {
    console.error('Error:', error.message);
  }
})();