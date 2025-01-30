const { getJsonFromS3, getPresignedUrl, QUESTION_BANK_BUCKET } = require('../config/awsConfig');

/**
 * Check if a URL is encoded
 */
function isUrlEncoded(url) {
  return /%[0-9A-Fa-f]{2}/.test(url);
}

/**
 * Decode a URL if it is encoded
 */
function decodeUrlIfEncoded(url) {
  try {
    if (isUrlEncoded(url)) {
      return decodeURIComponent(url);
    }
    return url; // Return as-is if not encoded
  } catch (error) {
    console.error('Error decoding URL:', error);
    return url; // Return the original URL if decoding fails
  }
}

/**
 * Get all questions for a specific language and test type
 */
async function getQuestions(req, res) {
  const { language, testType } = req.params;

  try {
    // Construct the key for the JSON file in S3
    const key = `${language}/${testType}/questions.json`;

    // Fetch the JSON file from S3
    const questionBank = await getJsonFromS3(key);

    // Replace image and audio URLs with pre-signed URLs
    for (const question of questionBank.questions) {
      // Replace audio URL
      const audioKey = decodeUrlIfEncoded(question.sound.split('.com/')[1]); // Extract and decode the S3 key
      question.sound = await getPresignedUrl(audioKey);

      // Replace image URLs in options
      for (const option of question.options) {
        const imageKey = decodeUrlIfEncoded(option.image.split('.com/')[1]); // Extract and decode the S3 key
        option.image = await getPresignedUrl(imageKey);
      }
    }

    // Return the questions as a JSON response
    res.status(200).json(questionBank);
  } catch (error) {
    console.error('Error retrieving questions:', error);
    res.status(500).json({ error: 'Failed to retrieve questions' });
  }
}

/**
 * Get a specific question by ID
 */
async function getQuestionById(req, res) {
  const { language, testType, id } = req.params;

  try {
    // Construct the key for the JSON file in S3
    const key = `${language}/${testType}/questions.json`;

    // Fetch the JSON file from S3
    const questionBank = await getJsonFromS3(key);

    // Find the question by ID
    const question = questionBank.questions.find((q) => q.id === parseInt(id));

    if (!question) {
      return res.status(404).json({ error: 'Question not found' });
    }

    // Replace audio URL
    const audioKey = decodeUrlIfEncoded(question.sound.split('.com/')[1]); // Extract and decode the S3 key
    question.sound = await getPresignedUrl(audioKey);

    // Replace image URLs in options
    for (const option of question.options) {
      const imageKey = decodeUrlIfEncoded(option.image.split('.com/')[1]); // Extract and decode the S3 key
      option.image = await getPresignedUrl(imageKey);
    }

    // Return the question as a JSON response
    res.status(200).json(question);
  } catch (error) {
    console.error('Error retrieving question:', error);
    res.status(500).json({ error: 'Failed to retrieve question' });
  }
}

module.exports = { getQuestions, getQuestionById };