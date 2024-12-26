const { runPythonScript } = require('../helpers/pythonProcess');

exports.processMedia = async (req, res) => {
  try {
    const { videoPath } = req.body;
    if (!videoPath) {
      return res.status(400).json({ error: 'Missing "videoPath" in request body' });
    }

    // 1) Call audio analysis
    const audioResult = runPythonScript('audio_analysis.py', videoPath);
    if (audioResult.error) {
      return res.status(500).json({ error: audioResult.error });
    }

    // 2) Call video analysis
    const videoResult = runPythonScript('video_analysis.py', videoPath);
    if (videoResult.error) {
      return res.status(500).json({ error: videoResult.error });
    }

    // 3) Combine
    return res.status(200).json({
      audioAnalysis: audioResult,
      videoAnalysis: videoResult,
    });
  } catch (error) {
    console.error('Error processing media:', error);
    return res.status(500).json({ error: error.message });
  }
};
