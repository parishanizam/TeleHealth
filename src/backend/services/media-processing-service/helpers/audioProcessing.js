const ffmpeg = require('fluent-ffmpeg');
const ffmpegPath = require('ffmpeg-static'); 
const path = require('path');
const fs = require('fs');

if (!ffmpegPath) {
  throw new Error('No static ffmpeg binary found for this platform');
}

ffmpeg.setFfmpegPath(ffmpegPath);

const KEYWORDS = [
  'the answer is',
  'pick answer'
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


async function detectKeywords(wavPath) {
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
