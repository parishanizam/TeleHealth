const {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
} = require('@aws-sdk/client-s3');

const s3Client = new S3Client({ region: process.env.AWS_REGION });

// Bucket names from environment variables
const CLINICIANS_BUCKET = process.env.CLINICIANS_BUCKET;
const PARENTS_BUCKET = process.env.PARENTS_BUCKET;

/**
 * Upload JSON data to S3
 */
async function uploadJson(bucketName, key, data) {
  const params = {
    Bucket: bucketName,
    Key: key,
    Body: JSON.stringify(data),
    ContentType: 'application/json',
  };
  await s3Client.send(new PutObjectCommand(params));
}

/**
 * Get JSON data from S3 and parse it
 */
async function getJson(bucketName, key) {
  const getObjParams = {
    Bucket: bucketName,
    Key: key,
  };
  const response = await s3Client.send(new GetObjectCommand(getObjParams));
  const bodyString = await streamToString(response.Body);
  return JSON.parse(bodyString);
}

/**
 * Helper to convert a Node ReadableStream into a string
 */
function streamToString(stream) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    stream.on('data', (chunk) => chunks.push(chunk));
    stream.on('error', reject);
    stream.on('end', () => {
      resolve(Buffer.concat(chunks).toString('utf-8'));
    });
  });
}

module.exports = {
  s3Client,
  CLINICIANS_BUCKET,
  PARENTS_BUCKET,
  uploadJson,
  getJson,
};
