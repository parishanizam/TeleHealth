const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const s3Client = new S3Client({ region: process.env.AWS_REGION });

const QUESTION_BANK_BUCKET = process.env.QUESTION_BANK_BUCKET;

/**
 * Fetch JSON file from S3
 */
async function getJsonFromS3(key) {
  try {
    const params = { Bucket: QUESTION_BANK_BUCKET, Key: key };
    const response = await s3Client.send(new GetObjectCommand(params));
    const bodyString = await streamToString(response.Body);
    return JSON.parse(bodyString);
  } catch (error) {
    console.error("Error fetching JSON from S3:", error);
    throw error;
  }
}

/**
 * Generate a pre-signed URL for an S3 object
 */
async function getPresignedUrl(key, expiresIn = 3600) {
  try {
    const command = new GetObjectCommand({
      Bucket: QUESTION_BANK_BUCKET,
      Key: key,
    });
    const url = await getSignedUrl(s3Client, command, { expiresIn });
    return url;
  } catch (error) {
    console.error("Error generating pre-signed URL:", error);
    throw error;
  }
}

/**
 * Convert stream to string
 */
function streamToString(stream) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    stream.on("data", (chunk) => chunks.push(chunk));
    stream.on("error", reject);
    stream.on("end", () => {
      resolve(Buffer.concat(chunks).toString("utf-8"));
    });
  });
}

module.exports = {
  s3Client,
  getJsonFromS3,
  getPresignedUrl,
  QUESTION_BANK_BUCKET,
};
