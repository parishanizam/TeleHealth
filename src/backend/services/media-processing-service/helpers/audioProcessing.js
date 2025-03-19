const fs = require('fs');
const { createClient } = require('@deepgram/sdk');

// Initialize Deepgram with your API key
const deepgram = createClient('5341d37e80680e7fbfa55dc6f560d2333abbf63b'); // Replace with your actual API key

// Keywords to detect
const KEYWORDS = ['answer', 'pick', 'keyword', 'test', 'tests', 'choose', 'this', 'one', 'right', 'correct','help', 'wrong', 'incorrect', 'stop', 'not', 'try', 'no'];

/**
 * Transcribes an MP4 file using Deepgram's API and detects keywords.
 * @param {string} mp4FilePath - Path to the MP4 file.
 * @returns {Promise<Array>} - Array of detected keywords with timestamps.
 */
async function processMp4WithDeepgram(mp4FilePath) {
  try {
    // This returns the entire Deepgram response
    const deepgramResponse = await deepgram.listen.prerecorded.transcribeFile(
      fs.createReadStream(mp4FilePath),
      {
        model: 'nova-2',
        punctuate: true,
        diarize: false,
        keywords: KEYWORDS,
      }
    );

    // Extract detected keywords and timestamps
    const keywordTimestamps = [];

    // deepgramResponse has top-level keys `metadata` and `results`
    const channels = deepgramResponse?.result?.results?.channels;
    // Make sure channels exist
    if (channels && channels[0]?.alternatives && channels[0].alternatives[0]?.words) {
      const words = channels[0].alternatives[0].words;
      console.log('test')

      words.forEach((wordInfo) => {
        const word = wordInfo.word.toLowerCase();
        const startTime = wordInfo.start * 1000;

        if (KEYWORDS.some((keyword) => word.includes(keyword))) {
          keywordTimestamps.push({ timestamp: startTime, keyword: word });
        }
      });
    } else {
      console.error('No words detected in the transcription.');
    }

    return keywordTimestamps;
  } catch (err) {
    console.error('Error processing MP4 with Deepgram:', err.message);
    throw err;
  }
}

module.exports = {
  processMp4WithDeepgram,
};
