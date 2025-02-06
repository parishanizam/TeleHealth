const { getJsonFromS3, getPresignedUrl } = require('../config/awsConfig');

/**
 * Fetch all questions for a specific language and test type
 */
async function getQuestions(language, testType) {
  const key = `${language}/${testType}/questions.json`;
  const questionBank = await getJsonFromS3(key);

  // Replace media URLs with pre-signed URLs
  for (const question of questionBank.questions) {
    // Replace audio URL if it exists
    if (question.sound) {
      const audioKey = question.sound.split('.com/')[1]; // Extract the S3 key from the URL
      question.sound = await getPresignedUrl(audioKey);
    }

    // Only process image URLs if options exist (for Matching questions)
    if (testType === "matching" && question.options) {
      for (const option of question.options) {
        if (option.image) {
          const imageKey = option.image.split('.com/')[1]; // Extract the S3 key from the URL
          option.image = await getPresignedUrl(imageKey);
        }
      }
    }
  }

  return questionBank;
}

/**
 * Fetch a specific question by ID
 */
async function getQuestionById(language, testType, id) {
  const key = `${language}/${testType}/questions.json`;
  const questionBank = await getJsonFromS3(key);

  // Find the question by ID
  const question = questionBank.questions.find((q) => q.id === parseInt(id));

  if (!question) {
    throw new Error('Question not found');
  }

  // Replace audio URL if it exists
  if (question.sound) {
    const audioKey = question.sound.split('.com/')[1]; // Extract the S3 key from the URL
    question.sound = await getPresignedUrl(audioKey);
  }

  // Only process image URLs if options exist (for Matching questions)
  if (testType === "matching" && question.options) {
    for (const option of question.options) {
      if (option.image) {
        const imageKey = option.image.split('.com/')[1]; // Extract the S3 key from the URL
        option.image = await getPresignedUrl(imageKey);
      }
    }
  }

  return question;
}

module.exports = { getQuestions, getQuestionById };
