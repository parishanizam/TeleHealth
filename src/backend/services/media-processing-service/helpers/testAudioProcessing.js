const path = require('path');
const { processMp4WithDeepgram } = require('./audioProcessing');

(async () => {
  try {
    // Path to your MP4 file
    const mp4FilePath = path.join(__dirname, '../../../uploads', '1737925203291-Promish_Kandel.mp4');

    console.log(`Processing file: ${mp4FilePath}`);

    // Process the MP4 file
    const results = await processMp4WithDeepgram(mp4FilePath);

    // Output the detected keywords
    console.log('Detected Keywords:', results);
  } catch (error) {
    console.error('Error:', error.message);
  }
})();
