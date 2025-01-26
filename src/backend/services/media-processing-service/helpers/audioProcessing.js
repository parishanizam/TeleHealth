// helpers/audioProcessing.js
const ffmpeg = require('fluent-ffmpeg');
const ffmpegPath = require('ffmpeg-static'); // This returns the path to the ffmpeg binary in node_modules
const path = require('path');
const fs = require('fs');

// First, ensure ffmpeg-static actually found a binary for your platform
if (!ffmpegPath) {
  throw new Error('No static ffmpeg binary found for this platform');
}

// Tell fluent-ffmpeg to use that binary
ffmpeg.setFfmpegPath(ffmpegPath);

// Keywords that might indicate a bias
const KEYWORDS = [
  'the answer is',
  'pick answer'
  // ... add more if needed
];

async function extractAudioToWav(videoPath, outputDir) {
  const outputPath = path.join(outputDir, `${Date.now()}-extracted.wav`);
  return new Promise((resolve, reject) => {
    ffmpeg(videoPath)
      .noVideo()
      .audioCodec('pcm_s16le')
      .save(outputPath)
      .on('end', () => resolve(outputPath))
      .on('error', err => reject(err));
  });
}

// Placeholder for actually detecting keywords with timestamps
async function detectKeywords(wavPath) {
  // 1. Possibly do a speech-to-text step here:
  //    e.g. Google Cloud STT or any other service
  // 2. Parse the transcript to find keywords + timestamps
  // For now, return a mock array of timestamps where keywords appear.
  return [
    { timestamp: 8000, keyword: 'the answer is' },
    { timestamp: 20000, keyword: 'pick answer' }
  ];
}

module.exports = {
  extractAudioToWav,
  detectKeywords,
  KEYWORDS
};
