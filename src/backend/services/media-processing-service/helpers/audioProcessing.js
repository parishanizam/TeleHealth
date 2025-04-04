/**
 * Author: Promish Kandel, Mitchell Weingust, Jasmine Sun-Hu, Parisha Nizam
 * Date: January 19, 2025
 * Purpose: Uses Deepgram's API to transcribe audio from MP4 files and extract
 * timestamps for bias-related keywords to support audio analysis in assessments.
 */


const fs = require("fs");
require('dotenv').config();
const { createClient } = require("@deepgram/sdk");
const deepgram = createClient(process.env.DEEPGRAM_API_KEY);

// Keywords to detect bias
const KEYWORDS = [
  "answer",
  "pick",
  "keyword",
  "test",
  "tests",
  "choose",
  "this",
  "one",
  "right",
  "correct",
  "help",
  "wrong",
  "incorrect",
  "stop",
  "not",
  "try",
  "no",
];

async function processMp4WithDeepgram(mp4FilePath) {
  try {
    // This returns the entire Deepgram response
    const deepgramResponse = await deepgram.listen.prerecorded.transcribeFile(
      fs.createReadStream(mp4FilePath),
      {
        model: "nova-2",
        punctuate: true,
        diarize: false,
        keywords: KEYWORDS,
      },
    );

    // Extract detected keywords and timestamps
    const keywordTimestamps = [];
    const channels = deepgramResponse?.result?.results?.channels;
    if (
      channels &&
      channels[0]?.alternatives &&
      channels[0].alternatives[0]?.words
    ) {
      const words = channels[0].alternatives[0].words;
      console.log("test");

      words.forEach((wordInfo) => {
        const word = wordInfo.word.toLowerCase();
        const startTime = wordInfo.start * 1000;

        if (KEYWORDS.some((keyword) => word.includes(keyword))) {
          keywordTimestamps.push({ timestamp: startTime, keyword: word });
        }
      });
    } else {
      console.error("No words detected in the transcription.");
    }

    return keywordTimestamps;
  } catch (err) {
    console.error("Error processing MP4 with Deepgram:", err.message);
    throw err;
  }
}

module.exports = {
  processMp4WithDeepgram,
};
